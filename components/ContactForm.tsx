"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContact, type ContactResult } from "@/app/actions/contact";
import { site } from "@/lib/site";

const initialState: ContactResult | null = null;

export default function ContactForm() {
  const [result, action, isPending] = useActionState(submitContact, initialState);

  const inputClass =
    "w-full bg-transparent border-b border-warmbrown/40 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-warmbrown transition-colors duration-300";

  if (result?.ok) {
    return (
      <div className="mt-14 grid gap-6">
        <div className="border border-warmbrown/20 bg-paper/60 p-8 sm:p-10 text-center grid gap-5">
          <p className="text-warmbrown text-lg">
            Thank you — your note is in. Pam will reply within one business day.
          </p>
          <form action={action}>
            <button
              type="submit"
              className="mx-auto inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
            >
              Submit Another
            </button>
          </form>
        </div>
        <p className="text-xs text-charcoal/50">
          <Link href="/policies" className="underline underline-offset-2 hover:text-warmbrown transition-colors">
            Privacy Policy
          </Link>
          {" | "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-warmbrown transition-colors">
            Terms and Conditions
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="mt-14 grid gap-6" aria-label="Contact form">
      <div className="grid sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            First Name <span aria-hidden="true">*</span>
          </span>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            className={inputClass}
            placeholder="First name"
          />
        </label>

        <label className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            Last Name <span aria-hidden="true">*</span>
          </span>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            className={inputClass}
            placeholder="Last name"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            Email <span aria-hidden="true">*</span>
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className={inputClass}
            placeholder="you@email.com"
          />
        </label>

        <label className="block">
          <span className="eyebrow text-charcoal/60 block mb-2">
            Phone <span aria-hidden="true">*</span>
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
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
            type="checkbox"
            name="consentNonMarketing"
            className="relative top-[2px] h-4 w-4 shrink-0 accent-warmbrown cursor-pointer"
          />
          <span className="text-sm leading-relaxed text-charcoal/85">
            I consent to receive non-marketing text messages from{" "}
            <strong>{site.legal.brand}</strong> regarding appointment
            confirmations, appointment reminders, account notifications,
            customer support updates, and service-related communications.
            Message frequency varies, message &amp; data rates may apply.
            Reply <strong>HELP</strong> for assistance, reply{" "}
            <strong>STOP</strong> to opt out.
          </span>
        </div>

        <div className="flex items-baseline gap-3">
          <input
            type="checkbox"
            name="consentMarketing"
            className="relative top-[2px] h-4 w-4 shrink-0 accent-warmbrown cursor-pointer"
          />
          <span className="text-sm leading-relaxed text-charcoal/85">
            I consent to receive marketing text messages from{" "}
            <strong>{site.legal.brand}</strong> regarding real estate market
            updates, special offers, promotions, and service announcements.
            Message frequency varies, message &amp; data rates may apply.
            Reply <strong>HELP</strong> for assistance, reply{" "}
            <strong>STOP</strong> to opt out.
          </span>
        </div>
      </fieldset>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="w-full sm:w-auto inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-warmbrown"
        >
          {isPending ? "Sending…" : "Send Note"}
        </button>

        {result && !result.ok && (
          <p role="alert" className="mt-5 text-sm text-erared">
            {result.error ?? "Something went wrong. Please try again, or call directly."}
          </p>
        )}

        <p className="mt-6 text-xs text-charcoal/50">
          <Link href="/policies" className="underline underline-offset-2 hover:text-warmbrown transition-colors">
            Privacy Policy
          </Link>
          {" | "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-warmbrown transition-colors">
            Terms and Conditions
          </Link>
        </p>
      </div>
    </form>
  );
}
