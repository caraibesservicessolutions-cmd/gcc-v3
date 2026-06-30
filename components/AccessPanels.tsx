type AccessPanelProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
};

export function AccessPanel({ eyebrow, title, text, children }: AccessPanelProps) {
  return (
    <article className="premium-border card-blur rounded-[28px] p-6 shadow-card">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p> : null}
      <h3 className="mt-3 font-display text-2xl font-light text-pearl">{title}</h3>
      {text ? <p className="mt-4 text-sm leading-7 text-mist">{text}</p> : null}
      {children}
    </article>
  );
}

export function AccessGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

export function NoticeBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-gold/35 bg-gold/10 p-5 text-sm leading-7 text-champagne">
      {children}
    </div>
  );
}
