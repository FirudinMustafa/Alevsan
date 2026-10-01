import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Cog,
  Crosshair,
  Factory,
  Gauge,
  Gem,
  HardHat,
  Layers,
  Settings,
  ShieldCheck,
  Tractor,
  Trophy,
  Truck,
  Users,
  WashingMachine,
  Zap,
} from "lucide-react";
import { ImageCard, SectionHeading } from "@/components/ui";
import { featuredProducts, homeMachines, sectors } from "@/lib/site";

const sectorIcons = { Car, Cog, Factory, Gauge, WashingMachine, Zap, Tractor, HardHat };

const strengths = [
  { icon: Gem, label: "1971'den Bugüne" },
  { icon: Settings, label: "Geniş Makine Parkı" },
  { icon: Crosshair, label: "Yüksek Hassasiyet" },
  { icon: Layers, label: "Özel Ölçü Seri Üretim" },
  { icon: Truck, label: "Zamanında Teslimat" },
];

const values = [
  { icon: Trophy, label: "Uzun Yıllara Dayanan Tecrübe" },
  { icon: Users, label: "Müşteri Odaklı Çözüm Anlayışı" },
  { icon: Settings, label: "Yüksek Kaliteli Üretim" },
  { icon: ShieldCheck, label: "Güvenilir İş Ortağı" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[65%]">
          <Image src="/images/hero-home.webp" alt="" fill priority sizes="65vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink from-5% via-ink/50 via-30% to-transparent to-60%" />
        <div className="absolute inset-0 bg-ink/60 md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>
        <div className="container-x pt-20 pb-10 md:pt-28">
          <div className="max-w-2xl">
            <h1 className="title-metal text-4xl leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
              Hassas Talaşlı İmalat ve Özel Bağlantı Elemanları
            </h1>
            <p className="mt-6 max-w-lg text-lg text-text/90 sm:text-xl">
              1971&apos;den bugüne, teknik resme veya numuneye göre özel ölçü ve seri üretim metal parçalar.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/teklif-al" className="btn-copper">
                Teklif Alın <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/urunler" className="btn-outline">
                Üretimlerimizi İnceleyin <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <ul className="mt-20 grid grid-cols-2 gap-y-8 border-t border-line/70 pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {strengths.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={`flex flex-col items-center gap-3 text-center text-sm font-medium ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
              >
                <Icon className="h-7 w-7 text-copper" strokeWidth={1.5} />
                <span className="max-w-28">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hakkımızda özeti */}
      <section className="border-b border-line">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.7fr_1.2fr]">
          <div>
            <p className="eyebrow">Alevsan</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
              1971&apos;den Bugüne
              <br />
              Çeliğe İşlenen Sanat
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Alevsan Torna Sanayi ve Ticaret Ltd. Şti. olarak, 1971 yılından bu yana talaşlı imalat sektöründe edindiğimiz
              tecrübe ile teknik resme veya numuneye göre özel ölçü ve seri üretim metal parçalar üretmekteyiz.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Kalite, hassasiyet ve zamanında teslimat anlayışıyla farklı sektörlere yönelik özel bağlantı elemanları ve
              tornalanmış parçalar üretiyor, müşterilerimizin çözüm ortağı oluyoruz.
            </p>
            <Link href="/hakkimizda" className="btn-copper mt-8">
              Hakkımızda <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-1">
            {values.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 text-sm text-text/90">
                <Icon className="h-7 w-7 shrink-0 text-copper" strokeWidth={1.5} />
                {label}
              </li>
            ))}
          </ul>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/about-parts.webp" alt="Alevsan üretimi pirinç ve çelik parçalar" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Örnek üretimler */}
      <section className="border-b border-line">
        <div className="container-x py-20">
          <SectionHeading
            eyebrow="Ürünlerimiz"
            title="Örnek Üretimler"
            text="Farklı sektörlere yönelik, teknik resme veya numuneye göre ürettiğimiz özel metal parçalar."
            action={{ href: "/urunler", label: "Tüm Ürünlerimizi İnceleyin" }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <ImageCard key={p.title} {...p} href="/urunler" />
            ))}
          </div>
        </div>
      </section>

      {/* Makine parkı özeti */}
      <section className="border-b border-line">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-[0.8fr_2fr]">
          <div>
            <p className="eyebrow">Makine Parkımız</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight">Gelişmiş Teknoloji ile Yüksek Üretim Kabiliyeti</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Modern CNC torna ve otomat makinelerimiz ile farklı ölçü ve malzemelerde, yüksek hassasiyetli ve
              tekrarlanabilir üretimler gerçekleştiriyoruz.
            </p>
            <Link href="/makine-parki" className="btn-copper mt-8">
              Makine Parkımız <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeMachines.map((m) => (
              <ImageCard key={m.title} {...m} href="/makine-parki" aspect="aspect-square" titleSize="text-sm" />
            ))}
          </div>
        </div>
      </section>

      {/* Faaliyet alanları */}
      <section id="faaliyet-alanlari" className="scroll-mt-20">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-[0.8fr_2fr]">
          <div>
            <p className="eyebrow">Faaliyet Alanlarımız</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">Pek Çok Sektöre Özel Çözümler</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Otomotiv, beyaz eşya, hidrolik-pnömatik, makine imalatı ve daha birçok sektöre, özel bağlantı elemanları ve
              hassas tornalanmış parçalar üretiyoruz.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sectors.map((s) => {
              const Icon = sectorIcons[s.icon];
              return (
                <li key={s.title} className="card flex min-h-28 flex-col items-center justify-center gap-3 p-4 text-center text-sm transition hover:border-copper/60">
                  <Icon className="h-7 w-7 text-copper" strokeWidth={1.5} />
                  {s.title}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
