import { site } from "@/lib/site";

type SchemaObject = Record<string, unknown>;

const base = site.company.website;

function withContext(schema: SchemaObject): SchemaObject {
  return { "@context": "https://schema.org", ...schema };
}

export function realEstateAgentSchema(): SchemaObject {
  return withContext({
    "@type": "RealEstateAgent",
    "@id": `${base}/#agent`,
    name: `${site.agent.fullName} — ${site.company.name}`,
    alternateName: site.agent.fullName,
    url: base,
    telephone: site.company.phone,
    email: site.company.email,
    description: `${site.agent.fullName} is a ${site.agent.yearsExperience}-year Pensacola real estate authority with ${site.company.name}. Hyperlocal expertise in Marcus Pointe, Nature Trail, East Hill, downtown, and the Gulf Coast waterfront market.`,
    image: `${base}${site.agent.headshot}`,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pensacola",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Pensacola", containedInPlace: "Florida" },
      { "@type": "City", name: "Pensacola Beach", containedInPlace: "Florida" },
      { "@type": "City", name: "Perdido Key", containedInPlace: "Florida" },
      { "@type": "AdministrativeArea", name: "Escambia County, Florida" },
      { "@type": "AdministrativeArea", name: "Santa Rosa County, Florida" },
    ],
    founder: {
      "@type": "Person",
      "@id": `${base}/#person`,
      name: site.agent.fullName,
    },
    parentOrganization: {
      "@type": "Organization",
      name: site.company.name,
    },
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.linkedin,
      site.social.youtube,
      site.social.gbp,
      site.social.zillow,
      site.social.realtor,
    ],
  });
}

export function webSiteSchema(): SchemaObject {
  return withContext({
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: `${site.agent.fullName} | Pensacola Real Estate`,
    description: `${site.agent.yearsExperience} years of warm, refined Pensacola real estate guidance. Marcus Pointe, Nature Trail, East Hill, downtown, and the Gulf Coast.`,
    inLanguage: "en-US",
    publisher: { "@id": `${base}/#agent` },
  });
}

export function personSchema(): SchemaObject {
  return withContext({
    "@type": "Person",
    "@id": `${base}/#person`,
    name: site.agent.fullName,
    url: base,
    jobTitle: site.agent.title,
    description: `${site.agent.fullName} is a ${site.agent.yearsExperience}-year Pensacola real estate authority with ${site.company.name}. Cozy, elegant, relatable guidance for luxury buyers and sellers across the Gulf Coast.`,
    worksFor: { "@id": `${base}/#agent` },
    image: {
      "@type": "ImageObject",
      url: `${base}${site.agent.headshot}`,
      caption: site.agent.headshotAlt,
    },
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.linkedin,
      site.social.youtube,
      site.social.gbp,
      site.social.zillow,
      site.social.realtor,
    ],
  });
}

export function localBusinessSchema(): SchemaObject {
  return withContext({
    "@type": ["LocalBusiness", "RealEstateAgent"],
    "@id": `${base}/#localbusiness`,
    name: `${site.agent.fullName} — ${site.company.name}`,
    url: base,
    telephone: site.company.phone,
    email: site.company.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pensacola",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Pensacola", containedInPlace: "Florida" },
      { "@type": "AdministrativeArea", name: "Escambia County, Florida" },
    ],
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.linkedin,
      site.social.youtube,
      site.social.gbp,
      site.social.zillow,
      site.social.realtor,
    ],
  });
}

export function serviceSchema(params: {
  name: string;
  url: string;
  description: string;
  category?: string;
}): SchemaObject {
  return withContext({
    "@type": "Service",
    "@id": `${params.url}#service`,
    name: params.name,
    url: params.url,
    description: params.description,
    serviceType: params.category ?? "Real Estate Services",
    areaServed: [
      { "@type": "City", name: "Pensacola", containedInPlace: "Florida" },
      { "@type": "AdministrativeArea", name: "Escambia County, Florida" },
    ],
    provider: { "@id": `${base}/#agent` },
  });
}

export function webPageSchema(params: {
  name: string;
  url: string;
  description: string;
}): SchemaObject {
  return withContext({
    "@type": "WebPage",
    "@id": `${params.url}#webpage`,
    name: params.name,
    url: params.url,
    description: params.description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${base}/#website` },
    publisher: { "@id": `${base}/#agent` },
  });
}

export function speakableSchema(cssSelectors: string[]): SchemaObject {
  return withContext({
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  });
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
): SchemaObject {
  return withContext({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function blogPostingSchema(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  keywords?: string[];
}): SchemaObject {
  return withContext({
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    url: params.url,
    ...(params.image
      ? {
          image: params.image.startsWith("http")
            ? params.image
            : `${base}${params.image}`,
        }
      : {}),
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    ...(params.keywords ? { keywords: params.keywords.join(", ") } : {}),
    author: { "@id": `${base}/#person` },
    publisher: { "@id": `${base}/#agent` },
    mainEntityOfPage: { "@type": "WebPage", "@id": params.url },
  });
}

export function neighborhoodPageSchema(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
}): SchemaObject {
  return withContext({
    "@type": "Article",
    "@id": `${params.url}#article`,
    headline: params.title,
    description: params.description,
    url: params.url,
    about: {
      "@type": "Place",
      name: params.title,
      description: params.description,
      containedInPlace: {
        "@type": "City",
        name: "Pensacola",
        containedInPlace: { "@type": "State", name: "Florida" },
      },
    },
    ...(params.image
      ? {
          image: params.image.startsWith("http")
            ? params.image
            : `${base}${params.image}`,
        }
      : {}),
    author: { "@id": `${base}/#person` },
    publisher: { "@id": `${base}/#agent` },
    mainEntityOfPage: { "@type": "WebPage", "@id": params.url },
  });
}
