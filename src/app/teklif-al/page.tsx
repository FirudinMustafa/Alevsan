import type { Metadata } from "next";
import {
  Box,
  CircleCheck,
  Coins,
  FileCog,
  FileText,
  Layers,
  Mail,
  PencilRuler,
  Settings,
  ShieldCheck,
  Target,
} from "lucide-react";
import { CtaBand, IconRow, PageHero } from "@/components/ui";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Teklif Al",
  description: "Teknik resminize, numunenize veya özel ölçülerinize göre hızlı ve güvenilir teklif alın.",
};

const steps = [
  { icon: FileText, title: "Talep Gönderimi", text: "Teknik resminizi, numunenizi veya ölçülerinizi ileterek teklif talebinizi oluşturun." },
  { icon: Settings, title: "Teknik Değerlendirme", text: "Uzman mühendis ekibimiz, projenizi teknik açıdan inceler ve üretim sürecini planlar." },
  { icon: Coins, title: "Fiyatlandırma", text: "Malzeme, adet, tolerans ve üretim sürecine göre en uygun fiyatlandırma yapılır." },
  { icon: Mail, title: "Geri Dönüş", text: "Teklifimiz en kısa sürede e-posta veya telefon aracılığıyla tarafınıza iletilir." },
];

const reasons = [
  "1971'den bu yana sektör tecrübesi",
  "Yüksek hassasiyet ve kaliteli üretim",
  "Farklı sektörlere özel parça üretimi",
  "Teknik resim, numune veya özel ölçü desteği",
  "Modern CNC makine parkı",
  "Hızlı teklif ve zamanında teslimat",
  "Küçük ve büyük adetlerde esnek üretim",
  "Gizlilik ve müşteri odaklı hizmet",
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Teklif Al"
        title={
          <>
            Teklif <span className="text-copper-grad">Al</span>
          </>
        }
        image="/images/hero-quote.webp"
        subtitle="Teknik resminize, numunenize veya özel ölçülerinize göre hızlı ve güvenilir teklif alın."
      >
        <IconRow
          circled
          items={[
            { icon: FileCog, label: "Teknik Resme Göre Teklif" },
            { icon: Box, label: "Numuneye Göre Teklif" },
            { icon: PencilRuler, label: "Özel Ölçülere Göre Teklif" },
          ]}
        />
      </PageHero>

      <section className="container-x grid gap-6 py-16 lg:grid-cols-[1.45fr_1fr]">
        <div className="card p-6 sm:p-9">
          <h2 className="font-display text-3xl font-bold">
            Teklif Talep <span className="text-copper-grad">Formu</span>
          </h2>
          <p className="mt-3 mb-8 text-muted">
            Projeniz için gerekli bilgileri doldurun, teknik ekibimiz en kısa sürede size özel teklifimizi iletsin.
          </p>
          <QuoteForm />
        </div>

        <div className="space-y-6">
          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">
              Süreç <span className="text-copper-grad">Nasıl İşler?</span>
            </h2>
            <p className="mt-2 text-sm text-muted">Teklif talebiniz, uzman ekibimiz tarafından hızlı ve titizlikle değerlendirilir.</p>
            <ol className="mt-8 space-y-7">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-5">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-ink">
                    <Icon className="h-6 w-6 text-copper" strokeWidth={1.5} />
                    <span className="absolute -top-1.5 -left-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-copper text-xs font-bold text-ink">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">
              Neden <span className="text-copper-grad">Alevsan?</span>
            </h2>
            <p className="mt-2 text-sm text-muted">Hassas talaşlı imalatta güvenilir çözüm ortağınız.</p>
            <ul className="mt-6 space-y-3.5 text-sm">
              {reasons.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <CircleCheck className="h-5 w-5 shrink-0 text-copper" strokeWidth={1.5} /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Hassas Üretim, Güvenilir Çözümler"
        title={
          <>
            Projeniz İçin
            <br />
            <span className="text-copper-grad">Doğru Adrestesiniz</span>
          </>
        }
        text="Alevsan Torna Sanayi ve Ticaret Ltd. Şti. olarak, teknik resminize, numunenize veya özel ölçülerinize göre hassas ve kaliteli parçaların üretimi için profesyonel çözümler sunuyoruz. Sizin için en uygun teklifi almak şimdi çok daha kolay."
        image="/images/cta-quote.webp"
        button={false}
        features={[
          { icon: Target, label: "Yüksek Hassasiyet" },
          { icon: Settings, label: "Kaliteli İşçilik" },
          { icon: Layers, label: "Zamanında Teslimat" },
          { icon: ShieldCheck, label: "Güvenilir Üretim" },
        ]}
      />
    </>
  );
}
