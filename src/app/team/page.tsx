import LeaderPhoto from "@/components/LeaderPhoto";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/site";
import { leadership, technicians } from "@/data/team";
import { company } from "@/data/company";

export const metadata = pageMetadata("Team & Capacity", "Meet Fakom leadership, technicians, and the equipment available for field work.", "/team");

export default function TeamPage() {
  return <main id="main" tabIndex={-1}><BreadcrumbJsonLd items={[{ name: "Home", pathname: "/" }, { name: "Team & Capacity", pathname: "/team" }]} /><section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line"/> Team & capacity</p><h1>Experienced people.<br/><em>Ready for the field.</em></h1><p className="inner-hero-lede">Our leadership and technical teams support electrical infrastructure, installation and maintenance work.</p></div></section>
    <section className="section team-section"><div className="container"><p className="eyebrow">Leadership</p><h2 className="directory-heading">People behind the work</h2><div className="leader-grid">{leadership.map((person) => <article className="leader-card" key={person.name}><LeaderPhoto person={person} /><h3>{person.name}</h3><p>{person.role}</p></article>)}</div></div></section>
    <section className="technicians-section"><div className="container technicians-layout"><div><p className="eyebrow">Field team</p><h2>Our technicians</h2></div><ul className="technician-list">{technicians.map((person, index) => <li key={person}><span>0{index + 1}</span>{person}</li>)}</ul></div></section>
    <section className="section equipment-section"><div className="container"><p className="eyebrow">Field capacity</p><h2 className="directory-heading">Equipment</h2><div className="equipment-grid">{company.equipment.map((item, index) => <article className="equipment-card" key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div></div></section>
    <section className="hse-section"><div className="container hse-inner"><p className="eyebrow eyebrow-light">Health, safety & environment</p><h2>Safety is part of<br/><em>the work plan.</em></h2><p className="hse-description">We plan electrical work with attention to site conditions, safe work practices and relevant health, safety and environmental requirements.</p></div></section>
  </main>;
}
