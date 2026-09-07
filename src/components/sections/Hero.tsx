"use client";
import { useQuoteModal } from "@/components/forms/QuoteModalContext";
import Image from "next/image";
import HeroImg from "../../../public/images/hero-solar-home.jpg"

export function  Hero() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="home" className="relative overflow-hidden bg-[url(/images/hero-solar-home.jpg)] h-lvh bg-no-repeat bg-cover bg-center">
      <div className="bg-background-warm/60 h-full flex text-center">
      <div className="mx-auto flex max-w-[1360px] flex-col-reverse lg:flex-row lg:items-center lg:gap-10">
        <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-12 pt-8 sm:px-8 lg:px-10 lg:py-24">
          <p className="animate-fade-up text-[13px] font-semibold uppercase tracking-[0.14em] text-green">
            Solar Panels · Solar Systems · Battery Storage
          </p>
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
            Reliable solar energy for homes, businesses and communities — switch to clean,
            dependable power with 22 Energy.
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <button
              onClick={() => openQuoteModal()}
              className="rounded-sm bg-gold px-7 py-3.5 text-[15.5px] font-semibold text-navy shadow-[0_2px_0_0_rgba(209,144,15,0.6)] transition-all hover:bg-gold-dark hover:shadow-[0_1px_0_0_rgba(209,144,15,0.6)] active:translate-y-px"
            >
              Get a Quote
            </button>
            <a
              href="#solutions"
              className="rounded-sm border border-navy/25 px-7 py-3.5 text-[15.5px] font-semibold text-navy transition-colors hover:border-navy/50 hover:bg-navy/5"
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


{/* <div className="h-full px-5 pb-8 sm:px-8 lg:px-0 lg:py-20 ">
          <Image src={HeroImg} alt="hero image" className="aspect-[8/9] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]" />

</div> */}
      </div>
      </div>
    </section>
  );
}
