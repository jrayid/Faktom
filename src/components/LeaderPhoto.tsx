import Image from "next/image";
import type { Leader } from "@/data/team";

export default function LeaderPhoto({ person }: { person: Leader }) {
  return (
    <div className="leader-photo">
      {person.photo ? (
        <Image
          className="leader-photo-image"
          src={person.photo.src}
          alt={person.photo.alt.trim() || `${person.name}, ${person.role}`}
          fill
          sizes="(max-width: 760px) 50vw, 33vw"
        />
      ) : (
        <span role="img" aria-label={`Photo placeholder for ${person.name}`}>[PHOTO]</span>
      )}
    </div>
  );
}
