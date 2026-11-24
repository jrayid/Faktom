import { Resend } from "resend";
import { saveSubmission } from "@/lib/storage";

const windowMs = 10 * 60 * 1000;
const requestLimit = 5;
// This in-memory limiter is per server instance and is not shared across serverless invocations.
const attempts = new Map<string, { count: number; resetAt: number }>();
let cleanupTick = 0;
let turnstileDisabledLogged = false;

export async function readJsonBody(request: Request, maxBytes = 16 * 1024): Promise<unknown> {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maxBytes) throw new Error("request_too_large");
  if (!request.body) throw new Error("invalid_json");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        throw new Error("request_too_large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function allowedRequest(ip: string, now = Date.now()) {
  if (++cleanupTick % 100 === 0 || attempts.size > 5000) {
    for (const [key, entry] of attempts) if (entry.resetAt <= now) attempts.delete(key);
    while (attempts.size > 5000) attempts.delete(attempts.keys().next().value!);
  }
  const current = attempts.get(ip);
  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= requestLimit) return false;
  current.count += 1;
  return true;
}

function escapeHtml(value: unknown): string {
  if (Array.isArray(value)) return value.map(escapeHtml).join(", ");
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

function renderRows(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([key]) => !["website", "consent"].includes(key))
    .map(([key, value]) => `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`)
    .join("");
}

export async function sendSubmissionEmails(type: "quote" | "vendor", data: Record<string, unknown>, visitorEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const subject = type === "quote" ? "New website quote request" : "New website vendor enquiry";
  const html = `<div style="font-family:Arial,sans-serif;color:#172934"><h2>${subject}</h2><table style="border-collapse:collapse">${renderRows(data)}</table></div>`;
  const replyHtml = `<p>Thank you for contacting Fakom International Services Ltd. We’ve received your ${type === "quote" ? "quote request" : "vendor enquiry"}.</p><p>This is an acknowledgement of receipt.</p>`;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "production") throw new Error("Resend contact email configuration is incomplete");
    console.info(`[EMAIL TEST MODE] ${subject}; visitor ${visitorEmail}`);
    return;
  }

  const resend = new Resend(apiKey);
  const teamResult = await resend.emails.send({ from, to, replyTo: visitorEmail, subject, html });
  if (teamResult.error) throw teamResult.error;
  const replyResult = await resend.emails.send({ from, to: visitorEmail, subject: "We received your message", html: replyHtml });
  if (replyResult.error) console.error("Visitor acknowledgement could not be sent", replyResult.error);
}

export async function processSubmission(type: "quote" | "vendor", data: Record<string, unknown>, visitorEmail: string) {
  const [storageResult, emailResult] = await Promise.allSettled([
    saveSubmission(type, data),
    sendSubmissionEmails(type, data, visitorEmail),
  ]);

  if (storageResult.status === "rejected") console.error("Submission storage failed", storageResult.reason);
  if (emailResult.status === "rejected") console.error("Submission email failed", emailResult.reason);

  const storageSucceeded = storageResult.status === "fulfilled" && storageResult.value;
  const emailSucceeded = emailResult.status === "fulfilled";
  return storageSucceeded || emailSucceeded;
}

export async function verifyTurnstile(token: string | undefined, ipAddress: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("Turnstile secret is not configured in production.");
      return false;
    }
    if (!turnstileDisabledLogged) {
      console.info("Turnstile disabled");
      turnstileDisabledLogged = true;
    }
    return true;
  }

  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ipAddress !== "unknown") body.set("remoteip", ipAddress);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;
    const result: { success?: boolean } = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification request failed", error);
    return false;
  }
}

export function requestIp(request: Request) {
  // Configure this to a header overwritten by the trusted reverse proxy; never use a client-controlled forwarding header.
  const trustedHeader = process.env.CLIENT_IP_HEADER || "x-real-ip";
  const address = request.headers.get(trustedHeader)?.split(",").at(-1)?.trim();
  return address || "unknown";
}
