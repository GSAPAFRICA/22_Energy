import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";

const siteUrl = "https://22energy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "22 Energy | Reliable Solar Energy for Homes & Businesses",
  description:
    "22 Energy provides reliable solar panels, battery storage and complete solar power systems for homes, businesses and communities.",
  keywords: [
    "solar energy",
    "solar panels",
    "battery storage",
    "solar power systems",
    "22 Energy",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
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
    title: "22 Energy | Reliable Solar Energy for Homes & Businesses",
    description:
      "22 Energy provides reliable solar panels, battery storage and complete solar power systems for homes, businesses and communities.",
    images: [{ url: "/images/logo.png", width: 1200, height: 1200, alt: "22 Energy logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "22 Energy | Reliable Solar Energy for Homes & Businesses",
    description:
      "22 Energy provides reliable solar panels, battery storage and complete solar power systems for homes, businesses and communities.",
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
