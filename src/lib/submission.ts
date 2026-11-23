import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";

const windowMs = 10 * 60 * 1000;
const requestLimit = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function allowedRequest(ip: string, now = Date.now()) {
  const current = attempts.get(ip);
  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= requestLimit) return false;
  current.count += 1;
  return true;
}

export async function saveSubmission(type: "quote" | "vendor", data: unknown) {
  const directory = path.join(process.cwd(), "data");
  await mkdir(directory, { recursive: true });
  // Local JSONL storage is for development; production should use a database.
  await appendFile(path.join(directory, "submissions.jsonl"), `${JSON.stringify({ type, receivedAt: new Date().toISOString(), data })}\n`, "utf8");
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
    console.info(`[EMAIL TEST MODE] ${subject} to ${to || "[CONTACT_TO_EMAIL not set]"}`, { data, visitorEmail, replyHtml });
    return;
  }

  const resend = new Resend(apiKey);
  const teamResult = await resend.emails.send({ from, to, replyTo: visitorEmail, subject, html });
  if (teamResult.error) throw teamResult.error;
  const replyResult = await resend.emails.send({ from, to: visitorEmail, subject: "We received your message", html: replyHtml });
  if (replyResult.error) throw replyResult.error;
}

export function requestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}
