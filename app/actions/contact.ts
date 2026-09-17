"use server";

import { site } from "@/lib/site";

const GHL_LOCATION_ID = "0OPuLHgxqCWZe7IQIS3e";
const GHL_API_URL = "https://services.leadconnectorhq.com/contacts/";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

// Anti-spam thresholds for the time-trap below.
const MIN_SUBMIT_MS = 2000; // faster than this is almost certainly a bot
const MAX_SUBMIT_MS = 6 * 60 * 60 * 1000; // older than this is a stale/replayed page load

/** Silent, generic success — spam is dropped without telling the caller why. */
const FAKE_SUCCESS: ContactResult = { ok: true };

export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  // ── Bot gatekeeping — must happen before any real validation or GHL call ──

  // Honeypot: real visitors never see or fill this field.
  const honeypot = (formData.get("website") as string ?? "").trim();
  if (honeypot) {
    console.info("[contact] blocked: honeypot filled");
    return FAKE_SUCCESS;
  }

  // Time-trap: the server independently computes elapsed time — a client
  // "verified" flag is never trusted, since a bot can fabricate one.
  const rawLoadedAt = formData.get("formLoadedAt") as string ?? "";
  const loadedAt = Number(rawLoadedAt);
  if (!rawLoadedAt || !Number.isFinite(loadedAt)) {
    console.info("[contact] blocked: missing/invalid formLoadedAt");
    return FAKE_SUCCESS;
  }
  const elapsed = Date.now() - loadedAt;
  if (elapsed < MIN_SUBMIT_MS) {
    console.info("[contact] blocked: submitted too fast", { elapsed });
    return FAKE_SUCCESS;
  }
  if (elapsed > MAX_SUBMIT_MS) {
    console.info("[contact] blocked: stale form load", { elapsed });
    return FAKE_SUCCESS;
  }

  const firstName = (formData.get("firstName") as string ?? "").trim();
  const lastName  = (formData.get("lastName")  as string ?? "").trim();
  const email     = (formData.get("email")     as string ?? "").trim();
  const phone     = (formData.get("phone")     as string ?? "").trim();
  const consentNonMarketing = formData.get("consentNonMarketing") === "on";
  const consentMarketing    = formData.get("consentMarketing")    === "on";

  // Which CTA sent this lead, and what they said they need — both optional,
  // both default safely so older/simpler form callers keep working.
  const ALLOWED_INTENTS = ["buying", "selling", "relocation", "neighborhood", "general"];
  const rawIntent = (formData.get("intent") as string ?? "").trim();
  const intent = ALLOWED_INTENTS.includes(rawIntent) ? rawIntent : "general";
  const leadSource = (formData.get("source") as string ?? "").trim();
  const message = (formData.get("message") as string ?? "").trim();

  if (!firstName) return { ok: false, error: "First name is required." };
  if (!lastName)  return { ok: false, error: "Last name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!phone) return { ok: false, error: "Phone number is required." };

  const apiKey = process.env.GHL_API_KEY;

  if (!apiKey) {
    console.info("[contact] GHL_API_KEY not set:", { firstName, lastName, email, phone, intent, leadSource });
    return { ok: true };
  }

  const tags = ["website-contact-form", `cta-${intent}`];
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
      { key: "inquiry_intent",         field_value: intent },
      { key: "lead_source_page",       field_value: leadSource || "direct" },
      ...(message ? [{ key: "message", field_value: message }] : []),
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
