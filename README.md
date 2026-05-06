# Pam Heinold — ERA American Real Estate

A premium, editorial authority website for Pamela Heinold and ERA American Real Estate. Built as a Pensacola real-estate authority platform — not an IDX site — focused on hyperlocal SEO, luxury positioning, and warm personal-brand presence.

> "Let's find the place that feels like home."

## Stack

- **Next.js 15.1** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** (Pam's cozy/elegant cream + warm-brown palette)
- **next/font** for Vidaloka + Parisienne + Montserrat
- **next/image** for optimized photography

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Brand system

### Palette (per brand kit)

| Token | Value | Usage |
|---|---|---|
| `cream` | `#F5F1EC` | Base / negative space |
| `lighttan` | `#DBCFC4` | Soft accents |
| `tan` | `#C4B5A4` | Callouts, dividers |
| `warmbrown` | `#A1866F` | Headlines, CTA |
| `charcoal` | `#3D3A34` | Body text |
| `nearblack` | `#272321` | Footer / anchor |
| `eranavy` | `#1A3A7E` | ERA identity moments only |
| `erared` | `#C8102E` | ERA accent stripe (used sparingly in footer) |
| `paper` | `#FBF8F3` | Page background |

### Typography

- **Display:** Vidaloka (modern serif, lifestyle-forward)
- **Script:** Parisienne (warm moments — used as accent throughout)
- **Body:** Montserrat (clean sans)
- All loaded via `next/font` for performance

### Voice

Cozy. Elegant. Relatable. Warm. Approachable. Refined. Lifestyle-focused. **Not** flashy, salesy, pushy, corporate, or cold.

## Brand assets

Drop the following into `public/images/` using these exact filenames:

- `era-american-logo.png` — primary ERA logo
- `era-american-logo-light.png` — light variant for the dark footer
- `pam-heinold-headshot.jpg` — Pam's editorial portrait (4:5 best)

See `IMAGE_BRIEFS.md` in this folder for the full list of all photographic assets, with stock-search keywords and briefs.

## Project structure

```
app/
  layout.tsx                     # Root layout, fonts, navbar/footer
  globals.css                    # Editorial typography, prose styles
  page.tsx                       # Homepage
  about/page.tsx                 # Editorial bio + philosophy
  blog/
    page.tsx                     # Notes index
    [slug]/page.tsx              # Long-form note
  neighborhoods/
    page.tsx                     # Neighborhood directory
    [slug]/page.tsx              # Neighborhood detail
  relocation/page.tsx            # Relocation guidance
  contact/page.tsx               # Contact + form
components/
  Navbar.tsx
  Footer.tsx
  Hero.tsx                       # supports script accent
  Section.tsx                    # supports script accent
  BlogCard.tsx
  NeighborhoodCard.tsx
  TestimonialCard.tsx            # for future real testimonials
  CTASection.tsx
lib/
  blog-data.ts                   # 6 long-form Pensacola posts
  neighborhood-data.ts           # 6 neighborhoods (Marcus Pointe, Nature Trail, East Hill, Downtown, Pensacola Beach, Perdido Key)
  site.ts                        # Pam, ERA, social, navigation config
public/
  images/
    README.md
    *.png / *.jpg                # photography
  IMAGE_BRIEFS.md                # full image brief sheet
```

## Content

All six blog posts and all six neighborhoods are written long-form. No lorem ipsum.

Per brand direction:
- No first-time-buyer language — positioning emphasizes luxury buyers and sellers
- No fake testimonials
- Christian/conservative-friendly tone — family-anchored, faith-respecting, never edgy
- Conversational, friendly voice throughout

## SEO + AI discoverability

- Per-page metadata, OpenGraph, Twitter cards, canonical URLs
- Article + Place + RealEstateAgent JSON-LD schema
- Semantic HTML throughout
- Descriptive `alt` text on every image
- `generateStaticParams` for static generation of all blog and neighborhood routes
- Pensacola hyperlocal keyword targeting (Marcus Pointe, Nature Trail, East Hill, downtown Pensacola, Pensacola Beach, Perdido Key)

## Deployment

Designed for Vercel. Push to GitHub, connect the repo to Vercel, and ship.

```bash
npm run build
npm run start
```
