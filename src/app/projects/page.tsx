import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects | Fakom International Services Ltd",
  description: "Selected electrical infrastructure, line relocation, telecom site reactivation and transformer projects by Fakom International Services Ltd.",
};

export default function ProjectsPage() {
  return <main id="main" tabIndex={-1}>
    <section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line"/> Selected work</p><h1>Field work with<br/><em>real purpose.</em></h1><p className="inner-hero-lede">A selection of electrical infrastructure and telecom network work completed by Fakom. Project details not available in the records are marked for confirmation.</p></div></section>
    <section className="section projects-directory"><div className="container"><p className="eyebrow">Project record</p><h2 className="directory-heading">Explore our projects</h2><ProjectGrid projects={projects}/></div></section>
  </main>;
}
