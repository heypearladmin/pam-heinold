"use server";

import { site } from "@/lib/site";

const GHL_LOCATION_ID = "0OPuLHgxqCWZe7IQIS3e";
const GHL_API_URL = "https://services.leadconnectorhq.com/contacts/";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const firstName = (formData.get("firstName") as string ?? "").trim();
  const lastName  = (formData.get("lastName")  as string ?? "").trim();
  const email     = (formData.get("email")     as string ?? "").trim();
  const phone     = (formData.get("phone")     as string ?? "").trim();
  const consentNonMarketing = formData.get("consentNonMarketing") === "on";
  const consentMarketing    = formData.get("consentMarketing")    === "on";

  if (!firstName) return { ok: false, error: "First name is required." };
  if (!lastName)  return { ok: false, error: "Last name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!phone) return { ok: false, error: "Phone number is required." };

  const apiKey = process.env.GHL_API_KEY;

  if (!apiKey) {
    console.info("[contact] GHL_API_KEY not set:", { firstName, lastName, email, phone });
    return { ok: true };
  }

  const tags = ["website-contact-form"];
  if (consentNonMarketing) tags.push("sms-consent-non-marketing");
  if (consentMarketing)    tags.push("sms-consent-marketing");

  const payload = {
    locationId: GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    phone,
    source: "pamheinoldhomes.com",
    tags,
    customFields: [
      { key: "consent_non_marketing",  field_value: String(consentNonMarketing) },
      { key: "consent_marketing",      field_value: String(consentMarketing) },
      { key: "consent_version",        field_value: site.legal.consentVersion },
    ],
  };

  try {
    const res = await fetch(GHL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] GHL error", res.status, detail);
      return { ok: false, error: "We could not deliver your message. Please try again." };
    }
  } catch (err) {
    console.error("[contact] GHL request failed:", err);
    return { ok: false, error: "We could not deliver your message. Please try again." };
  }

  return { ok: true };
}
