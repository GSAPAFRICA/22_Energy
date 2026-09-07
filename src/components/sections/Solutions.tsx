"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolutionArt } from "@/components/art/SolutionArt";
import { useQuoteModal } from "@/components/forms/QuoteModalContext";
import Image1 from "../../../public/images/solution-panels.jpg"
import Image2 from "../../../public/images/solution-battery.jpg"
import Image3 from "../../../public/images/about-solar-installation.jpg"
import Image from "next/image";



const solutions = [
  {
    id: "panels",
    art: "panels" as const,
    title: "Solar Panels",
    copy: "Harness the power of the sun and generate clean electricity for your home or business.",
    tags: ["Homes", "Offices", "Shops", "Schools"],
    cta: "Learn More",
    dark: false,
    image:Image1
  },
  {
    id: "battery",
    art: "battery" as const,
    title: "Solar Batteries",
    copy: "Store excess solar energy and keep your essential appliances running when the sun goes down.",
    tags: ["Backup power", "Load shedding", "Peace of mind"],
    cta: "Learn More",
    dark: true,
    image:Image2
  },
  {
    id: "system",
    art: "system" as const,
    title: "Complete Solar Systems",
    copy: "From panels to batteries and installation, we design complete energy solutions around your needs.",
    tags: ["End-to-end design", "Installation", "Support"],
    cta: "Get a Quote",
    dark: false,
    isQuote: true,
    image:Image3
  },
];

export function Solutions() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="solutions" className="bg-background-warm py-20 lg:py-28">
      <Container>
        <SectionHeading title="Our Solutions" />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {solutions.map((s) => (
            <div
              key={s.id}
              className={`group flex flex-col overflow-hidden rounded-[6px] border ${
                s.dark ? "border-navy-2 bg-navy" : "border-border bg-white"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image src={s.image} alt="solution images" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className={`text-[21px] font-bold ${s.dark ? "text-white" : "text-navy"}`}>
                  {s.title}
                </h3>
                <p
                  className={`mt-2.5 flex-1 text-[14.5px] leading-relaxed ${
                    s.dark ? "text-text-on-dark-muted" : "text-text-secondary"
                  }`}
                >
                  {s.copy}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <li
                      key={tag}
                      className={`rounded-[3px] px-2.5 py-1 text-[12px] font-medium ${
                        s.dark
                          ? "bg-white/10 text-text-on-dark-muted"
                          : "bg-background-muted text-text-secondary"
                      }`}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openQuoteModal(s.isQuote ? "Complete Solar System" : undefined)}
                  className={`mt-6 inline-flex items-center gap-1.5 self-start text-[14.5px] font-semibold transition-colors ${
                    s.dark ? "text-gold hover:text-gold-light" : "text-navy hover:text-gold-dark"
                  }`}
                >
                  {s.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
