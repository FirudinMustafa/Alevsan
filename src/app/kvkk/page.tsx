import type { Metadata } from "next";
import { company } from "@/lib/site";

// NOT: Taslak metindir; yayın öncesi firmanın hukuk danışmanı tarafından onaylanmalıdır.

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  robots: { index: false },
};

export default function KvkkPage() {
  return (
    <section className="container-x max-w-3xl py-20">
      <span className="mb-5 block h-0.5 w-10 bg-copper" />
      <h1 className="font-display text-3xl font-bold sm:text-4xl">KVKK Aydınlatma Metni</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-text/85">
        <p>
          {company.legalName} (“Şirket”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri
          sorumlusu sıfatıyla, web sitemiz üzerinden ilettiğiniz kişisel verilerinizi aşağıda açıklanan çerçevede
          işlemekteyiz.
        </p>
        <h2 className="pt-2 font-display text-lg font-semibold text-text">İşlenen Kişisel Veriler</h2>
        <p>Ad soyad, firma adı, telefon numarası, e-posta adresi ve teklif talebi kapsamında paylaştığınız teknik bilgi ve dosyalar.</p>
        <h2 className="pt-2 font-display text-lg font-semibold text-text">İşleme Amaçları</h2>
        <p>Teklif taleplerinizin değerlendirilmesi, size teklif sunulması, iletişim faaliyetlerinin yürütülmesi ve sözleşme süreçlerinin hazırlanması.</p>
        <h2 className="pt-2 font-display text-lg font-semibold text-text">Hukuki Sebep ve Aktarım</h2>
        <p>
          Verileriniz KVKK m.5/2-(c) “sözleşmenin kurulması” ve açık rızanız hukuki sebeplerine dayanılarak işlenir; yasal
          zorunluluklar dışında üçüncü kişilerle paylaşılmaz. E-posta altyapısı için hizmet sağlayıcılardan yararlanılabilir.
        </p>
        <h2 className="pt-2 font-display text-lg font-semibold text-text">Haklarınız</h2>
        <p>
          KVKK m.11 kapsamındaki haklarınıza ilişkin taleplerinizi <a href={`mailto:${company.email}`} className="text-copper">{company.email}</a>{" "}
          adresine iletebilirsiniz.
        </p>
      </div>
    </section>
  );
}
