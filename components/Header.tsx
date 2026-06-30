import Link from "next/link";
import { locales, type Locale } from "@/lib/routes";

const nav = [
  ["GC List", "/gc-list"],
  ["Partenaires", "/partenaires"],
  ["Événements", "/events"],
  ["Mini Map", "/mini-map"],
  ["Connexion", "/connexion"]
] as const;

export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
      <div className="section-shell flex min-h-[76px] items-center justify-between gap-4 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <img src="/brand/golden-circle-emblem.png" alt="Golden Circle" className="h-10 w-10" />
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-gold">GOLDEN CIRCLE</p>
            <p className="text-xs text-mist">L'Accès aux Privilèges</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-mist lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={`/${locale}${href}`} className="transition hover:text-gold">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden gap-2 text-xs uppercase tracking-[0.18em] text-mist md:flex">
          {locales.map((item) => (
            <Link key={item} href={`/${item}`} className={item === locale ? "text-gold" : "hover:text-gold"}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
