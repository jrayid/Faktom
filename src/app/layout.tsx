import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fakom International Services Ltd | Electrical Engineering",
  description: "Electrical design, installation and power infrastructure services across southern Nigeria. Operating since 2005.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<div className="mobile-contact-actions" aria-label="Quick contact"><a href="tel:+2347084207100">Call</a><a href="https://wa.me/2347084207100" target="_blank" rel="noreferrer">WhatsApp</a></div><Footer /></body></html>;
}
