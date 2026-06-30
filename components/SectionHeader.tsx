type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

export function SectionHeader({ eyebrow, title, text }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-light leading-tight text-pearl md:text-6xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-mist md:text-lg">{text}</p> : null}
    </div>
  );
}
