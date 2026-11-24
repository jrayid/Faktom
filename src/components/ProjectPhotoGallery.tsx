import type { Project } from "@/data/projects";
import ProjectPhotoImage from "@/components/ProjectPhotoImage";

export default function ProjectPhotoGallery({
  photos,
  projectTitle,
}: {
  photos: Project["photos"];
  projectTitle: string;
}) {
  return (
    <div className="project-detail-photos">
      {photos.length ? photos.map((photo) => (
        <div className="project-photo" key={photo.src}>
          <ProjectPhotoImage photo={photo} fallbackAlt={`${projectTitle} project photograph`} sizes="(max-width: 760px) 100vw, 45vw" />
        </div>
      )) : (
        <div className="project-photo project-photo-large"><span>[PHOTO]</span></div>
      )}
    </div>
  );
}
