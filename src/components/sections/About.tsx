import { Container } from "@/components/ui/Container";
import Image from "next/image";
import HeroImg from "../../../public/images/hybrid_system.jpeg"

export function About() {
  return (
    <section id="about" className="bg-background py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="order-2 overflow-hidden rounded-[6px] lg:order-1 md:h-[500px]">
            <Image src={HeroImg}  alt="about-img" className="h-full w-full object-cover object-center scale-150"/>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-navy sm:text-[40px]">
              Energy that works for you
            </h2>
            <p className="mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-text-secondary">
              At 22 Energy, we make clean, reliable and affordable solar power accessible to homes
              and businesses.
            </p>
            <p className="mt-4 max-w-[520px] text-[16.5px] leading-relaxed text-text-secondary">
              From solar panels to complete power systems and battery storage, we provide
              solutions designed to help you generate, store and use your own energy.
            </p>

            <div className="mt-6 grid grid-cols-1">
              <div className=" py-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-green">
                  Our Mission
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-navy">
                  To make reliable, sustainable energy accessible to everyone.
                </p>
              </div>
              <div className=" py-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gold-dark">
                  Our Vision
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-navy">
                  A future powered by clean, affordable and dependable energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
