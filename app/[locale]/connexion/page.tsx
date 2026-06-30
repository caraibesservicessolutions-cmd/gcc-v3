import { notFound } from "next/navigation";
import { AccessGrid, AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { isLocale, type Locale } from "@/lib/routes";
import { loginPage } from "@/lib/v3-content";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;
  const data = loginPage;

  return (
    <main>
      <section className="border-b border-white/10 bg-wine/40 snake-texture">
        <div className="section-shell py-16 md:py-24">
          <SectionHeader eyebrow={data.eyebrow} title={data.title} text={data.text} />
          <div className="mt-8 flex flex-wrap gap-3">
            {data.ctas.map((cta) => (
              <CTAButton key={cta.href} href={`/${currentLocale}${cta.href}`} variant={cta.variant}>
                {cta.label}
              </CTAButton>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell py-14 md:py-20">
        <AccessGrid>
          {data.cards.map((card) => (
            <AccessPanel key={card.title} eyebrow={card.eyebrow} title={card.title} text={card.text}>
              {card.items ? (
                <ul className="mt-5 space-y-2 text-sm leading-6 text-mist">
                  {card.items.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              ) : null}
            </AccessPanel>
          ))}
        </AccessGrid>
        {data.notice ? <div className="mt-8"><NoticeBox>{data.notice}</NoticeBox></div> : null}
      </section>
    </main>
  );
}
