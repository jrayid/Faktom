import { company } from "@/data/company";

export default function OfficeMapLinks() {
  return (
    <div className="office-links">
      {company.offices.map((office) => {
        const query = encodeURIComponent(
          `${office.addresses.join(", ")}, ${office.city}, ${office.state}, ${company.country}`,
        );

        return (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            key={office.city}
            target="_blank"
            rel="noreferrer"
          >
            Open {office.city} office in Google Maps
          </a>
        );
      })}
    </div>
  );
}
