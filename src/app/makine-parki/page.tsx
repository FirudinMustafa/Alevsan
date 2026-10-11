import type { Metadata } from "next";
import Image from "next/image";
import {
  ChartNoAxesColumn,
  CircleCheck,
  Crosshair,
  FileText,
  Layers,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { CtaBand, IconRow, PageHero } from "@/components/ui";
import { company, machines } from "@/lib/site";

export const metadata: Metadata = {
  title: "Makine Parkı",
  description: "CNC otomatlar, CNC kayar makineler, indeks otomatlar, 6 milli otomatlar ve transfer makineleri ile yüksek hassasiyetli seri üretim.",
};

const advantages = [
  { icon: Crosshair, title: "Yüksek Hassasiyet", text: "Dar toleranslarda istikrarlı kalite" },
  { icon: RefreshCw, title: "Tekrarlanabilirlik", text: "Seri üretimde tutarlı sonuçlar" },
  { icon: Zap, title: "Yüksek Hız", text: "Kısa çevrim süreleri ile hızlı üretim" },
  { icon: ChartNoAxesColumn, title: "Verimlilik", text: "Optimize edilmiş üretim süreçleri" },
  { icon: Layers, title: "Yüksek Kapasite", text: "Farklı sektörlere geniş üretim imkânı" },
];

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6 sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-lg font-semibold">
        <span className="h-5 w-1 rounded bg-copper" />
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function MachinePage() {
  return (
    <>
      <PageHero
        title="Makine Parkı"
        image="/images/hero-machines-v2.webp"
        subtitle="Gelişmiş makine parkımız ve modern üretim teknolojimizle, hassas talaşlı imalatta yüksek kalite ve seri üretim kapasitesi sunuyoruz."
      >
        <IconRow
          items={[
            { icon: Crosshair, label: "Hassas Üretim" },
            { icon: Settings, label: "Modern CNC Teknolojisi" },
            { icon: Layers, label: "Seri Üretim Kapasitesi" },
            { icon: ShieldCheck, label: "Güvenilir Kalite" },
          ]}
        />
      </PageHero>

      <section className="container-x space-y-6 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {machines.map((m, i) => (
            <article
              key={m.title}
              className={`card overflow-hidden transition hover:border-copper/60 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
            >
              <div className={`relative ${i < 3 ? "aspect-[16/10]" : "aspect-[21/9]"}`}>
                <Image src={m.image} alt={m.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{m.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-text/85">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <CircleCheck className="h-4 w-4 shrink-0 text-copper" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <Panel title="Üretim Avantajlarımız">
          <ul className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {advantages.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`flex flex-col items-center px-4 text-center ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
                <Icon className="h-9 w-9 text-copper" strokeWidth={1.3} />
                <p className="mt-4 font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Makine Parkı Kapasitemiz">
          <ul className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            <li className="text-center">
              <p className="text-copper-grad font-display text-4xl font-bold">
                {company.facilityArea}
                <span className="ml-1 text-2xl">m²</span>
              </p>
              <p className="mt-1 text-sm text-text/85">Üretim Alanı</p>
            </li>
            {machines.map((m) => (
              <li key={m.title} className="text-center lg:border-l lg:border-line">
                <p className="text-copper-grad font-display text-4xl font-bold">{m.count}</p>
                <p className="mt-1 text-sm text-text/85">{m.countLabel}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <CtaBand
        title={
          <>
            Projeniz İçin
            <br />
            Hemen Teklif Alın
          </>
        }
        text="İhtiyacınıza uygun üretim çözümleri için uzman ekibimizle iletişime geçin."
        image="/images/cta-parts.webp"
        features={[
          { icon: FileText, label: "Teknik Resme Göre Üretim" },
          { icon: Settings, label: "Hızlı Geri Dönüş" },
          { icon: Users, label: "Uzman Destek" },
        ]}
      />
    </>
  );
}
