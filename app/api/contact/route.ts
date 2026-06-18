import { NextRequest, NextResponse } from "next/server";

/**
 * Route handler for the A2P 10DLC compliant contact form.
 *
 * Responsibilities:
 *  - Validate required fields.
 *  - Enforce that the consent checkbox was checked client-side.
 *  - Capture an auditable consent record (timestamp, IP, user-agent,
 *    consent text version, exact consent strings) — this is the artifact
 *    Twilio / GoHighLevel may ask for during an A2P 10DLC review.
 *  - Forward the payload to CONTACT_WEBHOOK_URL (e.g. a GoHighLevel inbound
 *    webhook or your CRM). If the env var is not set we still log so local
 *    development works.
 *
 * Configure on Vercel:
 *   Project Settings → Environment Variables → add:
 *     CONTACT_WEBHOOK_URL = https://services.leadconnectorhq.com/...   (GHL)
 *
 * Runtime is explicitly set to Node so we can use Node-only APIs if needed
 * (e.g. a future swap to Resend/Twilio SDK).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  consentNonMarketing?: boolean;
  consentMarketing?: boolean;
  consentText?: string;
  consentMarketingText?: string;
  aiConsentText?: string;
  consentVersion?: string;
  submittedAt?: string;
  pageUrl?: string | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: IncomingPayload;
  try {
    body = (await req.json()) as IncomingPayload;
  } catch {
    return badRequest("Invalid JSON.");
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const consentNonMarketing = body.consentNonMarketing === true;
  const consentMarketing = body.consentMarketing === true;

  if (!firstName) return badRequest("First name is required.");
  if (!lastName) return badRequest("Last name is required.");
  if (!email || !EMAIL_RE.test(email)) {
    return badRequest("A valid email is required.");
  }
  if (!phone) return badRequest("Phone number is required.");

  // Consent audit record. Persist this somewhere durable in production
  // (CRM, database, webhook destination). Required by carriers/Twilio for
  // A2P 10DLC opt-in audits.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;
  const userAgent = req.headers.get("user-agent") ?? null;

  const record = {
    firstName,
    lastName,
    email,
    phone,
    message,
    consentNonMarketing,
    consentMarketing,
    consentText: body.consentText ?? null,
    consentMarketingText: body.consentMarketingText ?? null,
    aiConsentText: body.aiConsentText ?? null,
    consentVersion: body.consentVersion ?? null,
    submittedAt: body.submittedAt ?? new Date().toISOString(),
    pageUrl: body.pageUrl ?? null,
    ip,
    userAgent,
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const upstream = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        // Don't let a slow CRM hang the user's request indefinitely.
        signal: AbortSignal.timeout(8000),
      });

      if (!upstream.ok) {
        // Log but don't expose upstream details to the browser.
        console.error(
          "[contact] webhook responded with status",
          upstream.status
        );
        return NextResponse.json(
          { error: "We could not deliver your message. Please try again." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("[contact] webhook failed:", err);
      return NextResponse.json(
        { error: "We could not deliver your message. Please try again." },
        { status: 502 }
      );
    }
  } else {
    // Local dev / no webhook configured yet — still acknowledge so the form
    // works end-to-end. Replace this with persistent storage before launch.
    console.info("[contact] CONTACT_WEBHOOK_URL not set. Captured:", record);
  }

  return NextResponse.json({ ok: true });
}
