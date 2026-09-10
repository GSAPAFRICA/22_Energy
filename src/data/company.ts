
export const company = {
  name: "22 Energy",
  legalName: "22 Energy",
  tagline: "Powering a brighter tomorrow.",
  description:
    "22 Energy provides reliable solar panels, battery storage and complete solar power systems for homes, businesses and communities.",
  contact: {
    phone: "+234 916 006 5025",
    whatsapp: "+2349160065025",
    email: "marketing@22energy.org",
    address: "No 1, Ibidoja plaza, directly opposite wema bank,st Patrick bus stop,Alaba international market",
  },
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Solutions", href: "#solutions" },
    { label: "Pricing", href: "#pricing" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};

export const contactHref = {
  tel: () => `tel:${company.contact.phone.replace(/[^+\d]/g, "")}`,
  whatsapp: (message?: string) =>
    `https://wa.me/${company.contact.whatsapp}${
      message ? `?text=${encodeURIComponent(message)}` : ""
    }`,
  mail: (subject?: string) =>
    `mailto:${company.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`,
};
