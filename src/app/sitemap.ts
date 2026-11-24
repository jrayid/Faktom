import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

const staticPaths = [
  "/",
  "/about",
  "/contact",
  "/coverage",
  "/grid-maintenance",
  "/privacy",
  "/projects",
  "/services",
  "/team",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
