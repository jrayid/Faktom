import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Fakom International Services Ltd",
  description: "The page you requested could not be found. Visit Fakom services, contact details or the home page.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="inner-hero">
        <div className="container inner-hero-content">
          <p className="eyebrow"><span className="eyebrow-line" /> Error 404</p>
          <h1>We can’t find<br /><em>that page.</em></h1>
          <p className="inner-hero-lede">The address may have changed or the page may no longer be available.</p>
          <div className="contact-jump-links">
            <Link className="button button-amber" href="/">Home</Link>
            <Link className="button button-outline" href="/services">Services</Link>
            <Link className="button button-outline" href="/contact">Contact</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
