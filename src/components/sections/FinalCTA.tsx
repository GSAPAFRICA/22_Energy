"use client";

import { Phone, MessageCircle, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company, contactHref } from "@/data/company";
import { useQuoteModal } from "@/components/forms/QuoteModalContext";

export function FinalCTA() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[100px]"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[48px]">
            Ready to take control of your energy?
          </h2>
          <p className="mt-4 text-[16.5px] text-text-on-dark-muted">
            Make the switch to reliable, clean solar power.
          </p>
          <p className="mt-6 text-[14px] font-semibold uppercase tracking-[0.14em] text-gold">
            Let&apos;s power your future
          </p>

          <div className="mt-9 flex justify-center">
            <button
              onClick={() => openQuoteModal()}
              className="rounded-[4px] bg-gold px-8 py-4 text-[16px] font-semibold text-navy shadow-[0_2px_0_0_rgba(209,144,15,0.6)] transition-all hover:bg-gold-dark hover:shadow-[0_1px_0_0_rgba(209,144,15,0.6)] active:translate-y-px"
            >
              Get a Quote
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
            <a
              href={contactHref.tel()}
              className="flex items-center gap-2 text-[14.5px] font-medium text-white/85 transition-colors hover:text-gold"
            >
              <Phone size={17} aria-hidden="true" /> Call Us
            </a>
            <a
              href={contactHref.whatsapp("Hi, I'd like to learn more about 22 Energy.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[14.5px] font-medium text-white/85 transition-colors hover:text-gold"
            >
              <MessageCircle size={17} aria-hidden="true" /> WhatsApp Us
            </a>
            <a
              href={contactHref.mail("Solar quote request")}
              className="flex items-center gap-2 text-[14.5px] font-medium text-white/85 transition-colors hover:text-gold"
            >
              <Mail size={17} aria-hidden="true" /> Email Us
            </a>
          </div>
          <p className="mt-6 text-[12.5px] text-white/40">{company.description}</p>
        </div>
      </Container>
    </section>
  );
}
