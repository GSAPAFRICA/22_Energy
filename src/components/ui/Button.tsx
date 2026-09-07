import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline-light" | "ghost";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-navy hover:bg-gold-dark active:translate-y-px shadow-[0_2px_0_0_rgba(209,144,15,0.5)] hover:shadow-[0_1px_0_0_rgba(209,144,15,0.5)]",
  secondary: "bg-navy text-white hover:bg-navy-2 active:translate-y-px",
  "outline-light":
    "bg-transparent text-white border border-white/35 hover:bg-white/10 hover:border-white/60",
  ghost: "bg-transparent text-navy hover:bg-navy/5",
};

const sizes: Record<ButtonSize, string> = {
  md: "text-[15px] px-5 py-3 rounded-[4px]",
  lg: "text-[16px] px-7 py-4 rounded-[4px]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href: string;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: LinkButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
