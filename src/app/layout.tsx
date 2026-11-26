import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/StructuredData";
import { company } from "@/data/company";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Fakom International Services Ltd",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName,
    title: siteName,
    description: defaultDescription,
    url: siteUrl,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1a26",
  viewportFit: "cover",
};

const telephoneNumbers = company.phones.map((phone) => `+234${phone.slice(1)}`);
const officeAddresses = company.offices.flatMap((office) =>
  office.addresses.map((streetAddress) => ({
    "@type": "PostalAddress",
    streetAddress,
    addressLocality: office.city,
    addressRegion: office.state,
    addressCountry: company.country,
  })),
);

const companyStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      email: company.email,
      telephone: telephoneNumbers,
      foundingDate: company.foundingDate,
    },
    {
      "@type": ["LocalBusiness", "ElectricalContractor"],
      name: siteName,
      url: siteUrl,
      email: company.email,
      telephone: telephoneNumbers,
      address: officeAddresses,
      areaServed: company.primaryStates.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      foundingDate: company.foundingDate,
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <JsonLd data={companyStructuredData} />
        {children}
        <div className="mobile-contact-actions" role="group" aria-label="Quick contact">
          <a href={`tel:${telephoneNumbers[0]}`}>Call</a>
          <a href={`https://wa.me/${telephoneNumbers[0].replace("+", "")}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <Footer />
      </body>
    </html>
  );
}
