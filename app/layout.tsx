import type { Metadata } from "next";
import { Vidaloka, Parisienne, Montserrat } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { realEstateAgentSchema, webSiteSchema, personSchema } from "@/lib/seo/schema";
import "./globals.css";

const display = Vidaloka({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const script = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pamheinold.com"),
  title: {
    default: "Pam Heinold | Pensacola Real Estate Authority",
    template: "%s | Pam Heinold",
  },
  description:
    "Pam Heinold is a 22-year Pensacola real estate expert with LPT Realty. Hyperlocal expertise in Marcus Pointe, Nature Trail, East Hill, downtown, and the Gulf Coast waterfront market.",
  keywords: [
    "Pam Heinold",
    "LPT Realty",
    "Pensacola real estate",
    "Pensacola luxury homes",
    "Marcus Pointe",
    "Nature Trail Pensacola",
    "East Hill Pensacola",
    "Pensacola Beach real estate",
    "Perdido Key",
    "Gulf Coast waterfront",
    "Pensacola realtor",
  ],
  authors: [{ name: "Pam Heinold" }],
  creator: "Pam Heinold",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pamheinold.com",
    siteName: "Pam Heinold | LPT Realty",
    title: "Let's find the place that feels like home.",
    description:
      "A warm, refined approach to Pensacola luxury real estate. 22 years of hyperlocal expertise from Marcus Pointe to the Gulf.",
    images: [
      {
        url: "/hero-pensacola.jpg",
        width: 1200,
        height: 630,
        alt: "Pensacola Gulf Coast waterfront — Pam Heinold Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pam Heinold | Pensacola Real Estate",
    description:
      "Cozy. Elegant. Relatable. 22 years of Pensacola real estate experience.",
    images: ["/hero-pensacola.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${script.variable} ${sans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              realEstateAgentSchema(),
              webSiteSchema(),
              personSchema(),
            ]),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `var script=document.createElement("script");script.setAttribute("nowprocket","");script.setAttribute("nitro-exclude","");script.src="https://reports.heypearl.io/scripts/dynamic_optimization.js";script.dataset.uuid="3a6c47ab-8dfa-486c-978e-b662c4c6372e";script.id="sa-dynamic-optimization";document.head.appendChild(script);`,
          }}
        />
      </head>
      <body className="font-sans bg-paper text-charcoal antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1302349058512871');fbq('track','PageView');`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TH4CHQ1J8L"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-TH4CHQ1J8L');`,
          }}
        />
      </body>
    </html>
  );
}
