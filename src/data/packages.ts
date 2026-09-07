/**
 * Home & business solar packages.
 * `priceDisplay` is an indicative starting figure, not a final quote — actual
 * package prices have not been confirmed yet. Replace the "$XXX" placeholders
 * with real starting prices once available; everything else can stay as-is.
 */
export type Package = {
  id: string;
  name: string;
  priceDisplay: string;
  description: string;
  includes: string[];
  cta: string;
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    priceDisplay: "From $XXX",
    description: "For essential home power.",
    includes: ["Solar panels", "Inverter", "Installation", "Basic system setup"],
    cta: "Get Started",
  },
  {
    id: "home",
    name: "Home",
    priceDisplay: "From $XXX",
    description: "For comfortable everyday living.",
    includes: [
      "Solar panels",
      "Hybrid inverter",
      "Battery storage",
      "Installation",
      "System setup",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    priceDisplay: "From $XXX",
    description: "Built for businesses that need dependable power.",
    includes: [
      "High-capacity solar panels",
      "Commercial inverter",
      "Battery storage",
      "Professional installation",
      "System monitoring",
    ],
    cta: "Request a Quote",
  },
  {
    id: "custom",
    name: "Custom",
    priceDisplay: "Tailored pricing",
    description: "For larger homes, offices, schools and commercial projects.",
    includes: [
      "Site assessment",
      "Engineered system design",
      "Scalable capacity",
      "Ongoing monitoring & support",
    ],
    cta: "Talk to an Energy Expert",
  },
];
