export const site = {
  agent: {
    firstName: "Pam",
    lastName: "Heinold",
    fullName: "Pamela Heinold",
    title: "Pensacola Real Estate Authority",
    yearsExperience: 22,
    headshot: "/images/pam-heinold-headshot.jpg",
    headshotAlt:
      "Portrait of Pam Heinold, REALTOR® with LPT Realty",
    tagline: "Let's find the place that feels like home.",
  },
  company: {
    name: "LPT Realty",
    nameStyled: "LPT REALTY",
    independenceLine: "",
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
    gbp: "https://share.google/Pghp1LZqZzZf4S11W",
    zillow: "https://www.zillow.com/profile/PamelaHeinoldRealtor",
    realtor: "https://www.realtor.com/realestateagents/56c488630fa417010075e0b5",
  },
  logo: {
    primary: "/images/lpt-realty-logo.png",
    light: "/images/lpt-realty-logo.png",
    alt: "LPT Realty",
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
    brand: "LPT Realty",
    effectiveDate: "January 1, 2026",
    consentVersion: "2026-01-A",
    sms: {
      // EXACT required language. Do not rewrite — carrier audits grep for this string.
      primary:
        "I agree to receive text messages and phone calls from LPT Realty at the phone number provided. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe. Reply HELP for help. By submitting this form, you agree to our Terms & Conditions and Privacy Policy.",
      ai:
        "By providing your phone number, you consent to receive calls and text messages, including automated calls and AI-assisted communications, from LPT Realty.",
      nonMarketing:
        "I consent to receive non-marketing text messages from LPT Realty regarding appointment confirmations, appointment reminders, account notifications, customer support updates, and service-related communications. Message frequency varies, message & data rates may apply. Reply HELP for assistance, reply STOP to opt out.",
      marketing:
        "I consent to receive marketing text messages from LPT Realty regarding real estate market updates, special offers, promotions, and service announcements. Message frequency varies, message & data rates may apply. Reply HELP for assistance, reply STOP to opt out.",
    },
    privacy: {
      // EXACT required clause for /policies — must appear verbatim for 10DLC approval.
      mobileSharingClause:
        "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
    },
  },
};
