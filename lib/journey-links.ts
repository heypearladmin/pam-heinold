export interface JourneyLink {
  label: string;
  href: string;
}

export const buyingJourneyLinks: JourneyLink[] = [
  { label: "Buying a Home", href: "/services/buying" },
  { label: "Getting Pre-Approved", href: "/services/buying#getting-pre-approved" },
  { label: "Finding the Right Home", href: "/services/buying#finding-the-right-home" },
  { label: "Making an Offer", href: "/services/buying#making-an-offer" },
  { label: "Home Inspections", href: "/services/buying#home-inspections" },
  { label: "Closing Costs & Closing Day", href: "/services/buying#closing" },
];

export const sellingJourneyLinks: JourneyLink[] = [
  { label: "Home Selling Guide", href: "/services/selling" },
  { label: "What's My Home Worth?", href: "/services/selling#whats-my-home-worth" },
  { label: "Preparing Your Home", href: "/services/selling#home-staging" },
  { label: "Pricing Your Home", href: "/blog/why-pensacola-homes-sit-on-market" },
  { label: "Marketing Your Home", href: "/services/selling#marketing-your-home" },
  { label: "Understanding Offers", href: "/blog/what-buyers-expect-pensacola-sellers-2026" },
  { label: "Negotiating Offers", href: "/services/selling#negotiating-offers" },
  { label: "Closing the Sale", href: "/services/selling#closing-the-sale" },
];

/**
 * Maps a blog post slug to the buying/selling journey it belongs to, so
 * app/blog/[slug]/page.tsx can render contextual links to the Services
 * pillar pages without touching the post's raw content array.
 * "dual" posts (market notes relevant to both buyers and sellers) get a
 * compact two-link version instead of the full journey list.
 */
export const journeyBySlug: Record<string, "buying" | "selling" | "dual"> = {
  "closing-costs-pensacola-guide": "buying",
  "renting-vs-buying-pensacola-2026": "buying",
  "first-time-homebuyer-guide-pensacola": "buying",
  "what-being-ready-to-buy-means-pensacola": "buying",
  "what-changes-your-monthly-payment-pensacola": "buying",
  "why-same-price-homes-feel-different-pensacola": "buying",
  "new-construction-vs-existing-homes-pensacola": "buying",
  "future-home-maintenance-costs-pensacola": "buying",
  "what-protects-home-value-pensacola": "buying",
  "pensacola-homeowners-insurance-guide": "buying",

  "biggest-seller-mistakes-before-listing-pensacola": "selling",
  "why-pensacola-homes-sit-on-market": "selling",
  "what-buyers-expect-pensacola-sellers-2026": "selling",
  "preparing-your-pensacola-home-for-luxury-market": "selling",

  "how-to-know-home-is-priced-right-pensacola": "dual",
  "pensacola-luxury-market-2026": "dual",
  "pensacola-luxury-market-insights-2026": "dual",
  "pensacola-real-estate-market-update-august-2026": "dual",
};
