import Link from "next/link";
import { services } from "@/data/home";
import { projects } from "@/data/projects";

export default function Home() {
  return <main id="main" tabIndex={-1}>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Electrical engineering · Since 2005</p>
          <h1>Powering the places <em>we call home.</em></h1>
          <p className="hero-lede">Electrical infrastructure built with care, from high-tension networks to the lights in your home.</p>
          <div className="hero-actions"><Link className="button button-amber" href="/contact#quote">Request a Quote <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/contact#vendor">Vendor Enquiry <span aria-hidden="true">→</span></Link></div>
          <div className="hero-note"><span className="status-dot" /> Serving Rivers, Bayelsa & Cross River</div>
        </div>
        <div className="hero-visual" role="img" aria-label="Placeholder for Fakom field team or electrical infrastructure photo">
          <div className="photo-placeholder"><span className="photo-mark">F.</span><span>[ PHOTO ]</span><small>Fakom field work</small></div>
          <div className="visual-caption"><span>Built for the grid.</span><span>Ready for the field.</span></div>
          <div className="visual-index">01 <span>/</span> 03</div>
        </div>
      </div>
      <div className="container hero-bottom"><span>DESIGN</span><i /><span>ERECTION</span><i /><span>INSTALLATION</span><i /><span>MAINTENANCE</span><span className="hero-bottom-right">PORT HARCOURT · OWERRI</span></div>
    </section>

    <section className="section services-section"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">What we do</p><h2>Power solutions,<br /><em>from start to service.</em></h2></div><p className="section-intro">From planned infrastructure to urgent fault response, our teams help keep communities and businesses connected.</p></div>
      <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.title}><div className="service-top"><span>0{index + 1}</span><span className="service-arrow" aria-hidden="true">↗</span></div><h3>{service.title}</h3><p>{service.description}</p><Link href="/contact#quote" aria-label={`Enquire about ${service.title}`}>Enquire <span aria-hidden="true">→</span></Link></article>)}</div>
    </div></section>

    <section className="footprint"><div className="container footprint-grid"><div className="footprint-heading"><p className="eyebrow eyebrow-light">Our footprint</p><h2>Rooted in the<br /><em>South-South.</em></h2></div><div className="footprint-copy"><p>Based in Port Harcourt and Owerri, we work across Rivers, Bayelsa and Cross River, with a history of projects across the South-East and Akwa Ibom.</p><div className="office-list"><div><span className="office-dot" />Port Harcourt, Rivers</div><div><span className="office-dot" />Owerri, Imo</div></div><Link className="light-link" href="/contact#quote">Talk to our team <span aria-hidden="true">→</span></Link></div><div className="map-mark" aria-hidden="true"><span>NG</span><div className="map-ring ring-one"/><div className="map-ring ring-two"/><div className="map-ring ring-three"/><div className="map-center"/></div></div></section>

    <section className="section projects-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Selected experience</p><h2>Work that keeps<br /><em>things moving.</em></h2></div><p className="section-intro">A track record in high-tension relocation, telecom infrastructure and transformer work.</p></div><div className="project-list">{projects.map((project, index) => <article className="project-row" key={project.title}><span className="project-number">0{index + 1}</span><div><h3>{project.title}</h3><p>{project.client} <span>·</span> {project.location}</p></div><span className="project-year">{project.year}</span></article>)}</div></div></section>

    <section className="cta-band"><div className="container cta-inner"><div><p className="eyebrow eyebrow-light">Let’s get to work</p><h2>Have a project<br />to power?</h2></div><div className="cta-buttons"><Link className="button button-amber" href="/contact#quote">Request a Quote <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/contact#vendor">Vendor Enquiry <span aria-hidden="true">↗</span></Link></div></div></section>
  </main>;
}
