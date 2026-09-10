"use client";
import { useEffect, useRef, useState } from "react";
import { useQuoteModal } from "@/components/forms/QuoteModalContext";

const HERO_BACKGROUNDS = [
  "/images/hybrid_system.jpeg",
  "/images/hero-solar-home.jpg",
  "/images/about-solar-installation.jpg",
  "/images/hybrid_system2.jpeg",
  "/images/solution-panels.jpg",
];

export function Hero() {
  const { openQuoteModal } = useQuoteModal();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden h-lvh"
    >
      {HERO_BACKGROUNDS.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${src})`,
            opacity: index === activeIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="relative bg-background-warm/80 h-full flex text-center">
        <div className="mx-auto flex max-w-[1360px] flex-col-reverse lg:flex-row lg:items-center lg:gap-10">
          <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-12 pt-8 sm:px-8 lg:px-10 lg:py-24">
            <h1
              className="mt-4 animate-fade-up text-[38px] font-bold leading-[1.08] tracking-[-0.02em] text-navy sm:text-[52px] lg:text-[58px]"
              style={{ animationDelay: "80ms" }}
            >
              Power your life.
              <br />
              Power your future.
            </h1>
            <p
              className="mt-5 max-w-[440px] animate-fade-up text-[17px] leading-relaxed text-text-secondary"
              style={{ animationDelay: "160ms" }}
            >
              Reliable solar energy for homes, businesses and communities.
              Switch to clean, dependable power with 22 Energy.
            </p>

            <div
              className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <button
                onClick={() => openQuoteModal()}
                className="rounded-3xl bg-gold px-7 py-3.5 text-[15.5px] font-semibold text-navy shadow-[0_2px_0_0_rgba(209,144,15,0.6)] transition-all hover:bg-gold-dark hover:shadow-[0_1px_0_0_rgba(209,144,15,0.6)] active:translate-y-px"
              >
                Get a Quote
              </button>
              <a
                href="#solutions"
                className="rounded-3xl border border-navy/25 px-7 py-3.5 text-[15.5px] font-semibold text-navy transition-colors hover:border-navy/50 hover:bg-navy/5"
              >
                Explore Solutions
              </a>
            </div>

            <p
              className="mt-10 animate-fade-up text-[13px] font-semibold uppercase tracking-[0.14em] text-text-muted"
              style={{ animationDelay: "320ms" }}
            >
              Powering a brighter tomorrow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
