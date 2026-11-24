import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Coverage and Offices | Fakom International Services Ltd",
  description: "Fakom offices in Port Harcourt and Owerri, with project coverage across Rivers, Cross River, Bayelsa and other states in southern Nigeria.",
};

export default function CoveragePage() {
  return <main id="main" tabIndex={-1}><section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line"/> Coverage & offices</p><h1>Based in the South.<br/><em>Working across it.</em></h1><p className="inner-hero-lede">Our offices in Port Harcourt and Owerri support field work across our primary footprint and states where we have completed past projects.</p></div></section>
    <section className="section coverage-states"><div className="container"><div className="section-heading"><div><p className="eyebrow">Service footprint</p><h2>Where we<br/><em>work.</em></h2></div><p className="section-intro">Project availability and scope are confirmed for each enquiry.</p></div><div className="state-groups"><div className="state-group"><h3>Primary footprint</h3><ul>{company.primaryStates.map((state) => <li key={state}>{state}</li>)}</ul></div><div className="state-group"><h3>Past project locations</h3><ul>{company.pastWorkStates.map((state) => <li key={state}>{state}</li>)}</ul></div></div></div></section>
    <section className="offices-section"><div className="container"><p className="eyebrow">Our offices</p><h2 className="directory-heading">Find our teams</h2><div className="office-cards">{company.offices.map((office) => <article className="office-card" key={office.city}><p className="office-state">{office.state}</p><h3>{office.city}</h3>{office.addresses.map((address) => <p className="office-address" key={address}>{address}</p>)}<div className="office-links">{office.phones.map((phone) => <a href={`tel:+234${phone.slice(1)}`} key={phone}>{phone}</a>)}<a href={`mailto:${company.email}`}>{company.email}</a></div></article>)}</div></div></section>
    <section className="disco-section"><div className="container disco-inner"><div><p className="eyebrow eyebrow-light">Utility coordination</p><h2>Working relationships<br/><em>across the regions.</em></h2></div><p>{company.discoRelationship}</p></div></section>
    <section className="map-section"><div className="container"><p className="eyebrow">Find us</p><div className="map-placeholder" role="img" aria-label="Map placeholder"><span>[MAP]</span></div></div></section>
  </main>;
}
