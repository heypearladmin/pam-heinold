export type ListingStatus = "For Sale" | "Coming Soon" | "Pending" | "Sold";

export interface ListingImage {
  src: string;
  alt: string;
}

export interface ListingAgent {
  name: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export interface Listing {
  id: string;
  slug: string;
  status: ListingStatus;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  /** Lot size in acres. Omit when not available. */
  acreage?: number;
  yearBuilt?: number;
  /** MLS listing number, when the property has one. Never invent this. */
  mlsNumber?: string;
  /** Short selling point shown on the property card (one sentence). */
  highlight: string;
  description: string;
  features: string[];
  /** First image is used as the card thumbnail and detail-page hero. */
  images: ListingImage[];
  /** Falls back to the site's default agent contact when omitted. */
  agent?: ListingAgent;
}

// ── Listings ──────────────────────────────────────────────────────────────────
// Add a new property by appending a Listing object here. Nothing else needs to
// change — /listings and /listings/[slug] both read from this array.
//
// Image files go in /public/images/listings/{slug}/ as optimized .webp files;
// reference them here as "/images/listings/{slug}/filename.webp".
export const listings: Listing[] = [
  {
    id: "5642-highland-lake-dr",
    slug: "5642-highland-lake-dr",
    status: "For Sale",
    address: "5642 Highland Lake Dr",
    city: "Milton",
    state: "FL",
    zip: "32583",
    price: 650000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 2968,
    acreage: 0.41,
    yearBuilt: 2004,
    mlsNumber: "679185",
    highlight:
      "A meticulously updated brick home with a lake view in The Moors Golf & Racquet Club — new roof, new HVAC, and quartz throughout.",
    description:
      "Gorgeous UPDATED Luxury Home in the Moors Golf & Racquet Club Gated Community, just 15 min. to Downtown Pensacola! With a LAKE VIEW, this HIGH QUALITY all brick home with 4 Beds, 3.5 Baths, 2,968 SF, Living Room, Dining Room, Family Room, PLUS Office, has been meticulously UPDATED from top to bottom, and offers everything you could want in an Executive Style Home, and is MOVE IN READY!\n\nWalk thru the leaded glass front door with arched transom and sidelights, and instantly feel the elegance and spaciousness, boasting 10 ft ceilings in living areas, luxury finishes, two stone surround fireplaces, architectural niche, decorative columns, and other quality amenities. All new updates include: new paint throughout, new LVP flooring throughout, new roof in 1/26, new HVAC in 8/25 (with low electric bills!), new 50 gal. water heater in 11/25, and more.\n\nThe kitchen offers new quartz countertops, new tile backsplash, new stone cabinet siding, all new stainless appliances, new undermount sink and pull-down faucet, over and under cabinet lighting, a separate prep sink, walk-in pantry, breakfast bar, breakfast dining, an island with storage, and a planning desk with built-in cabinet storage.\n\nThe bathrooms have new quartz countertops and new undermount sinks and faucets. There is new professional landscaping, a spacious backyard with plenty of room for a pool, an irrigation system for easy maintenance, a new epoxy-finished garage floor, and a Gladiator organization system in the garage — plus a view of the lake across the street. Enjoy the private community clubhouse with pool, hot tub, tennis courts, gym, and playground. Seller is offering a free home warranty, with acceptable offer, at closing. Don't miss out on this unique home — call now for your private showing!",
    features: [
      "Lake view directly across the street",
      "Two stone-surround fireplaces",
      "10-ft ceilings and a leaded-glass entry with arched transom",
      "New roof (installed January 2026)",
      "New HVAC system (installed August 2025)",
      "New LVP flooring and fresh paint throughout",
      "Quartz countertops in the kitchen and all bathrooms",
      "Kitchen island, walk-in pantry, and separate prep sink",
      "Oversized 2-car garage with epoxy floor and Gladiator storage system",
      "Gated community with clubhouse, pool, hot tub, tennis courts, and gym",
      "Dedicated office plus separate living, dining, and family rooms",
      "Seller offering a home warranty at closing",
    ],
    images: [
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-01.webp", alt: "Front exterior of 5642 Highland Lake Dr, a brick ranch home in Milton, FL with an arched entry and landscaped walkway" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-02.webp", alt: "Close-up view of the brick front exterior with arched covered entry and house number" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-03.webp", alt: "Front exterior showing the three-car garage and driveway" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-04.webp", alt: "Rear exterior of the home with covered porch and open backyard lawn" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-05.webp", alt: "Foyer with decorative columns, arched doorways, and wood flooring, dining area visible" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-06.webp", alt: "Formal dining area with round table, columns, and chandelier" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-07.webp", alt: "Family room with stone-surround fireplace and dining table near French doors" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-08.webp", alt: "Living room with two sofas open to the kitchen and dining area" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-09.webp", alt: "Kitchen with wood cabinetry, quartz countertops, island, and stainless refrigerator" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-10.webp", alt: "Kitchen view toward the refrigerator and wall clock, with cabinetry and pendant lighting" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-11.webp", alt: "Kitchen sink and dishwasher area with quartz countertops" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-12.webp", alt: "Breakfast bar seating open to the hallway and living area" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-13.webp", alt: "Sitting area with woven chairs beside French doors to the covered porch" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-14.webp", alt: "Home office with desk and chair, French doors opening to the foyer" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-15.webp", alt: "Home office desk facing the foyer and formal dining area" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-16.webp", alt: "Primary bedroom with tray ceiling and corner stone fireplace" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-17.webp", alt: "Primary bathroom soaking tub beneath a glass block window" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-18.webp", alt: "Primary bathroom corner vanity with quartz countertop and dual sinks" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-19.webp", alt: "Secondary bedroom with natural light and coastal-themed artwork" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-20.webp", alt: "Secondary bathroom vanity adjoining a bedroom with white and blue bedding" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-21.webp", alt: "Secondary bedroom with blue paisley bedding" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-22.webp", alt: "Hallway with view into a bedroom and toward the kitchen" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-23.webp", alt: "Bathroom vanity with view into a bedroom with a navy and red rug" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-24.webp", alt: "Secondary bedroom with ceiling fan, large windows, and a red patterned rug" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-25.webp", alt: "Powder room with pedestal sink and round mirror" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-26.webp", alt: "Laundry room with sink and built-in cabinetry" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-27.webp", alt: "Oversized two-car garage with epoxy-finished floor" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-28.webp", alt: "Garage interior showing storage shelving and side entry doors" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-29.webp", alt: "The Moors Golf & Racquet Club community clubhouse" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-30.webp", alt: "Main community swimming pool at The Moors Golf & Racquet Club" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-31.webp", alt: "Community spa pool at The Moors Golf & Racquet Club" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-32.webp", alt: "Community tennis courts at The Moors Golf & Racquet Club" },
      { src: "/images/listings/5642-highland-lake-dr/5642-highland-lake-dr-milton-fl-33.webp", alt: "Community playground at The Moors Golf & Racquet Club" },
    ],
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getActiveListings(): Listing[] {
  return listings.filter((l) => l.status !== "Sold");
}

export function formatListingPrice(price: number): string {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatListingAddress(listing: Listing): string {
  return `${listing.city}, ${listing.state} ${listing.zip}`;
}
