export const site = {
  agent: {
    firstName: "Pam",
    lastName: "Heinold",
    fullName: "Pamela Heinold",
    title: "Pensacola Real Estate Authority",
    yearsExperience: 22,
    headshot: "/images/pam-heinold-headshot.jpg",
    headshotAlt:
      "Portrait of Pam Heinold, REALTOR® with ERA American Real Estate",
    tagline: "Let's find the place that feels like home.",
  },
  company: {
    name: "ERA American Real Estate",
    nameStyled: "ERA AMERICAN REAL ESTATE",
    independenceLine: "Independently owned & operated",
    phone: "(850) 232-2332",
    phoneHref: "tel:+18502322332",
    email: "pam@pamheinold.com",
    emailHref: "mailto:pam@pamheinold.com",
    hyperlocalArea: "Pensacola, FL",
    website: "https://pamheinold.com",
  },
  social: {
    facebook: "https://www.facebook.com/PamHeinoldRealEstateExperts",
    instagram:
      "https://www.instagram.com/pamheinoldrealtor?igsh=MTVjc2VlbjVscjgxdQ==",
    linkedin: "https://www.linkedin.com/in/pamelaheinold/",
    youtube: "https://www.youtube.com/@PamHeinold",
  },
  logo: {
    primary: "/images/era-american-logo.svg",
    light: "/images/era-american-logo-light.svg",
    alt: "ERA American Real Estate",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Relocation", href: "/relocation" },
    { label: "Notes", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  /**
   * A2P 10DLC / GoHighLevel AI-dialer compliance copy.
   * Edit the brand string here and every consent surface updates in lockstep —
   * carrier reviewers reject campaigns whose disclosures drift across pages.
   */
  legal: {
    brand: "ERA American Real Estate",
    effectiveDate: "January 1, 2026",
    consentVersion: "2026-01-A",
    sms: {
      // EXACT required language. Do not rewrite — carrier audits grep for this string.
      primary:
        "I agree to receive text messages and phone calls from ERA American Real Estate at the phone number provided. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe. Reply HELP for help. By submitting this form, you agree to our Terms & Conditions and Privacy Policy.",
      ai:
        "By providing your phone number, you consent to receive calls and text messages, including automated calls and AI-assisted communications, from ERA American Real Estate.",
    },
    privacy: {
      // EXACT required clause for /policies — must appear verbatim for 10DLC approval.
      mobileSharingClause:
        "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
    },
  },
};
