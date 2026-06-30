import Link from "next/link";
import { type Locale } from "@/lib/routes";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-white/10 bg-coal">
      <div className="section-shell grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <img src="/brand/golden-circle-emblem.svg" alt="" className="h-12 w-12" />
          <p className="mt-4 max-w-xl text-sm leading-7 text-mist">
            Golden Circle est le pôle événementiel, lifestyle et privilèges de CSS — Caribbean Services Solutions. Accès, offres et événements sous conditions Golden Circle.
          </p>
        </div>
        <div className="space-y-2 text-sm text-mist md:text-right">
          <Link href={`/${locale}/legal`} className="block hover:text-gold">Mentions légales</Link>
          <p className="text-gold">@gld.crcl</p>
          <p>✨ Golden Circle – L'Accès aux Privilèges 🐍</p>
        </div>
      </div>
    </footer>
  );
}
