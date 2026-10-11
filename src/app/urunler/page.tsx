import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, FileCog, Gem, Layers, Settings, ShieldCheck } from "lucide-react";
import { IconRow, ImageCard, PageHero, SectionHeading } from "@/components/ui";
import { productCategories, sampleWorks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Perçin somunlar, pirinç insertler, somunlar, rekorlar, tornalanmış parçalar, özel bağlantı elemanları ve CNC özel parçalar. Teknik resme ve numuneye göre üretim.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Üretimler"
        image="/images/hero-products.webp"
        subtitle={
          <>
            <p className="text-xl sm:text-2xl">Hassas bağlantı ve özel üretim parçalar</p>
            <p className="mt-4 text-base text-muted">
              Alevsan Torna Sanayi ve Ticaret Ltd. Şti. olarak, farklı sektörlerin ihtiyaçlarına yönelik hassas bağlantı
              elemanları ve özel üretim parçalar üretiyoruz.
            </p>
          </>
        }
      >
        <IconRow
          items={[
            { icon: Gem, label: "Yüksek Hassasiyet" },
            { icon: Settings, label: "Kaliteli Üretim" },
            { icon: Layers, label: "Geniş Ürün Çeşitliliği" },
            { icon: ShieldCheck, label: "Özel Taleplere Uygun Üretim" },
          ]}
        />
      </PageHero>

      <section id="kategoriler" className="scroll-mt-20 border-b border-line">
        <div className="container-x py-20">
          <SectionHeading eyebrow="Ürün Kategorileri" action={{ href: "/teklif-al", label: "Ürününüz için teklif alın" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((c) => (
              <ImageCard key={c.slug} title={c.title} text={c.text} image={c.image} gallery={c.gallery} href="/teklif-al" aspect="aspect-[4/3]" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-x py-20">
          <SectionHeading eyebrow="Örnek Üretimler" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {sampleWorks.map((s) => (
              <ImageCard key={s.title} {...s} titleSize="text-sm" />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[55%]">
          <Image src="/images/technical.webp" alt="" fill sizes="55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink from-5% via-ink/50 via-30% to-transparent to-60%" />
        <div className="absolute inset-0 bg-ink/60 md:hidden" />
        </div>
        <div className="container-x py-20">
          <div className="max-w-xl">
            <h2 className="title-metal text-3xl sm:text-4xl">Teknik Resme Göre Üretim</h2>
            <p className="mt-3 text-xl">İhtiyacınıza Özel Çözümler</p>
            <p className="mt-5 text-text/85">
              Teknik resim, numune veya özel ölçü taleplerinize göre hassas bağlantı elemanları ve özel parçalar üretiyoruz.
              CNC teknolojimiz ve tecrübemizle, yüksek kalite standartlarında, sektörünüze özel çözümler sunuyoruz.
            </p>
            <IconRow
              items={[
                { icon: FileCog, label: "Teknik Resme Göre Üretim" },
                { icon: Box, label: "Numuneye Göre Üretim" },
                { icon: Settings, label: "Özel Ölçülere Göre Üretim" },
              ]}
            />
            <Link href="/teklif-al" className="btn-copper mt-10">
              Teklif Talebi Oluşturun <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
