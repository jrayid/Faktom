import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectPhotoImage({
  photo,
  fallbackAlt,
  sizes,
}: {
  photo: Project["photos"][number];
  fallbackAlt: string;
  sizes: string;
}) {
  return (
    <Image
      className="project-photo-image"
      src={photo.src}
      alt={photo.alt.trim() || fallbackAlt}
      fill
      sizes={sizes}
    />
  );
}
