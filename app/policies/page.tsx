import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for ERA American Real Estate, including how mobile information and SMS opt-in data are handled.",
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  const { company, legal } = site;

  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      scriptAccent="policy."
      effectiveDate={legal.effectiveDate}
    >
      <p>
        This Privacy Policy describes how Pamela Heinold, REALTOR® with{" "}
        {legal.brand} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;), collects, uses, and protects personal information
        you provide through this website and related communications, including
        SMS and phone calls.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Contact information</strong> you submit through forms, such
          as first name, last name, email address, phone number, and the
          message you write.
        </li>
        <li>
          <strong>Consent metadata</strong> when you check a consent box,
          including a timestamp, the consent language version you agreed to,
          your IP address, and your browser user-agent string, retained as
          evidence of opt-in.
        </li>
        <li>
          <strong>Communications</strong> we exchange with you by email, SMS,
          phone, or our website.
        </li>
        <li>
          <strong>Site analytics</strong> such as pages viewed, referring
          source, and approximate location, collected through standard server
          logs and any analytics tools we operate.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiry and provide real estate services.</li>
        <li>
          To send you SMS messages and place phone calls, including automated
          and AI-assisted communications, that you have opted in to receive.
        </li>
        <li>
          To send you market updates, listing information, and follow-up
          communications related to your stated interest.
        </li>
        <li>To comply with our legal, regulatory, and tax obligations.</li>
      </ul>

      <h2>3. Mobile Information &amp; SMS Opt-In Data</h2>
      {/*
        The clause below must appear verbatim. A2P 10DLC reviewers and
        Twilio/GoHighLevel campaign brand reviewers search for this exact
        sentence. Do not edit, paraphrase, or split it across multiple
        paragraphs.
      */}
      <p>
        <strong>{legal.privacy.mobileSharingClause}</strong>
      </p>
      <p>
        In plain language: your phone number and the fact that you opted in to
        receive SMS or AI-assisted phone communications from us will not be
        sold, rented, shared, or otherwise disclosed to third parties or
        affiliates for their marketing or promotional purposes. We may share
        other information you provide (such as your stated property
        preferences) with service providers strictly to help us deliver the
        service you asked for — never for outside marketing.
      </p>

      <h2>4. How to Opt Out</h2>
      <ul>
        <li>
          Reply <strong>STOP</strong> to any text message from us to be
          immediately removed from SMS communications.
        </li>
        <li>
          Reply <strong>HELP</strong> to any text message to receive
          information on how to reach us.
        </li>
        <li>
          Ask to be removed during any phone call, or email{" "}
          <a href={company.emailHref} className="link-underline">
            {company.email}
          </a>
          .
        </li>
      </ul>

      <h2>5. Data Retention &amp; Security</h2>
      <p>
        We retain your contact information and consent records for as long as
        you remain a client or prospective client, and as required by
        applicable law and industry standards (including A2P 10DLC audit
        requirements). We use commercially reasonable administrative and
        technical safeguards to protect personal information.
      </p>

      <h2>6. Your Choices</h2>
      <p>
        You may request access to, correction of, or deletion of the personal
        information we hold about you by contacting us using the information
        below. Some information may be retained where required by law or for
        legitimate business purposes such as recordkeeping of consent.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The effective
        date at the top of this page reflects the most recent revision. By
        continuing to use this site or our communications after a change, you
        accept the updated policy.
      </p>

      <h2>8. Related Terms</h2>
      <p>
        This Privacy Policy operates together with our{" "}
        <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>

      <h2>9. Contact</h2>
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
