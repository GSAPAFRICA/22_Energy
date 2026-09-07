import { ReactNode } from "react";

export function SectionHeading({
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`max-w-[640px] ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <h2
        className={`text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-0.02em] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-[16px] sm:text-[17px] leading-relaxed ${
            light ? "text-text-on-dark-muted" : "text-text-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
