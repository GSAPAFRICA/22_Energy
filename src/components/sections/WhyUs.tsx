import { ShieldCheck, TrendingDown, Leaf, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

const values = [
  {
    icon: ShieldCheck,
    title: "Reliable Power",
    copy: "Keep your essential systems running when you need them.",
  },
  {
    icon: TrendingDown,
    title: "Lower Energy Costs",
    copy: "Generate your own electricity and reduce dependence on conventional power.",
  },
  {
    icon: Leaf,
    title: "Clean Energy",
    copy: "Harness renewable energy from the sun.",
  },
  {
    icon: Settings2,
    title: "Built Around You",
    copy: "Every system can be designed around your energy needs and budget.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <Container>
        <h2 className="max-w-[520px] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[46px]">
          More sun. More power. More freedom.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, copy }, i) => (
            <div key={title} className="flex gap-5 border-t border-white/10 pt-6">
              <span className="shrink-0 text-[13px] font-semibold text-white/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <Icon size={24} className="text-gold" aria-hidden="true" strokeWidth={1.75} />
                <p className="mt-3 text-[19px] font-bold text-white">{title}</p>
                <p className="mt-1.5 max-w-[380px] text-[14.5px] leading-relaxed text-text-on-dark-muted">
                  {copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
