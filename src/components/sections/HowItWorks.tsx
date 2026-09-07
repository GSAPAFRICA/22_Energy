import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Tell Us Your Needs",
    copy: "Tell us about your home, business and energy requirements.",
  },
  {
    number: "02",
    title: "We Design Your System",
    copy: "Our team develops a solar solution suited to your requirements.",
  },
  {
    number: "03",
    title: "We Install",
    copy: "Our installation team sets up your solar and battery system.",
  },
  {
    number: "04",
    title: "Start Saving & Powering",
    copy: "Generate, store and use your own clean energy.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background-warm py-20 lg:py-28">
      <Container>
        <SectionHeading title="How It Works" />

        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step) => (
              <li key={step.number} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-background-warm text-[15px] font-bold text-navy">
                  {step.number}
                </div>
                <h3 className="mt-5 text-[18px] font-bold text-navy">{step.title}</h3>
                <p className="mt-2 max-w-[240px] text-[14.5px] leading-relaxed text-text-secondary">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
