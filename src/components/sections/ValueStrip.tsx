import { Container } from "@/components/ui/Container";

const items = [
  {
    title: "Solar Panels",
    copy: "Clean energy generation from the sun.",
  },
  {
    title: "Battery Storage",
    copy: "Energy when you need it, day or night.",
  },
  {
    title: "Complete Systems",
    copy: "Designed and installed around your needs.",
  },
];

export function ValueStrip() {
  return (
    <div className="relative bg-navy-2">
      <Container>
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map(({ title, copy }) => (
            <div key={title} className="flex items-center gap-4 py-6 sm:px-8 sm:py-8 md:text-center">
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
