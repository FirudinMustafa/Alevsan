import type { Metadata } from "next";
import {
  Award,
  ClipboardCheck,
  Crosshair,
  FileSearch,
  Microscope,
  PackageCheck,
  Ruler,
  ScanSearch,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { CtaBand, IconRow, PageHero, SectionHeading } from "@/components/ui";

// NOT: Bu sayfa PDF tasarım setinde yoktu; mevcut stile göre oluşturuldu.
// Sertifika ve ölçüm cihazı bilgileri firmadan alınıp güncellenmelidir.

export const metadata: Metadata = {
  title: "Kalite",
  description: "Hammadde girişinden sevkiyata kadar her aşamada ölçüm ve kontrol ile istikrarlı kalite.",
};

const process = [
  { icon: FileSearch, title: "Teknik İnceleme", text: "Teknik resim ve tolerans gereksinimleri üretim öncesi detaylı olarak değerlendirilir." },
  { icon: ClipboardCheck, title: "Hammadde Kontrolü", text: "Gelen malzemelerin sertifika ve ölçü kontrolleri yapılarak izlenebilirlik sağlanır." },
  { icon: Ruler, title: "İlk Parça Onayı", text: "Seri üretim öncesi ilk parça tüm ölçüleriyle kontrol edilip onaylanır." },
  { icon: ScanSearch, title: "Proses İçi Kontrol", text: "Üretim süresince periyodik ölçümlerle toleranslar sürekli takip edilir." },
  { icon: PackageCheck, title: "Final Kontrol", text: "Sevkiyat öncesi son kontrol ve uygun ambalajlama ile teslimata hazırlanır." },
  { icon: Truck, title: "Sevkiyat", text: "Planlanan termin süresine uygun, güvenli ve zamanında teslimat." },
];

const equipment = [
  "Dijital kumpas ve mikrometreler",
  "Mastar ve diş kontrol takımları",
  "Profil projeksiyon cihazı",
  "Yüzey pürüzlülük ölçümü",
  "Sertlik ölçüm cihazı",
  "Kalibrasyonlu ölçüm ekipmanları",
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        title="Kalite"
        image="/images/hero-machines.webp"
        subtitle="Hammadde girişinden sevkiyata kadar her aşamada ölçüm ve kontrol; dar toleranslarda istikrarlı kalite."
      >
        <IconRow
          items={[
            { icon: Crosshair, label: "Dar Tolerans" },
            { icon: Microscope, label: "Hassas Ölçüm" },
            { icon: ShieldCheck, label: "İzlenebilirlik" },
            { icon: Award, label: "Müşteri Memnuniyeti" },
          ]}
        />
      </PageHero>

      <section className="border-b border-line">
        <div className="container-x py-20">
          <SectionHeading
            line
            title="Kalite Kontrol Sürecimiz"
            text="Her parça, müşterimizin teknik gereksinimlerine tam uyum için tanımlı adımlardan geçer."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {process.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="card relative p-7 transition hover:border-copper/60">
                <span className="absolute top-5 right-6 font-display text-4xl font-bold text-line">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="h-8 w-8 text-copper" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading line title="Ölçüm ve Kontrol Ekipmanları" />
            <ul className="-mt-2 grid gap-3 sm:grid-cols-2">
              {equipment.map((e) => (
                <li key={e} className="card flex items-center gap-3 px-5 py-4 text-sm">
                  <Ruler className="h-4 w-4 shrink-0 text-copper" /> {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading line title="Belgelerimiz" />
            <div className="-mt-2 grid grid-cols-2 gap-4">
              {[1, 2].map((n) => (
                <div key={n} className="card flex aspect-[3/4] flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted">
                  <Award className="h-10 w-10 text-copper" strokeWidth={1.2} />
                  Sertifika görseli eklenecek
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Kaliteli Üretim İçin Teklif Alın"
        text="Teknik resminizi veya numunenizi gönderin, toleranslarınıza uygun üretim planını birlikte oluşturalım."
        image="/images/cta-parts.webp"
      />
    </>
  );
}
