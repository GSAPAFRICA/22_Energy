 import { StaticImageData } from "next/image";
import Review1 from "../../public/images/hybrid_system.jpeg"
  import Review2 from "../../public/images/hybrid_system2.jpeg"
  import Battery from "../../public/images/inverters.jpeg"
import Battery2 from "../../public/images/batteries.jpeg"


export type Project = {
  id: string;
  type: "Residential" | "Commercial" | "Solar System" | "Battery Storage";
  systemType: string;
  art: "residential" | "commercial" | "battery" | "panelfield";
  img: StaticImageData
};

export const projects: Project[] = [
  {
    id: "proj-1",
    type: "Solar System",
    systemType: "Rooftop solar + battery backup",
    art: "residential",
    img:Review1
  },
  {
    id: "proj-2",
    type: "Residential",
    systemType: "Commercial rooftop array",
    art: "commercial",
    img:Review2
  },
  {
    id: "proj-3",
    type: "Battery Storage",
    systemType: "High-capacity battery bank",
    art: "battery",
    img:Battery
  },
  {
    id: "proj-4",
    type: "Residential",
    systemType: "Ground-mounted panel field",
    art: "panelfield",
    img:Battery2
  },
];
