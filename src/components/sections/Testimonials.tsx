"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }
  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }

  return (
    <section className="bg-background-warm py-20 lg:py-28">
      <Container>
        <SectionHeading title="What Our Customers Say" align="center" />

        <div className="mx-auto mt-12 max-w-[720px]">
          <div className="rounded-[8px] border border-border bg-white p-8 sm:p-10">
            <Quote className="text-gold" size={30} aria-hidden="true" />
            <p className="mt-5 text-[19px] leading-relaxed text-navy sm:text-[21px]">
              {current.quote}
            </p>
            <div className="mt-6">
              <p className="text-[15px] font-semibold text-navy">{current.name}</p>
              <p className="text-[13.5px] text-text-secondary">
                {current.role} · {current.projectType}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="rounded-full border border-border p-2 text-navy transition-colors hover:bg-white"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial pagination">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="rounded-full border border-border p-2 text-navy transition-colors hover:bg-white"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
