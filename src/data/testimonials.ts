/**
 * PLACEHOLDER CONTENT — no real customer testimonials have been supplied.
 * Do not present these as genuine reviews. Replace `quote`, `name`, `role`
 * with real, permissioned customer testimonials before launch.
 */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  projectType: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Add a real customer quote here once available — this space is ready to display genuine, permissioned feedback about the installation experience.",
    name: "Customer name (placeholder)",
    role: "Role / company (placeholder)",
    projectType: "Residential system",
  },
  {
    id: "placeholder-2",
    quote:
      "This second slot is reserved for another real testimonial — for example, feedback from a business or commercial customer about reliability and service.",
    name: "Customer name (placeholder)",
    role: "Role / company (placeholder)",
    projectType: "Commercial system",
  },
  {
    id: "placeholder-3",
    quote:
      "A third placeholder slot — swap in a genuine quote about battery storage, installation speed, or after-sales support once real feedback is collected.",
    name: "Customer name (placeholder)",
    role: "Role / company (placeholder)",
    projectType: "Battery storage",
  },
];
