import Link from "next/link";
import { BreadcrumbJsonLd, ServiceListJsonLd } from "@/components/StructuredData";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Electrical Services", "Explore Fakom electrical installation, infrastructure, power distribution, solar, high tension and transformer services.", "/services");

export default function ServicesPage() {
  return (
    <main id="main" tabIndex={-1}><BreadcrumbJsonLd items={[{ name: "Home", pathname: "/" }, { name: "Services", pathname: "/services" }]} /><ServiceListJsonLd services={services} />
      <section className="inner-hero">
        <div className="container inner-hero-content">
          <p className="eyebrow"><span className="eyebrow-line" /> Our services</p>
          <h1>Electrical work,<br /><em>done with purpose.</em></h1>
          <p className="inner-hero-lede">
            From homes and estates to distribution networks, Fakom provides electrical design, erection, installation and maintenance across southern Nigeria.
          </p>
        </div>
      </section>

      <section className="section service-catalog" aria-labelledby="catalog-heading">
        <div className="container">
          <div className="catalog-intro">
            <p className="eyebrow">How we can help</p>
            <h2 id="catalog-heading">Our electrical<br /><em>capabilities.</em></h2>
            <p className="catalog-intro-copy">Choose a service to see its scope. Project requirements are confirmed following a site and work brief.</p>
          </div>
          <div className="catalog-grid">
            {services.map((service, index) => (
              <a className="catalog-card" href={`#${service.slug}`} key={service.slug}>
                <span className="catalog-icon"><ServiceIcon name={service.icon} /></span>
                <span className="catalog-count">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <span className="catalog-link">View details <span aria-hidden="true">&#8594;</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="service-details" aria-labelledby="service-details-heading">
        <div className="container">
          <p className="eyebrow" id="service-details-heading">Service details</p>
          {services.map((service, index) => (
            <article className="service-detail" id={service.slug} key={service.slug}>
              <div className="detail-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="detail-copy">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul>{service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </div>
              <a className="detail-top" href="#main" aria-label={`Back to top, ${service.title}`}>&#8593;</a>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div><p className="eyebrow eyebrow-light">Plan your project</p><h2>Let’s discuss<br />what you need.</h2></div>
          <Link className="button button-amber" href="/contact#quote">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
        </div>
      </section>
    </main>
  );
}
