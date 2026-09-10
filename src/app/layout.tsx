import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://22energy.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "22 Energy | Solar Company & Solar Installers in Lagos, Nigeria",
  description:
    "22 Energy provides reliable solar panels, inverters, batteries and complete solar power solutions for homes and businesses in Lagos, Nigeria.",
  keywords: [
    // Primary SEO Keywords
    "Solar company in Lagos",
    "Solar energy company in Lagos",
    "Solar installation company in Lagos",
    "Solar installers in Lagos",
    "Solar power solutions Lagos",
    "Solar panel installation Lagos",
    "Solar inverter installation Lagos",
    "Solar battery installation Lagos",
    "Best solar company in Lagos",
    "Affordable solar systems in Lagos",

    // Commercial / High-Intent Keywords
    "Buy solar panels in Lagos",
    "Buy solar inverter in Lagos",
    "Buy solar batteries in Lagos",
    "Solar system prices in Lagos",
    "Solar panel prices in Nigeria",
    "Solar inverter prices in Nigeria",
    "Solar installation cost in Lagos",
    "Home solar system Lagos",
    "Commercial solar solutions Lagos",
    "Industrial solar solutions Nigeria",

    // Long-Tail Keywords
    "Best solar inverter company in Lagos",
    "Reliable solar power solutions in Lagos",
    "Affordable solar installation in Lagos",
    "Solar system for homes in Lagos",
    "Solar system for businesses in Lagos",
    "Solar panels for homes in Nigeria",
    "Solar battery backup system Lagos",
    "Complete solar power system in Lagos",
    "Solar energy solutions for businesses",
    "Solar maintenance services in Lagos",

    // Location Keywords
    "Solar company in Lekki",
    "Solar company in Ikeja",
    "Solar company in Victoria Island",
    "Solar company in Ikoyi",
    "Solar company in Ajah",
    "Solar company in Yaba",
    "Solar company in Surulere",
    "Solar company in Lagos Island",
    "Solar installers in Lekki",
    "Solar installers in Ikeja",

    // Brand Keywords
    "22 Energy",
    "22 Energy Lagos",
    "22 Energy Nigeria",
    "22 Energy solar",
    "22 Energy solar company",
    "22 Energy solar installation",
    "22 Energy solar panels",
    "22 Energy inverter",
    "22 Energy renewable energy",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "22 Energy",
    title: "22 Energy | Solar Company & Solar Installers in Lagos, Nigeria",
    description:
      "22 Energy provides reliable solar panels, inverters, batteries and complete solar power solutions for homes and businesses in Lagos, Nigeria.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 1200,
        alt: "22 Energy solar energy solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "22 Energy | Solar Company & Solar Installers in Lagos, Nigeria",
    description:
      "22 Energy provides reliable solar panels, inverters, batteries and complete solar power solutions for homes and businesses in Lagos, Nigeria.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
