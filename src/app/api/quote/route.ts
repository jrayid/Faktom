import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { allowedRequest, requestIp, saveSubmission, sendSubmissionEmails } from "@/lib/submission";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid request." }, { status: 400 });
  }

  if (body && typeof body === "object" && "website" in body && typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (!allowedRequest(requestIp(request))) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

  try {
    await saveSubmission("quote", parsed.data);
    await sendSubmissionEmails("quote", parsed.data, parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote submission processing failed", error);
    return NextResponse.json({ error: "We couldn’t process your request just now. Please try again shortly." }, { status: 500 });
  }
}
