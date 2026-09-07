"use client";

import { Check, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packages } from "@/data/packages";
import { commercialInverters, lithiumBatteries, batteryPricingNote } from "@/data/products";
import { formatNaira } from "@/lib/currency";
import { useQuoteModal } from "@/components/forms/QuoteModalContext";
import { contactHref } from "@/data/company";

function HomePackages() {
  const { openQuoteModal } = useQuoteModal();
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`flex flex-col rounded-[6px] border p-6 ${
            pkg.featured
              ? "border-gold bg-navy shadow-[0_0_0_1px_rgba(240,171,31,0.4)]"
              : "border-border bg-white"
          }`}
        >
          {pkg.featured && (
            <span className="mb-3 inline-block w-fit rounded-[3px] bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
              Most chosen
            </span>
          )}
          <h3 className={`text-[19px] font-bold ${pkg.featured ? "text-white" : "text-navy"}`}>
            {pkg.name}
          </h3>
          <p className={`mt-1 text-[24px] font-bold ${pkg.featured ? "text-gold" : "text-navy"}`}>
            {pkg.priceDisplay}
          </p>
          <p
            className={`mt-1 text-[13.5px] ${
              pkg.featured ? "text-text-on-dark-muted" : "text-text-secondary"
            }`}
          >
            {pkg.description}
          </p>
          <ul className="mt-5 flex-1 space-y-2.5">
            {pkg.includes.map((item) => (
              <li
                key={item}
                className={`flex items-start gap-2 text-[13.5px] ${
                  pkg.featured ? "text-text-on-dark-muted" : "text-text-secondary"
                }`}
              >
                <Check size={16} className="mt-0.5 shrink-0 text-green" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => openQuoteModal(pkg.name)}
            className={`mt-6 rounded-[4px] px-4 py-2.5 text-[14px] font-semibold transition-colors ${
              pkg.featured
                ? "bg-gold text-navy hover:bg-gold-dark"
                : "bg-navy text-white hover:bg-navy-2"
            }`}
          >
            {pkg.cta}
          </button>
        </div>
      ))}
      <p className="col-span-full mt-2 text-[13px] leading-relaxed text-text-muted">
        Starting packages shown are indicative. Final pricing depends on system requirements,
        installation and a site assessment.
      </p>
    </div>
  );
}

function ProductList({
  products,
  note,
}: {
  products: typeof commercialInverters;
  note?: string;
}) {
  return (
    <div>
      <div className="overflow-hidden rounded-[6px] border border-border">
        {products.map((p, i) => (
          <div
            key={p.id}
            className={`flex flex-col gap-1.5 px-5 py-4 ${
              i !== products.length - 1 ? "border-b border-border" : ""
            } ${i % 2 === 1 ? "bg-background-warm" : "bg-white"}`}
          >
            <p className="text-[14.5px] font-semibold leading-snug text-navy">{p.name}</p>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-block rounded-[3px] bg-background-muted px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                {p.category}
              </span>
              <p className="text-[16px] font-bold text-navy">{formatNaira(p.price)}</p>
            </div>
          </div>
        ))}
      </div>
      {note && <p className="mt-3 text-[13px] leading-relaxed text-text-muted">{note}</p>}
    </div>
  );
}

export function Pricing() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="pricing" className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="Pricing & Solar Packages"
          description="Indicative pricing to help you plan — final pricing depends on system requirements, installation and site assessment."
        />

        <div className="mt-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-text-muted">
            Home Packages
          </p>
          <div className="mt-5">
            <HomePackages />
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-text-muted">
            Commercial &amp; High-Capacity Equipment
          </p>
          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-[19px] font-bold text-navy">Commercial Inverters</h3>
              <p className="mb-4 mt-1 text-[14px] text-text-secondary">30KVA and above</p>
              <ProductList products={commercialInverters} />
            </div>
            <div>
              <h3 className="text-[19px] font-bold text-navy">Lithium Batteries</h3>
              <p className="mb-4 mt-1 text-[14px] text-text-secondary">50KWH and above</p>
              <ProductList products={lithiumBatteries} note={batteryPricingNote} />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={contactHref.whatsapp(
                "Hi, I'd like to request pricing on your commercial inverters / lithium batteries."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] bg-navy px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-2"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Request via WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[6px] bg-background-warm p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[17px] font-bold text-navy">Need help choosing a system?</p>
            <p className="mt-1 text-[14.5px] text-text-secondary">
              Talk to an energy expert about what fits your needs and budget.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openQuoteModal()}
              className="rounded-[4px] bg-navy px-5 py-3 text-[14.5px] font-semibold text-white hover:bg-navy-2"
            >
              Talk to an Energy Expert
            </button>
            <a
              href={contactHref.whatsapp("Hi, I'd like help choosing a solar system.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[4px] border border-navy px-5 py-3 text-[14.5px] font-semibold text-navy hover:bg-navy hover:text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
