import type { Metadata } from "next";
import Image from "next/image";
import {
  Boxes,
  ChartNoAxesColumn,
  Crosshair,
  Handshake,
  Layers,
  MapPin,
  Mountain,
  Settings,
  ShieldCheck,
  Target,
  Truck,
} from "lucide-react";
import { IconRow, PageHero, SectionHeading } from "@/components/ui";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "1971'den bugüne hassas talaşlı imalat alanında sanayinin güvenilir çözüm ortağı Alevsan Torna'nın hikayesi, misyonu ve vizyonu.",
};

const timeline = [
  { icon: Settings, year: "1971", title: "Kuruluş", text: "Alevsan, talaşlı imalat alanında faaliyetlerine başladı." },
  { icon: Boxes, year: "1980'ler", title: "Ürün Çeşitliliği", text: "Farklı sektörlere yönelik ürün gamı genişledi." },
  { icon: ChartNoAxesColumn, year: "1990'lar", title: "Büyüme", text: "Üretim kapasitesi arttı, yeni müşteriler ve sektörlerle tanışıldı." },
  { icon: Settings, year: "2000'ler", title: "Modern Üretim", text: "Teknolojik yatırımlarla daha hassas ve verimli üretim süreçlerine geçildi." },
  { icon: MapPin, year: "Günümüz", title: "Dudullu / Sancaktepe", text: `İstanbul Dudullu / Sancaktepe bölgesindeki ${company.facilityArea} m² tesisimizde üretimimize devam ediyoruz.` },
];

const reasons = [
  { icon: Crosshair, title: "Yüksek Hassasiyet", text: "Mikron seviyesinde işleme hassasiyeti ile istikrarlı kalite.", image: "/images/why-1.webp" },
  { icon: Layers, title: "Seri Üretim", text: "Yüksek adetli üretimlerde istikrarlı kalite ve verimlilik.", image: "/images/why-2.webp" },
  { icon: Settings, title: "Özel İmalat", text: "Farklı sektörlere yönelik özel parça üretim kabiliyeti.", image: "/images/why-3-v2.webp" },
  { icon: Handshake, title: "Güvenilir İş Ortaklığı", text: "Uzun vadeli, sürdürülebilir ve güvene dayalı çözümler.", image: "/images/why-4.webp" },
  { icon: ShieldCheck, title: "Kalite Kontrol", text: "Her aşamada titiz kontrol süreçleri ve ölçüm garantisi.", image: "/images/why-5.webp" },
  { icon: Truck, title: "Zamanında Teslimat", text: "Planlı üretim ve güçlü operasyon yönetimi ile zamanında teslim.", image: "/images/why-6.webp" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Hakkımızda"
        image="/images/hero-about-v2.webp"
        subtitle="1971'den bugüne, hassas talaşlı imalat alanında sanayinin güvenilir çözüm ortağıyız."
      >
        <IconRow
          items={[
            { icon: Settings, label: "Deneyim ve Tecrübe" },
            { icon: Target, label: "Hassas Üretim" },
            { icon: Layers, label: "Geniş Ürün Çeşitliliği" },
            { icon: Handshake, label: "Güvenilir İş Ortaklığı" },
          ]}
        />
      </PageHero>

      {/* Hikaye */}
      <section className="border-b border-line">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading line title="Firmamızın Hikayesi" />
            <div className="-mt-4 space-y-5 text-sm leading-relaxed text-muted">
              <p>
                Alevsan Torna Sanayi ve Ticaret Ltd. Şti., 1971 yılında talaşlı imalat sektöründe faaliyet göstermek amacıyla
                kurulmuştur. Kurulduğumuz günden bu yana kaliteye, hassasiyete ve müşteri memnuniyetine odaklanarak sanayinin
                farklı sektörlerine güvenilir çözümler sunmaktayız.
              </p>
              <p>
                Yıllar içinde edindiğimiz tecrübe, sürekli gelişen üretim altyapımız ve deneyimli kadromuz ile hassas talaşlı
                imalat alanında geniş bir ürün yelpazesinde hizmet veriyoruz. Geleneksel üretim anlayışımızı modern
                teknolojilerle birleştirerek bugün de aynı kararlılıkla yolumuza devam ediyoruz.
              </p>
              <p>
                Alevsan olarak, değişen sanayi ihtiyaçlarını yakından takip ediyor, yatırımlarımızla üretim kabiliyetimizi
                sürekli geliştiriyor ve müşterilerimize her zaman yüksek kaliteli, güvenilir ve sürdürülebilir çözümler sunmayı
                hedefliyoruz.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/story-parts.webp" alt="Alevsan tarafından üretilen hassas parçalar" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Zaman çizelgesi */}
      <section className="border-b border-line">
        <div className="container-x py-20">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-5 block h-0.5 w-10 bg-copper" />
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Yolculuğumuz</h2>
            </div>
            <p className="text-muted">Tecrübemiz, bugünün üretim gücüne yön veriyor.</p>
          </div>
          <JourneyTimeline
            steps={timeline.map(({ icon: Icon, ...rest }) => ({ ...rest, icon: <Icon className="h-6 w-6 text-copper" strokeWidth={1.5} /> }))}
          />
        </div>
      </section>

      {/* Misyon / Vizyon */}
      <section className="grid border-b border-line md:grid-cols-2">
        {[
          {
            icon: Mountain,
            title: "Misyonumuz",
            image: "/images/mission.webp",
            text: "Sanayinin ihtiyaç duyduğu hassas talaşlı imalat çözümlerini, yüksek kalite anlayışı ve müşteri odaklı yaklaşımla sunmak; güvenilir, uzun vadeli iş ortaklıkları kurarak sektörlerimizin gelişimine katkı sağlamaktır.",
          },
          {
            icon: Target,
            title: "Vizyonumuz",
            image: "/images/vision.webp",
            text: "Talaşlı imalat alanında, kalite, teknoloji ve sürdürülebilir üretim anlayışımızla sektörde tercih edilen, yenilikçi ve güvenilir bir marka olmak; ulusal ve uluslararası arenada değer yaratan çözümler sunmaktır.",
          },
        ].map(({ icon: Icon, title, text, image }, i) => (
          <div key={title} className={`relative isolate overflow-hidden ${i === 0 ? "md:border-r md:border-line" : ""}`}>
            <div className="absolute inset-y-0 right-0 -z-10 w-1/2">
              <Image src={image} alt="" fill sizes="25vw" className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink to-ink/0" />
            </div>
            <div className="px-6 py-14 sm:px-10 lg:px-14">
              <div className="flex items-center gap-5">
                <Icon className="h-10 w-10 text-copper" strokeWidth={1.3} />
                <h2 className="font-display text-2xl font-bold">{title}</h2>
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-text/85">{text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Neden Alevsan */}
      <section className="border-b border-line">
        <div className="container-x py-20">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-5 block h-0.5 w-10 bg-copper" />
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Neden Alevsan?</h2>
            </div>
            <p className="text-muted">Yarım asrı aşan tecrübemizle, üretimde fark yaratıyoruz.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {reasons.map(({ icon: Icon, title, text, image }) => (
              <div key={title} className="card flex flex-col overflow-hidden">
                <div className="flex-1 p-5">
                  <Icon className="h-7 w-7 text-copper" strokeWidth={1.5} />
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{text}</p>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image src={image} alt="" fill sizes="(min-width: 1280px) 16vw, 50vw" className="object-cover" />
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-surface to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slogan bandı */}
      <section className="relative isolate overflow-hidden">
        <Image src="/images/quote-band.webp" alt="" fill sizes="100vw" className="-z-10 object-cover object-right opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="container-x py-20 text-center">
          <p className="font-display text-3xl font-semibold sm:text-4xl">“Çeliğe işlenen sanat.”</p>
          <p className="mt-4 text-text/85">Yarım asrı aşan tecrübemizle, sanayinin yanında.</p>
          <span className="mx-auto mt-6 block h-0.5 w-10 bg-copper" />
        </div>
      </section>
    </>
  );
}
