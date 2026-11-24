"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProjectPhotoImage from "@/components/ProjectPhotoImage";
import type { Project } from "@/data/projects";
import { services } from "@/data/services";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [service, setService] = useState("all");
  const [state, setState] = useState("all");
  const states = useMemo(() => [...new Set(projects.flatMap((project) => project.states))].sort(), [projects]);
  const filtered = projects.filter((project) => (service === "all" || project.services.includes(service)) && (state === "all" || project.states.includes(state)));

  return <>
    <div className="project-filters" role="group" aria-label="Filter projects">
      <label>Service <select value={service} onChange={(event) => setService(event.target.value)}><option value="all">All services</option>{services.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select></label>
      <label>State <select value={state} onChange={(event) => setState(event.target.value)}><option value="all">All states</option>{states.map((item) => <option key={item}>{item}</option>)}</select></label>
      <p aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>
    </div>
    <div className="project-cards">{filtered.map((project) => <article className="project-card" key={project.slug}>
      <Link className="project-photo" href={`/projects/${project.slug}`} aria-label={`${project.title} project details`}>
        {project.photos[0] ? <ProjectPhotoImage photo={project.photos[0]} fallbackAlt={`${project.title} project photograph`} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" /> : <span>[PHOTO]</span>}
      </Link>
      <div className="project-card-copy"><p className="project-card-meta">{project.client} <span>·</span> {project.year}</p><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p className="project-card-location">{project.location}</p><p className="project-card-summary">{project.summary}</p><Link className="project-detail-link" href={`/projects/${project.slug}`}>View project <span aria-hidden="true">→</span></Link></div>
    </article>)}</div>
    {filtered.length === 0 && <p className="empty-projects">No projects match these filters.</p>}
  </>;
}
