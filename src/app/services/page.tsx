import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Electrical Services | Fakom International Services Ltd",
  description: "Explore Fakom electrical installation, infrastructure, power distribution, solar, high tension and transformer services.",
};

const iconSymbols: Record<string, string> = {
  city: "⌂", home: "⌂", network: "⌘", grid: "▦", light: "✳", sun: "☼", tower: "⌁", backup: "↯", transformer: "ϟ",
};

export default function ServicesPage() {
  return <main id="main">
    <section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line" /> Our services</p><h1>Electrical work,<br/><em>done with purpose.</em></h1><p className="inner-hero-lede">From homes and estates to distribution networks, Fakom provides electrical design, erection, installation and maintenance across southern Nigeria.</p></div></section>
    <section className="section service-catalog"><div className="container"><div className="catalog-intro"><p className="eyebrow">How we can help</p><h2>Our electrical<br/><em>capabilities.</em></h2><p>Choose a service to see its scope. Project requirements are confirmed following a site and work brief.</p></div>
      <div className="catalog-grid">{services.map((service, index) => <a className="catalog-card" href={`#${service.slug}`} key={service.slug}><span className="catalog-icon" aria-hidden="true">{iconSymbols[service.icon]}</span><span className="catalog-count">0{index + 1}</span><h3>{service.title}</h3><p>{service.shortDescription}</p><span className="catalog-link">View details <span aria-hidden="true">→</span></span></a>)}</div>
    </div></section>
    <section className="service-details"><div className="container"><p className="eyebrow">Service details</p>{services.map((service, index) => <article className="service-detail" id={service.slug} key={service.slug}><div className="detail-number">0{index + 1}</div><div className="detail-copy"><h2>{service.title}</h2><p>{service.description}</p><ul>{service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div><a className="detail-top" href="#main" aria-label={`Back to top, ${service.title}`}>↑</a></article>)}</div></section>
    <section className="cta-band"><div className="container cta-inner"><div><p className="eyebrow eyebrow-light">Plan your project</p><h2>Let’s discuss<br/>what you need.</h2></div><Link className="button button-amber" href="/contact#quote">Request a Quote <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
