import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { company, contactHref } from "@/data/company";

const solutionLinks = ["Solar Panels", "Solar Batteries", "Complete Solar Systems"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy pt-16">
      <Container>
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-transparent.png"
                alt="22 Energy logo"
                width={34}
                height={34}
              />
              <span className="text-[16px] font-bold text-white">22 Energy</span>
            </div>
            <p className="mt-4 max-w-[240px] text-[14px] leading-relaxed text-text-on-dark-muted">
              Clean, reliable energy for homes, businesses and communities.
            </p>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/50">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {company.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[14.5px] text-text-on-dark-muted transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/50">
              Solutions
            </p>
            <ul className="mt-4 space-y-2.5">
              {solutionLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#solutions"
                    className="text-[14.5px] text-text-on-dark-muted transition-colors hover:text-gold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/50">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={contactHref.tel()}
                  className="text-[14.5px] text-text-on-dark-muted transition-colors hover:text-gold"
                >
                  {company.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactHref.whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] text-text-on-dark-muted transition-colors hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contactHref.mail()}
                  className="text-[14.5px] text-text-on-dark-muted transition-colors hover:text-gold"
                >
                  {company.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-[13px] text-white/40">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="text-[13px] text-white/40">{company.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
