import { notFound } from "next/navigation";
import { AccessGrid, AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { isLocale, type Locale } from "@/lib/routes";
import { accessSteps, brandRules, gcList, partnerTiers, publicNotice } from "@/lib/v3-content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-ink snake-texture">
        <div className="absolute inset-0 bg-gradient-to-br from-wine via-ink/92 to-ink" />
        <div className="section-shell relative z-10 grid min-h-[calc(100svh-76px)] items-center gap-10 py-14 lg:grid-cols-[1fr_0.78fr]">
          <div className="max-w-3xl">
            <img src="/brand/golden-circle-emblem.svg" alt="" className="h-16 w-16" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-gold">Infrastructure privée</p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[0.96] text-pearl sm:text-7xl lg:text-8xl">
              GOLDEN CIRCLE
              <span className="block gold-text">Caraïbes</span>
            </h1>
            <p className="mt-6 font-display text-2xl font-light text-pearl">L'Accès aux Privilèges.</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
              Une infrastructure privée d'accès aux privilèges, expériences, offres partenaires et opportunités lifestyle en Caraïbe.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={`/${currentLocale}/gc-list`}>Je suis membre</CTAButton>
              <CTAButton href={`/${currentLocale}/partenaires`} variant="secondary">Je suis partenaire</CTAButton>
            </div>
          </div>
          <div className="space-y-4">
            <AccessPanel eyebrow="Principe" title="Les partenaires proposent. Golden Circle valide. Les membres accèdent." text="L'accès reste contrôlé, limité et cohérent avec la valeur de l'écosystème." />
            <NoticeBox>{publicNotice}</NoticeBox>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader eyebrow="Positionnement" title="Un cercle d'accès privé et qualifié." text="Golden Circle n'ouvre pas tout à tout le monde. Il qualifie, valide et distribue des accès selon les conditions." />
          <AccessGrid>
            <AccessPanel eyebrow="Contrôle" title="Ce que Golden Circle est" text="Une communauté membre, un réseau partenaire qualifié, un distributeur d'accès et un cadre de validation." />
            <AccessPanel eyebrow="Clarté" title="Ce que Golden Circle n'est pas">
              <ul className="mt-5 space-y-2 text-sm leading-6 text-mist">
                {brandRules.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </AccessPanel>
          </AccessGrid>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 py-16 md:py-24">
        <div className="section-shell">
          <SectionHeader eyebrow="Fonctionnement" title="Un accès en trois temps." text="Ce cadre protège les membres, les partenaires et la perception premium de Golden Circle." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {accessSteps.map((step) => <AccessPanel key={step.title} title={step.title} text={step.text} />)}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <AccessPanel eyebrow="Membres" title="Rejoindre la GC List" text="Accéder à une sélection de privilèges, expériences et opportunités selon conditions Golden Circle.">
            <ul className="mt-5 space-y-2 text-sm leading-6 text-mist">
              {gcList.map((item) => <li key={item}>• {item}</li>)}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={`/${currentLocale}/gc-list`}>GC List</CTAButton>
              <CTAButton href={`/${currentLocale}/mini-map`} variant="secondary">Mini Map</CTAButton>
            </div>
          </AccessPanel>
          <AccessPanel eyebrow="Partenaires" title="Proposer une activation" text="Tester une offre, remplir intelligemment un moment, valoriser une image et toucher une communauté qualifiée.">
            <ul className="mt-5 space-y-2 text-sm leading-6 text-mist">
              {partnerTiers.map((item) => <li key={item.name}>• {item.name} — {item.quota}</li>)}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={`/${currentLocale}/partenaires`}>Partenaires</CTAButton>
              <CTAButton href={`/${currentLocale}/connexion`} variant="secondary">Connexion</CTAButton>
            </div>
          </AccessPanel>
        </div>
      </section>
    </main>
  );
}
