/**
 * Installation showcase. No real project photography or metrics have been
 * supplied yet, so entries are structured placeholders — swap `image` for a
 * real photo and fill in the real location/capacity when available. Do not
 * add performance claims (e.g. "saved 40%") unless the figure is confirmed.
 */
export type Project = {
  id: string;
  type: "Residential" | "Commercial" | "Solar System" | "Battery Storage";
  location: string;
  systemType: string;
  art: "residential" | "commercial" | "battery" | "panelfield";
};

export const projects: Project[] = [
  {
    id: "proj-1",
    type: "Residential",
    location: "Location to be confirmed",
    systemType: "Rooftop solar + battery backup",
    art: "residential",
  },
  {
    id: "proj-2",
    type: "Commercial",
    location: "Location to be confirmed",
    systemType: "Commercial rooftop array",
    art: "commercial",
  },
  {
    id: "proj-3",
    type: "Battery Storage",
    location: "Location to be confirmed",
    systemType: "High-capacity battery bank",
    art: "battery",
  },
  {
    id: "proj-4",
    type: "Solar System",
    location: "Location to be confirmed",
    systemType: "Ground-mounted panel field",
    art: "panelfield",
  },
];
