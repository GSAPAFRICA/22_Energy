"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { company } from "@/data/company";
import { useQuoteModal } from "@/components/forms/QuoteModalContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(10,22,40,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1360px] items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10"
      >
        <a href="#home" className="flex items-center gap-2.5" aria-label="22 Energy home">
          <Image
            src="/images/logo-transparent.png"
            alt="22 Energy logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
          <span className="text-[17px] font-bold tracking-tight text-navy">22 Energy</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {company.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[15px] font-medium text-navy transition-colors hover:text-gold-dark"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <button
            onClick={() => openQuoteModal()}
            className="rounded-[4px] bg-gold px-5 py-2.5 text-[14.5px] font-semibold text-navy transition-colors hover:bg-gold-dark"
          >
            Get a Quote
          </button>
        </div>

        <button
          className="-mr-2.5 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <X size={26} className="text-navy" aria-hidden="true" />
          ) : (
            <Menu size={26} className="text-navy" aria-hidden="true" />
          )}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white px-5 pb-6 pt-2 lg:hidden animate-fade-up"
        >
          <ul className="flex flex-col">
            {company.nav.map((item) => (
              <li key={item.href} className="border-b border-border/70 last:border-0">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-[16px] font-medium text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setMenuOpen(false);
              openQuoteModal();
            }}
            className="mt-4 w-full rounded-[4px] bg-gold px-5 py-3 text-[15px] font-semibold text-navy"
          >
            Get a Quote
          </button>
        </div>
      )}
    </header>
  );
}
