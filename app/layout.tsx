import type { Metadata } from "next";
import { Vidaloka, Parisienne, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    "Pam Heinold is a 22-year Pensacola real estate expert with ERA American Real Estate. Hyperlocal expertise in Marcus Pointe, Nature Trail, East Hill, downtown, and the Gulf Coast waterfront market.",
  keywords: [
    "Pam Heinold",
    "ERA American Real Estate",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pamheinold.com",
    siteName: "Pam Heinold | ERA American Real Estate",
    title: "Let's find the place that feels like home.",
    description:
      "A warm, refined approach to Pensacola luxury real estate. 22 years of hyperlocal expertise from Marcus Pointe to the Gulf.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pam Heinold | Pensacola Real Estate",
    description:
      "Cozy. Elegant. Relatable. 22 years of Pensacola real estate experience.",
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
      <body className="font-sans bg-paper text-charcoal antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
