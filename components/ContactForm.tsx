"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consentNonMarketing: boolean;
  consentMarketing: boolean;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consentNonMarketing: false,
  consentMarketing: false,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const consentNonMarketingId = useId();
  const consentMarketingId = useId();
  const statusId = useId();

  const requiredFilled =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "";

  const canSubmit = requiredFilled && status !== "submitting";

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value =
        key === "consentNonMarketing" || key === "consentMarketing"
          ? e.target.checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          consent: form.consentNonMarketing || form.consentMarketing,
          consentText: site.legal.sms.nonMarketing,
          consentMarketingText: site.legal.sms.marketing,
          aiConsentText: site.legal.sms.ai,
          consentVersion: site.legal.consentVersion,
          submittedAt: new Date().toISOString(),
          pageUrl:
            typeof window !== "undefined" ? window.location.href : null,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || "Submission failed.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-warmbrown/40 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-warmbrown transition-colors duration-300";

  if (status === "success") {
    return (
      <div className="mt-14 grid gap-6">
        <div className="border border-warmbrown/20 bg-paper/60 p-8 sm:p-10 text-center grid gap-5">
          <p className="text-warmbrown text-lg">
            Thank you — your note is in. Pam will reply within one business day.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mx-auto inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
          >
            Submit Another
          </button>
        </div>

        <p className="text-xs text-charcoal/50">
          <Link
            href="/policies"
            className="underline underline-offset-2 hover:text-warmbrown transition-colors"
          >
            Privacy Policy
          </Link>
          {" | "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-warmbrown transition-colors"
          >
            Terms and Conditions
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-14 grid gap-6"
      aria-label="Contact form"
      onSubmit={handleSubmit}
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <label htmlFor={firstNameId} className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            First Name <span aria-hidden="true">*</span>
          </span>
          <input
            id={firstNameId}
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            aria-required="true"
            value={form.firstName}
            onChange={handleChange("firstName")}
            className={inputClass}
            placeholder="First name"
          />
        </label>

        <label htmlFor={lastNameId} className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            Last Name <span aria-hidden="true">*</span>
          </span>
          <input
            id={lastNameId}
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            aria-required="true"
            value={form.lastName}
            onChange={handleChange("lastName")}
            className={inputClass}
            placeholder="Last name"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <label htmlFor={emailId} className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            Email <span aria-hidden="true">*</span>
          </span>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            required
            aria-required="true"
            value={form.email}
            onChange={handleChange("email")}
            className={inputClass}
            placeholder="you@email.com"
          />
        </label>

        <label htmlFor={phoneId} className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            Phone <span aria-hidden="true">*</span>
          </span>
          <input
            id={phoneId}
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            aria-required="true"
            inputMode="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            className={inputClass}
            placeholder="(555) 555-5555"
          />
        </label>
      </div>

      {/* Consent checkboxes — optional per A2P 10DLC dual-consent pattern. */}
      <fieldset className="mt-2 border border-warmbrown/20 bg-paper/60 p-5 sm:p-6 grid gap-4">
        <legend className="eyebrow text-warmbrown px-2">Consent</legend>

        <p className="text-xs text-charcoal/45 -mt-1">Optional — check whichever applies to you.</p>

        <div className="flex items-baseline gap-3">
          <input
            id={consentNonMarketingId}
            type="checkbox"
            name="consentNonMarketing"
            checked={form.consentNonMarketing}
            onChange={handleChange("consentNonMarketing")}
            className="relative top-[2px] h-4 w-4 shrink-0 accent-warmbrown border-warmbrown/50 cursor-pointer"
          />
          <label
            htmlFor={consentNonMarketingId}
            className="text-sm leading-relaxed text-charcoal/85 cursor-pointer"
          >
            I consent to receive non-marketing text messages from{" "}
            <strong>{site.legal.brand}</strong> regarding appointment
            confirmations, appointment reminders, account notifications,
            customer support updates, and service-related communications.
            Message frequency varies, message &amp; data rates may apply.
            Reply <strong>HELP</strong> for assistance, reply{" "}
            <strong>STOP</strong> to opt out.
          </label>
        </div>

        <div className="flex items-baseline gap-3">
          <input
            id={consentMarketingId}
            type="checkbox"
            name="consentMarketing"
            checked={form.consentMarketing}
            onChange={handleChange("consentMarketing")}
            className="relative top-[2px] h-4 w-4 shrink-0 accent-warmbrown border-warmbrown/50 cursor-pointer"
          />
          <label
            htmlFor={consentMarketingId}
            className="text-sm leading-relaxed text-charcoal/85 cursor-pointer"
          >
            I consent to receive marketing text messages from{" "}
            <strong>{site.legal.brand}</strong> regarding real estate market
            updates, special offers, promotions, and service announcements.
            Message frequency varies, message &amp; data rates may apply.
            Reply <strong>HELP</strong> for assistance, reply{" "}
            <strong>STOP</strong> to opt out.
          </label>
        </div>
      </fieldset>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          className="w-full sm:w-auto inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-warmbrown"
        >
          {status === "submitting" ? "Sending…" : "Send Note"}
        </button>

        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className="mt-5 text-sm min-h-[1.25rem]"
        >
          {status === "error" && (
            <span className="text-erared">
              {errorMessage ??
                "Something went wrong. Please try again, or call directly."}
            </span>
          )}
        </p>

        <p className="mt-6 text-xs text-charcoal/50">
          <Link
            href="/policies"
            className="underline underline-offset-2 hover:text-warmbrown transition-colors"
          >
            Privacy Policy
          </Link>
          {" | "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-warmbrown transition-colors"
          >
            Terms and Conditions
          </Link>
        </p>
      </div>
    </form>
  );
}
