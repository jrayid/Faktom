export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  location: string;
  states: string[];
  services: string[];
  summary: string;
  photos: string[];
};

export const projects: Project[] = [
  {
    slug: "julius-berger-onitsha-owerri-line-relocation",
    title: "High-tension line relocation on the Onitsha-Owerri expressway",
    client: "Julius Berger",
    year: "2008",
    location: "Onitsha-Owerri expressway",
    // Route is known; the exact worksite state has not been confirmed.
    states: [],
    services: ["high-tension-work"],
    summary: "Fakom relocated a high-tension line on the Onitsha-Owerri expressway for Julius Berger. Exact dates, line details and project capacity: [TO CONFIRM].",
    photos: [],
  },
  {
    slug: "kodi-hitech-owerri-orlu-line-relocation",
    title: "High and low tension line relocation on the Owerri-Orlu road",
    client: "Kodi Hitech Engr Limited",
    year: "2012",
    location: "Owerri-Orlu road",
    states: ["Imo"],
    services: ["high-tension-work", "power-distribution"],
    summary: "Fakom relocated high and low tension lines on the Owerri-Orlu road for Kodi Hitech Engr Limited. Exact dates, line details and project capacity: [TO CONFIRM].",
    photos: [],
  },
  {
    slug: "airtel-site-reactivations",
    title: "Telecom site reactivations",
    client: "Airtel",
    year: "[TO CONFIRM]",
    location: "Imo, Abia, Akwa Ibom, Cross River and Rivers states",
    states: ["Imo", "Abia", "Akwa Ibom", "Cross River", "Rivers"],
    services: ["power-distribution", "transformer-reactivation-installation"],
    summary: "Fakom reactivated Airtel sites across Imo, Abia, Akwa Ibom, Cross River and Rivers states. Project dates, site count and the details of the work at each site: [TO CONFIRM].",
    photos: [],
  },
  {
    slug: "airtel-transformer-installations",
    title: "New transformer installations for the network",
    client: "Airtel",
    year: "[TO CONFIRM]",
    location: "Imo and Enugu states",
    states: ["Imo", "Enugu"],
    services: ["transformer-reactivation-installation"],
    summary: "Fakom installed new transformers for Airtel’s network in Imo and Enugu states. Project dates, transformer capacities and site count: [TO CONFIRM].",
    photos: [],
  },
];
