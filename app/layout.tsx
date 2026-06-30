import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "GOLDEN CIRCLE Caraïbes",
  title: {
    default: "GOLDEN CIRCLE Caraïbes — L'Accès aux Privilèges",
    template: "%s | GOLDEN CIRCLE Caraïbes"
  },
  description:
    "Infrastructure privée d'accès aux privilèges, expériences, offres partenaires et opportunités lifestyle en Caraïbe.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/golden-circle-emblem.svg" }]
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/fr",
    siteName: "GOLDEN CIRCLE Caraïbes",
    title: "GOLDEN CIRCLE Caraïbes — L'Accès aux Privilèges",
    description:
      "Infrastructure privée d'accès aux privilèges, expériences, offres partenaires et opportunités lifestyle en Caraïbe.",
    images: [{ url: "/og-golden-circle.svg", width: 1200, height: 630, alt: "GOLDEN CIRCLE Caraïbes" }]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#4A192E" },
    { media: "(prefers-color-scheme: light)", color: "#4A192E" }
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
