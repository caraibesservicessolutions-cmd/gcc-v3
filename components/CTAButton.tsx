import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

const variants = {
  primary: "bg-gold text-ink hover:bg-champagne",
  secondary: "premium-border text-pearl hover:border-gold hover:text-gold",
  ghost: "text-gold hover:text-champagne"
};

export function CTAButton({ href, children, variant = "primary", external = false }: CTAButtonProps) {
  const className = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${variants[variant]}`;

  if (external) {
    return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>;
  }

  return <Link href={href} className={className}>{children}</Link>;
}
