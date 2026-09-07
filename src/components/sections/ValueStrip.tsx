import { Sun, BatteryCharging, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  {
    icon: Sun,
    title: "Solar Panels",
    copy: "Clean energy generation from the sun.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Storage",
    copy: "Energy when you need it, day or night.",
  },
  {
    icon: Zap,
    title: "Complete Systems",
    copy: "Designed and installed around your needs.",
  },
];

export function ValueStrip() {
  return (
    <div className="relative bg-navy-2">
      <Container>
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-center gap-4 py-6 sm:px-8 sm:py-8">
              <Icon className="shrink-0 text-gold" size={26} aria-hidden="true" strokeWidth={1.75} />
              <div>
                <p className="text-[15px] font-semibold text-white">{title}</p>
                <p className="text-[13.5px] text-text-on-dark-muted">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
