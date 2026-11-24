import type { Metadata } from "next";
import { company } from "@/data/company";
import QuoteForm from "@/components/QuoteForm";
import VendorForm from "@/components/VendorForm";

export const metadata: Metadata = {
  title: "Contact Fakom | Request a Quote or Vendor Enquiry",
  description: "Contact Fakom International Services Ltd for an electrical work quote or vendor enquiry.",
};

export default function ContactPage() {
  return <main id="main" tabIndex={-1}>
    <section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line"/> Contact Fakom</p><h1>Let’s talk about<br/><em>your requirements.</em></h1><p className="inner-hero-lede">Share your project details or vendor enquiry with our team. We’ll use the information to review and respond to your request.</p><div className="contact-jump-links"><a className="button button-amber" href="#quote">Request a Quote <span aria-hidden="true">↓</span></a><a className="button button-outline" href="#vendor">Vendor Enquiry <span aria-hidden="true">↓</span></a></div></div></section>

    <section className="contact-form-section" id="quote"><div className="container contact-layout"><div className="contact-form-intro"><p className="eyebrow">01 / Project enquiry</p><h2>Request a Quote</h2><p className="contact-form-description">Tell us what work you need, where the site is, and how we can reach you.</p></div><QuoteForm /></div></section>

    <section className="contact-form-section vendor-form-section" id="vendor"><div className="container contact-layout"><div className="contact-form-intro"><p className="eyebrow">02 / Work with Fakom</p><h2>Vendor Enquiry</h2><p className="contact-form-description">Share your organisation’s contact details, areas of interest and regions for consideration.</p></div><VendorForm /></div></section>

    <section className="contact-details-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Reach our team</p><h2>Our offices &<br/><em>contact details.</em></h2></div><p className="section-intro">Call or email us about a project, service or vendor enquiry.</p></div><div className="contact-office-grid">{company.offices.map((office) => <article className="contact-office-card" key={office.city}><p className="office-state">{office.state}</p><h3>{office.city}</h3>{office.addresses.map((address) => <p className="office-address" key={address}>{address}</p>)}<div className="office-links">{office.phones.map((phone) => <a href={`tel:+234${phone.slice(1)}`} key={phone}>{phone}</a>)}</div></article>)}<article className="contact-office-card contact-direct-card"><p className="office-state">Email & messaging</p><h3>Contact Fakom</h3><div className="office-links"><a href={`mailto:${company.email}`}>{company.email}</a><a href="https://wa.me/2347084207100" target="_blank" rel="noreferrer">WhatsApp <span className="confirm-whatsapp">[CONFIRM WHATSAPP NUMBER]</span></a></div></article></div></div></section>

    <section className="contact-map-section"><div className="container"><p className="eyebrow">Office locations</p><div className="map-placeholder" role="img" aria-label="Map placeholder"><span>[MAP]</span></div></div></section>
  </main>;
}
