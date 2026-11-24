import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { allowedRequest, readJsonBody, requestIp, saveSubmission, sendSubmissionEmails } from "@/lib/submission";

export async function POST(request: Request) {
  const isLimited = !allowedRequest(requestIp(request));
  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "request_too_large";
    return NextResponse.json({ error: tooLarge ? "This request is too large. Please shorten the message and try again." : "Please submit a valid request." }, { status: tooLarge ? 413 : 400 });
  }

  if (body && typeof body === "object" && "website" in body && typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (isLimited) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });

  try {
    await saveSubmission("quote", parsed.data);
    await sendSubmissionEmails("quote", parsed.data, parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote submission processing failed", error);
    return NextResponse.json({ error: "We couldn’t process your request just now. Please try again shortly." }, { status: 500 });
  }
}
