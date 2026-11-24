import type { ReactNode } from "react";
import type { Service } from "@/data/services";

const iconArtwork: Record<Service["icon"], ReactNode> = {
  city: <><path d="M4 21V8l8-4 8 4v13M4 12h16"/><path d="M8 12v9m8-9v9M8 8h.01M12 8h.01M16 8h.01"/></>,
  home: <><path d="m3 11 9-7 9 7M5.5 10v10h13V10M9 20v-6h6v6"/></>,
  network: <><circle cx="6" cy="7" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="m8.2 8.5 2.6 7m5-7-2.6 7M8.5 7h7"/></>,
  grid: <><path d="M3 9h5l4-4v14l-4-4H3zM16 8a5.5 5.5 0 0 1 0 8m2.5-10.5a9 9 0 0 1 0 13"/></>,
  light: <><path d="M12 21V9m0 0H5l2-4h8l2 4h-5Zm-3 12h6M7 9l-2 3m12-3 2 3"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
  tower: <><path d="m12 3-7 18m7-18 7 18M7 16h10M9 10h6M10 6h4M5 21h14M4 13h16"/></>,
  backup: <><rect x="4" y="6" width="15" height="12" rx="1"/><path d="M19 10h2v4h-2m-7-6-3 4h3l-1 4 4-5h-3l1-3"/></>,
  transformer: <><path d="M4 5h16v14H4zM8 9c1.3-2 2.7-2 4 0s2.7 2 4 0m-8 6c1.3-2 2.7-2 4 0s2.7 2 4 0"/></>,
};

export default function ServiceIcon({ name }: { name: Service["icon"] }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{iconArtwork[name]}</svg>;
}
