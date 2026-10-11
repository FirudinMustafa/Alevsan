import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui";
import { company } from "@/lib/site";

// NOT: Bu sayfa PDF tasarım setinde yoktu; mevcut stile göre oluşturuldu.

export const metadata: Metadata = {
  title: "İletişim",
  description: "Alevsan Torna iletişim bilgileri, adres ve yol tarifi.",
};

const items: { icon: LucideIcon; title: string; value: string; href?: string }[] = [
  { icon: Phone, title: "Telefon", value: company.phone, href: company.phoneHref },
  { icon: MessageCircle, title: "WhatsApp", value: company.whatsapp, href: company.whatsappHref },
  { icon: Mail, title: "E-posta", value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, title: "Adres", value: company.address },
  { icon: Clock, title: "Çalışma Saatleri", value: company.workingHours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="İletişim"
        image="/images/hero-about-v2.webp"
        subtitle="Projeleriniz, teklif talepleriniz ve tüm sorularınız için bize ulaşın."
      />

      <section className="container-x grid gap-6 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {items.map(({ icon: Icon, title, value, href }) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-copper/60">
                  <Icon className="h-5 w-5 text-copper" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-xs tracking-wider text-muted uppercase">{title}</span>
                  <span className="mt-1 block text-sm font-medium">{value}</span>
                </span>
              </>
            );
            const cls = "card flex items-center gap-4 p-5 transition hover:border-copper/60";
            return href ? (
              <a key={title} href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={title} className={cls}>
                {inner}
              </div>
            );
          })}
          <Link href="/teklif-al" className="btn-copper w-full py-4">
            Teklif Talebi Oluştur <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="card min-h-[420px] overflow-hidden">
          <iframe
            title="Alevsan konum haritası"
            src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
            className="h-full min-h-[420px] w-full grayscale invert-[0.9] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
