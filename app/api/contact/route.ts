import { NextRequest, NextResponse } from "next/server";

/**
 * Route handler for the A2P 10DLC compliant contact form.
 *
 * Creates a contact directly in GoHighLevel via the Contacts API.
 *
 * Configure on Vercel:
 *   Project Settings → Environment Variables → add:
 *     GHL_API_KEY = pit-xxxx   (Settings → Integrations → API Keys)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GHL_LOCATION_ID = "0OPuLHgxqCWZe7IQIS3e";
const GHL_API_URL = "https://services.leadconnectorhq.com/contacts/";

interface IncomingPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
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

  const apiKey = process.env.GHL_API_KEY;

  if (!apiKey) {
    // Local dev fallback — log and acknowledge so the form works without credentials.
    console.info("[contact] GHL_API_KEY not set. Would have created contact:", {
      firstName, lastName, email, phone, message,
      consentNonMarketing, consentMarketing,
    });
    return NextResponse.json({ ok: true });
  }

  // Build tags from consent selections for 10DLC audit trail.
  const tags: string[] = ["website-contact-form"];
  if (consentNonMarketing) tags.push("sms-consent-non-marketing");
  if (consentMarketing) tags.push("sms-consent-marketing");

  const ghlPayload = {
    locationId: GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    phone,
    source: "pamheinoldhomes.com",
    tags,
    customFields: [
      ...(message ? [{ key: "message", field_value: message }] : []),
      {
        key: "consent_version",
        field_value: body.consentVersion ?? "",
      },
      {
        key: "consent_non_marketing",
        field_value: String(consentNonMarketing),
      },
      {
        key: "consent_marketing",
        field_value: String(consentMarketing),
      },
      {
        key: "consent_submitted_at",
        field_value: body.submittedAt ?? new Date().toISOString(),
      },
      {
        key: "page_url",
        field_value: body.pageUrl ?? "",
      },
    ],
  };

  try {
    const upstream = await fetch(GHL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(ghlPayload),
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error("[contact] GHL API error", upstream.status, detail);
      return NextResponse.json(
        { error: "We could not deliver your message. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] GHL API request failed:", err);
    return NextResponse.json(
      { error: "We could not deliver your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
