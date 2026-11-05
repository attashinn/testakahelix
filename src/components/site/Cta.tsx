import { ArrowUpRight } from "@phosphor-icons/react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Magnetic } from "./motion";

export const ctaVariants = cva(
  "group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full font-sans text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        primary: "bg-blue text-on-blue hover:bg-blue-deep",
        dark: "bg-ink text-on-blue hover:bg-blue",
        light: "bg-on-blue text-ink hover:bg-mist",
        outline: "border border-foreground/20 bg-background text-foreground hover:border-foreground",
        "outline-light": "border border-on-blue/35 text-on-blue hover:border-on-blue",
      },
      size: {
        md: "h-12 pl-6 pr-1.5",
        lg: "h-14 pl-7 pr-2 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

const dotVariants = cva(
  "relative flex size-9 items-center justify-center overflow-hidden rounded-full transition-transform duration-500 ease-out-expo group-hover/cta:scale-105",
  {
    variants: {
      variant: {
        primary: "bg-on-blue text-blue",
        dark: "bg-on-blue text-ink",
        light: "bg-blue text-on-blue",
        outline: "bg-blue text-on-blue",
        "outline-light": "bg-on-blue text-blue",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function CtaArrows({ className }: { className?: string }) {
  return (
    <>
      <ArrowUpRight
        weight="regular"
        className={cn(
          "size-4 transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-5 group-hover/cta:-translate-y-5",
          className,
        )}
      />
      <ArrowUpRight
        weight="regular"
        className={cn(
          "absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-0 group-hover/cta:translate-y-0",
          className,
        )}
      />
    </>
  );
}

type CtaProps = VariantProps<typeof ctaVariants> & {
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
} & ({ to: LinkProps["to"]; href?: never } | { href: string; to?: never });

export function Cta({ children, variant, size, className, magnetic = true, to, href }: CtaProps) {
  const inner = (
    <>
      <span className="relative">{children}</span>
      <span className={dotVariants({ variant })}>
        <CtaArrows />
      </span>
    </>
  );
  const cls = cn(ctaVariants({ variant, size }), className);
  const el = to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  );
  return magnetic ? <Magnetic strength={0.18}>{el}</Magnetic> : el;
}

/** Square blue arrow button used on cards. */
export function ArrowBox({ className, tone = "blue" }: { className?: string; tone?: "blue" | "light" }) {
  return (
    <span
      className={cn(
        "group/cta relative flex size-11 items-center justify-center overflow-hidden rounded-[3px] transition-transform duration-500 ease-out-expo",
        tone === "blue" ? "bg-blue text-on-blue" : "bg-on-blue text-blue",
        className,
      )}
    >
      <CtaArrows />
    </span>
  );
}

/** Inline text link with a drawn underline and a small arrow. */
export function TextLink({
  children,
  to,
  href,
  className,
}: {
  children: ReactNode;
  to?: LinkProps["to"];
  href?: string;
  className?: string;
}) {
  const cls = cn("group/tl inline-flex items-center gap-1.5 font-medium", className);
  const inner = (
    <>
      <span className="link-draw">{children}</span>
      <ArrowUpRight
        weight="regular"
        className="size-3.5 transition-transform duration-500 ease-out-expo group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5"
      />
    </>
  );
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} target="_blank" rel="noreferrer">
      {inner}
    </a>
  );
}
