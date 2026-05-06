export interface Neighborhood {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  lifestyleAngle: string;
  image: string;
  imageAlt: string;
  overview: string;
  lifestyle: string;
  realEstateStyle: string;
  attractions: string[];
  whyPeopleMove: string;
  architecture: string;
  walkability: string;
  schools: string;
  communityVibe: string;
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "marcus-pointe",
    name: "Marcus Pointe",
    tagline: "Established gated calm, anchored by golf.",
    shortDescription:
      "A mature, golf-anchored gated community of approximately 500 homes — one of Pensacola's most established luxury enclaves and one of Pam's most carefully tended farms.",
    lifestyleAngle: "Established, gated, golf-community quiet.",
    image: "/images/neighborhood-marcus-pointe.jpg",
    imageAlt: "Marcus Pointe gated golf community home with mature landscaping",
    overview:
      "Marcus Pointe is one of Pensacola's most beloved gated communities, built around a beautiful golf course and home to roughly 500 carefully tended residences. The neighborhood has matured into a settled, multigenerational community with a strong sense of identity.",
    lifestyle:
      "Daily life in Marcus Pointe moves at a thoughtful pace. Quiet mornings with coffee on the back porch, afternoons on the course, neighborhood dinners that turn into long conversations. The community has the kind of feel that doesn't get built — only earned over time.",
    realEstateStyle:
      "Marcus Pointe homes range from beautifully maintained originals to thoughtfully renovated luxury rebuilds. Lot privacy, golf-course frontage, and architectural pedigree all carry meaningful premium. The homes that come to market here typically reward thoughtful preparation.",
    attractions: [
      "Marcus Pointe Golf Course and clubhouse",
      "Gated entry and 24-hour quiet",
      "Mature tree canopy and established streetscape",
      "Quick access to downtown Pensacola and I-10",
      "Strong, established community calendar",
    ],
    whyPeopleMove:
      "Marcus Pointe attracts buyers looking for permanence, privacy, and a community feel that comes from decades of careful neighborhood stewardship. Many residents stay for decades, which itself tells the story of what the neighborhood offers.",
    architecture:
      "Traditional Florida architecture, mature Mediterranean influences, and a growing number of beautifully updated luxury rebuilds. The strongest homes respect the established neighborhood character while introducing modern comfort.",
    walkability:
      "More residential than walkable in the urban sense — but the community itself is designed for strolls, golf-cart rounds, and the kind of slow Sunday-afternoon pace that makes a gated community feel like a retreat.",
    schools:
      "Served by some of Pensacola's strongest schools, with several private and faith-based options nearby. Many Marcus Pointe families plan their children's full school path within the surrounding area.",
    communityVibe:
      "Established, multigenerational, and quietly social. People know their neighbors here, the porches get used, and the community holiday calendar genuinely matters.",
  },
  {
    slug: "nature-trail",
    name: "Nature Trail",
    tagline: "Modern gated living, beautifully amenitied.",
    shortDescription:
      "A 600-home gated community with an exceptional clubhouse, family-oriented amenities, and architecture that leans contemporary — Pam's other most carefully studied farm.",
    lifestyleAngle: "Family-anchored, amenity-rich, gated and modern.",
    image: "/images/neighborhood-nature-trail.jpg",
    imageAlt: "Nature Trail Pensacola contemporary gated community home",
    overview:
      "Nature Trail is one of Pensacola's most thoughtfully developed gated communities, with roughly 600 homes built around an exceptional clubhouse and a community amenity offering that genuinely sets it apart. The neighborhood draws families, young professionals, and luxury buyers who want modern comfort within a gated rhythm.",
    lifestyle:
      "Life in Nature Trail centers on the clubhouse, the pools, the trails, and the kind of family weekends that define the community's identity. The pace is active without being hurried — children on bikes, neighbors on patios, weekend events at the clubhouse.",
    realEstateStyle:
      "Architecture leans contemporary and contemporary-traditional, with thoughtful modern floor plans and indoor-outdoor living. Lot positioning relative to amenities, mature trees, and trail access drives meaningful variation in value.",
    attractions: [
      "Resort-style clubhouse and pools",
      "Walking trails throughout the community",
      "Strong family programming and events",
      "Gated entry and 24-hour quiet",
      "Quick access to north-side schools and shopping",
    ],
    whyPeopleMove:
      "Nature Trail attracts buyers prioritizing amenities, modern construction, family-friendly community feel, and strong long-term value. The combination is rare in our market and continues to drive consistent demand.",
    architecture:
      "Contemporary and contemporary-traditional, with strong indoor-outdoor flow, larger windows, and modern lot planning. The newest sections continue to push the design language forward.",
    walkability:
      "Internal walkability is strong — residents use the trail system as part of their daily rhythm. Surrounding shopping and schools are a short drive.",
    schools:
      "Anchored by strong north-side public schools with multiple private and faith-based options nearby. Many families select Nature Trail specifically for the school path it sits in.",
    communityVibe:
      "Active, family-oriented, and engaged. The community calendar is real, the amenities are well-used, and the social rhythm of the neighborhood is one of the reasons people stay.",
  },
  {
    slug: "east-hill",
    name: "East Hill",
    tagline: "Historic charm, oak canopy, walkable culture.",
    shortDescription:
      "Pensacola's most beloved historic neighborhood — mature trees, classic Florida architecture, and the kind of porch culture that defines old Pensacola at its best.",
    lifestyleAngle: "Historic, walkable, character-driven.",
    image: "/images/neighborhood-east-hill.jpg",
    imageAlt:
      "East Hill Pensacola historic home with deep porch and mature oak trees",
    overview:
      "East Hill is the heart of historic residential Pensacola — a layered, walkable neighborhood of restored Craftsman bungalows, classic Florida revival homes, and beautifully preserved character architecture. Few neighborhoods in the Gulf Coast wear their history this gracefully.",
    lifestyle:
      "Daily life in East Hill is shaped by the trees, the porches, and the neighbors. Morning walks turn into conversations. Evenings stretch a little longer when the breeze comes in off the bay. Independent restaurants, shops, and cafes are a short walk from most of the neighborhood.",
    realEstateStyle:
      "Restored historic homes alongside thoughtful renovations and a smaller number of new builds that respect the streetscape. Lot size, architectural integrity, and tree canopy all drive long-term value here.",
    attractions: [
      "Bayview Park and the bay-front community",
      "Independent East Hill restaurants and cafes",
      "Walkable to downtown Pensacola via 12th Avenue",
      "Established community calendar and identity",
      "Some of the prettiest streetscapes in the city",
    ],
    whyPeopleMove:
      "East Hill attracts buyers who care about character, walkability, and the lived-in feel of a neighborhood that has been loved for generations. It is one of the few Pensacola neighborhoods where the daily experience itself is the value driver.",
    architecture:
      "Restored Craftsman bungalows, Florida revival cottages, classic two-story porch homes, and the occasional carefully done modern infill. Preservation matters here, and the strongest projects honor the surrounding character.",
    walkability:
      "Among the most walkable neighborhoods in Pensacola. Residents walk to coffee, dinner, the park, and the bay as part of their daily rhythm.",
    schools:
      "Served by AISD with strong neighborhood school identity, plus several private and faith-based options across central Pensacola.",
    communityVibe:
      "Established, character-driven, and warm. People know their neighbors here, and the neighborhood culture is one of the main reasons buyers fall in love with it.",
  },
  {
    slug: "downtown-pensacola",
    name: "Downtown Pensacola",
    tagline: "Walkable culture, bay views, porch life.",
    shortDescription:
      "Restored historic homes, modern townhomes, and condos within walking distance of Palafox, the bay, and a growing list of independent restaurants and shops.",
    lifestyleAngle: "Walkable, urban-cozy, lifestyle-driven.",
    image: "/images/neighborhood-downtown-pensacola.jpg",
    imageAlt:
      "Historic downtown Pensacola street with restored architecture and palms",
    overview:
      "Downtown Pensacola has reinvented itself thoughtfully over the past two decades. The historic core has been restored, modern infill has been added with care, and the result is a walkable urban neighborhood with a distinctly Pensacola identity.",
    lifestyle:
      "Downtown life is walkable and engaged. Coffee on Palafox in the morning, lunch in a courtyard, evening dinners at a growing list of independent restaurants, weekends at the bay or a community festival. The pace is urban without being rushed.",
    realEstateStyle:
      "A thoughtful mix of restored historic single-family homes, modern townhomes, and high-end condos. Walkability and proximity to Palafox and the bay are major value drivers.",
    attractions: [
      "Palafox Place restaurants, shops, and culture",
      "Pensacola Bay and waterfront walks",
      "Plaza Ferdinand and historic district",
      "Saenger Theatre and Pensacola Museum of Art",
      "Walkable to weekend farmers markets and festivals",
    ],
    whyPeopleMove:
      "Downtown attracts buyers who want lifestyle and walkability without trading away identity. It works for empty-nesters who want to simplify, professionals who want to live where they work, and second-home owners who want a real Pensacola base.",
    architecture:
      "Restored historic homes, beautifully designed modern townhomes, and a growing collection of well-executed condos. The strongest projects engage thoughtfully with the surrounding fabric.",
    walkability:
      "The most walkable neighborhood in Pensacola. Most daily needs — coffee, restaurants, the waterfront — are within an easy walk.",
    schools:
      "Served by AISD with several private and faith-based options nearby. Many downtown households are pre-family or post-family residents drawn primarily by lifestyle.",
    communityVibe:
      "Lifestyle-driven, engaged, and refreshingly walkable. The neighborhood attracts people who care about local independent businesses and the identity of the city.",
  },
  {
    slug: "pensacola-beach",
    name: "Pensacola Beach",
    tagline: "Gulf-front living, year-round community.",
    shortDescription:
      "True Gulf-front living with a social, central rhythm — single-family beach homes, beachfront condos, and a community that genuinely lives there year-round.",
    lifestyleAngle: "Waterfront, social, community-anchored.",
    image: "/images/neighborhood-pensacola-beach.jpg",
    imageAlt:
      "Pensacola Beach Gulf-front home with white sand and turquoise water",
    overview:
      "Pensacola Beach is where the Gulf becomes part of daily life. White sand, turquoise water, and a community that has retained its identity even as the market has matured. Single-family beach homes, beachfront condos, and bayside properties all live here.",
    lifestyle:
      "Beach life here is genuine. Mornings on the sand, afternoons on the water, evenings on the porch. The community calendar is real — this is not a seasonal neighborhood with empty houses in winter. People genuinely live here.",
    realEstateStyle:
      "Single-family beach homes, luxury beachfront condos, and bayside properties. Insurance, elevation, and water frontage are all part of the conversation. The strongest properties combine architectural quality with thoughtful lot positioning.",
    attractions: [
      "Pensacola Beach white sand and Gulf-front living",
      "The Boardwalk and community gathering spaces",
      "Year-round community events and culture",
      "Quick access to the Gulf and Santa Rosa Sound",
      "Strong rental potential for buyers who want it",
    ],
    whyPeopleMove:
      "Buyers come to Pensacola Beach for the Gulf, the community, and the way the daily rhythm here changes everything else. It works for primary-home buyers, second-home buyers, and families building a long-term coastal base.",
    architecture:
      "Coastal contemporary single-family homes, well-built beachfront condos, and beautifully maintained traditional beach houses. Newer construction has continued to elevate the market.",
    walkability:
      "Internally walkable around the core community areas. Residents use bikes and golf carts as much as cars.",
    schools:
      "Pensacola Beach families typically attend strong nearby Santa Rosa County and Escambia schools, with private and faith-based options accessible across the bridge.",
    communityVibe:
      "Genuinely year-round, social, and warm. The community is engaged and the neighbors are real neighbors — not just summer renters.",
  },
  {
    slug: "perdido-key",
    name: "Perdido Key",
    tagline: "Quiet Gulf beauty, secluded by design.",
    shortDescription:
      "A quieter, more secluded waterfront market — some of the most beautiful Gulf beaches in the country, paired with thoughtful single-family beach homes and luxury condos.",
    lifestyleAngle: "Secluded, waterfront, calm and refined.",
    image: "/images/neighborhood-perdido-key.jpg",
    imageAlt:
      "Perdido Key beach home overlooking white sand and calm Gulf water",
    overview:
      "Perdido Key is the quieter, more private sister to Pensacola Beach. The beaches are some of the most beautiful in the country, the pace is calmer, and the architecture leans toward beautiful single-family beach homes and a thoughtful selection of luxury condos.",
    lifestyle:
      "Daily life here is shaped by the water and the quiet. Mornings on the sand. Afternoons on the boat. Evenings on a porch, in a hammock, or at a long, slow dinner. Perdido Key is what people picture when they imagine the Gulf at its most peaceful.",
    realEstateStyle:
      "Beachfront and beach-access single-family homes, plus a curated mix of luxury condominiums. The most exclusive properties tend to come up quietly. Beachfront frontage and elevation drive long-term value.",
    attractions: [
      "Some of the most beautiful Gulf beaches in the country",
      "Gulf Islands National Seashore proximity",
      "Quieter, more secluded community feel",
      "Waterfront dining and boating",
      "Strong long-term value driven by scarcity",
    ],
    whyPeopleMove:
      "Perdido Key attracts buyers who want the Gulf without the crowds. It works for primary residents, second-home buyers, and luxury investors who want a coastal base in one of the Gulf Coast's most beautiful settings.",
    architecture:
      "Coastal contemporary and traditional beach architecture, plus beautifully designed luxury condos. The strongest properties combine thoughtful design with respectful site planning.",
    walkability:
      "More driving-oriented than Pensacola Beach — people come to Perdido Key for the seclusion. The trade-off is the privacy and the calm.",
    schools:
      "Served by Escambia County schools with several private and faith-based options accessible nearby.",
    communityVibe:
      "Quiet, refined, and warm in its own way. The community is real but private — neighbors know each other without anyone needing to make it loud.",
  },
];

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}
