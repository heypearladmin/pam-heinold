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
  message: string;
  consent: boolean;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Stable, accessible ids that match between SSR and client render.
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();
  const consentId = useId();
  const statusId = useId();

  const requiredFilled =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "";

  const canSubmit = form.consent && requiredFilled && status !== "submitting";

  const handleChange =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      const value =
        key === "consent"
          ? (e.target as HTMLInputElement).checked
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
          consentText: site.legal.sms.primary,
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

  return (
    <form
      className="mt-14 grid gap-6"
      aria-label="Contact form"
      onSubmit={handleSubmit}
      noValidate={false}
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

      <label htmlFor={messageId} className="block">
        <span className="eyebrow text-charcoal/60 block mb-2">
          What&apos;s on your mind
        </span>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          className={`${inputClass} resize-none`}
          placeholder="A few sentences is plenty."
        />
      </label>

      {/* Consent block — must remain word-for-word per A2P 10DLC review. */}
      <fieldset className="mt-2 border border-warmbrown/20 bg-paper/60 p-5 sm:p-6">
        <legend className="eyebrow text-warmbrown px-2">Consent</legend>

        <div className="flex items-start gap-3">
          <input
            id={consentId}
            type="checkbox"
            name="consent"
            required
            aria-required="true"
            checked={form.consent}
            onChange={handleChange("consent")}
            className="mt-1 h-4 w-4 shrink-0 accent-warmbrown border-warmbrown/50 cursor-pointer"
          />
          <label
            htmlFor={consentId}
            className="text-sm leading-relaxed text-charcoal/85 cursor-pointer"
          >
            <span className="block">
              I agree to receive text messages and phone calls from{" "}
              {site.legal.brand} at the phone number provided. Message
              frequency varies. Message &amp; data rates may apply. Reply{" "}
              <strong>STOP</strong> to unsubscribe. Reply{" "}
              <strong>HELP</strong> for help. By submitting this form, you
              agree to our{" "}
              <Link
                href="/terms"
                className="text-warmbrown underline underline-offset-2 hover:text-nearblack"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/policies"
                className="text-warmbrown underline underline-offset-2 hover:text-nearblack"
              >
                Privacy Policy
              </Link>
              .
            </span>
            <span className="block mt-3 text-charcoal/75">
              By providing your phone number, you consent to receive calls and
              text messages, including automated calls and AI-assisted
              communications, from {site.legal.brand}.
            </span>
          </label>
        </div>
      </fieldset>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          className="inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-warmbrown"
        >
          {status === "submitting" ? "Sending…" : "Send Note"}
        </button>

        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className="mt-5 text-sm min-h-[1.25rem]"
        >
          {status === "success" && (
            <span className="text-warmbrown">
              Thank you — your note is in. Pam will reply within one business
              day.
            </span>
          )}
          {status === "error" && (
            <span className="text-erared">
              {errorMessage ??
                "Something went wrong. Please try again, or call directly."}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
