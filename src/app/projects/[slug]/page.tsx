import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} | Fakom Projects`, description: project.summary } : { title: "Project not found | Fakom" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const projectServices = services.filter((service) => project.services.includes(service.slug));

  return <main id="main"><section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line"/> Project · {project.client}</p><h1>{project.title}</h1><p className="inner-hero-lede">{project.location} <span>·</span> {project.year}</p></div></section>
    <section className="section project-detail-section"><div className="container project-detail-layout"><div><p className="eyebrow">Project overview</p><h2>{project.client}</h2><p className="project-summary">{project.summary}</p><dl className="project-facts"><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Client</dt><dd>{project.client}</dd></div></dl><h3>Services involved</h3><ul className="project-service-list">{projectServices.map((service) => <li key={service.slug}><Link href={`/services#${service.slug}`}>{service.title}</Link></li>)}</ul></div><div className="project-detail-photos">{project.photos.length ? project.photos.map((photo) => <div className="project-photo" key={photo}><span>{photo}</span></div>) : <div className="project-photo project-photo-large"><span>[PHOTO]</span></div>}</div></div></section>
    <section className="cta-band"><div className="container cta-inner"><div><p className="eyebrow eyebrow-light">Have a similar requirement?</p><h2>Let’s plan your<br/>next project.</h2></div><Link className="button button-amber" href="/contact#quote">Request a Quote <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
