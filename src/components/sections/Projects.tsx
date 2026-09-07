import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectArt } from "@/components/art/ProjectArt";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="Power in Action"
          description="A look at the kind of installations we deliver — residential, commercial, and battery-backed systems."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <div key={p.id} className="group overflow-hidden rounded-[6px] border border-border">
              <div className="aspect-[16/10] overflow-hidden">
                <ProjectArt
                  variant={p.art}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-[15px] font-semibold text-navy">{p.systemType}</p>
                  <p className="mt-0.5 text-[13.5px] text-text-secondary">{p.location}</p>
                </div>
                <span className="shrink-0 rounded-[3px] bg-background-muted px-2.5 py-1 text-[12px] font-medium text-text-secondary">
                  {p.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
