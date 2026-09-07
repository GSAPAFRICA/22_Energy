/**
 * Central company configuration.
 * Replace the placeholder contact values with real 22 Energy details
 * before launch — every "Call/WhatsApp/Email" action on the site reads from here.
 */
export const company = {
  name: "22 Energy",
  legalName: "22 Energy",
  tagline: "Powering a brighter tomorrow.",
  description:
    "22 Energy provides reliable solar panels, battery storage and complete solar power systems for homes, businesses and communities.",
  contact: {
    // TODO: replace with the real business phone number, e.g. "+2348012345678"
    phone: "+000-000-0000",
    // TODO: replace with the real WhatsApp number in international format, digits only, e.g. "2348012345678"
    whatsapp: "000000000000",
    // TODO: replace with the real business email
    email: "hello@22energy.example",
    // TODO: fill in the real office address once confirmed
    address: "Lagos, Nigeria",
  },
  social: {
    // TODO: add real social profile URLs here once available. Leave empty to hide the link.
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
