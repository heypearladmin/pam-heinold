import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for LPT Realty, including SMS, AI-assisted calling, and website usage terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const { company, legal } = site;

  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms &"
      scriptAccent="conditions."
      effectiveDate={legal.effectiveDate}
    >
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of
        the website operated by Pamela Heinold, REALTOR® with{" "}
        {legal.brand} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;), and your communications with us by phone call and
        text message. By using this website or providing your phone number
        through any form on this site, you agree to these Terms.
      </p>

      <h2>1. SMS / Text Message Communications</h2>
      <p>
        When you submit a form that includes your mobile phone number and you
        check the consent box, you opt in to receive text messages from{" "}
        {legal.brand} related to real estate services, including but not
        limited to property inquiries, appointment scheduling, market updates,
        and follow-up communications.
      </p>
      <ul>
        <li>Message frequency varies based on your interaction with us.</li>
        <li>
          Message &amp; data rates may apply. Check with your wireless carrier
          for details.
        </li>
        <li>
          Reply <strong>STOP</strong> at any time to unsubscribe from text
          messages. You will receive a confirmation message and no further
          texts will be sent.
        </li>
        <li>
          Reply <strong>HELP</strong> to receive information on how to get
          assistance.
        </li>
        <li>
          Supported carriers include AT&amp;T, Verizon Wireless, T-Mobile,
          Sprint, and most other U.S. carriers. Carriers are not liable for
          delayed or undelivered messages.
        </li>
      </ul>

      <h2>2. Phone Calls &amp; AI-Assisted Communications</h2>
      <p>
        By providing your phone number, you consent to receive phone calls
        from {legal.brand}, including calls placed by automated dialing
        systems and calls in which an artificial or pre-recorded voice or
        AI-assisted voice agent is used. Consent to receive these calls is
        not a condition of any purchase or service. You may revoke this
        consent at any time by replying STOP to a text message, asking to be
        removed during any call, or contacting us using the information
        below.
      </p>

      <h2>3. Privacy</h2>
      <p>
        Your use of this site and our communications is also governed by our{" "}
        <Link href="/policies">Privacy Policy</Link>, which explains what
        information we collect, how we use it, and how mobile opt-in data is
        handled.
      </p>

      <h2>4. Website Use</h2>
      <p>
        Content on this website — including text, images, listings, market
        commentary, and design — is provided for general informational
        purposes about the Pensacola, Florida real estate market. It does not
        constitute a binding offer, legal advice, financial advice, or a
        guarantee of property availability or pricing. You agree not to
        reproduce, scrape, or redistribute content from this site for
        commercial purposes without our prior written consent.
      </p>

      <h2>5. Real Estate Disclosure</h2>
      <p>
        Pamela Heinold is a licensed REALTOR® in the State of Florida
        operating under {legal.brand}. {company.independenceLine}. All real
        estate transactions are subject to the terms of an executed written
        agreement. Equal Housing Opportunity.
      </p>

      <h2>6. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The effective date at
        the top of this page reflects the most recent revision. Continued use
        of the site or our communications after a change constitutes your
        acceptance of the updated Terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these Terms can be directed to:
      </p>
      <ul>
        <li>{legal.brand}</li>
        <li>{company.hyperlocalArea}</li>
        <li>
          Phone:{" "}
          <a href={company.phoneHref} className="link-underline">
            {company.phone}
          </a>
        </li>
        <li>
          Email:{" "}
          <a href={company.emailHref} className="link-underline">
            {company.email}
          </a>
        </li>
      </ul>
    </LegalPage>
  );
}
