import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { LogoFull } from "./Logo";
import { company, nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.5fr]">
        <div>
          <LogoFull className="w-60" />
          <p className="mt-5 max-w-xs text-sm text-muted">{company.founded}&apos;den bu yana hassas talaşlı imalat ve özel bağlantı elemanları.</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Hızlı Erişim</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-copper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">İletişim</h3>
          <ul className="mt-4 space-y-4 text-sm text-muted">
            <li>
              <a href={company.phoneHref} className="flex items-center gap-3 transition hover:text-copper">
                <Phone className="h-4 w-4 shrink-0 text-copper" /> {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 transition hover:text-copper">
                <Mail className="h-4 w-4 shrink-0 text-copper" /> {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" /> {company.address}
            </li>
          </ul>
        </div>

        <div className="card p-6">
          <p className="eyebrow tracking-[0.2em]">Projeniz İçin</p>
          <h3 className="mt-2 font-display text-xl font-bold">Hemen Teklif Alın</h3>
          <p className="mt-2 text-sm text-muted">Teknik resim, numune veya özel talepleriniz için bizimle iletişime geçin.</p>
          <Link href="/teklif-al" className="btn-copper mt-5 w-full">
            <MessageSquare className="h-4 w-4" /> Teklif Al <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName} Tüm hakları saklıdır.</p>
          <Link href="/kvkk" className="hover:text-copper">
            KVKK Aydınlatma Metni
          </Link>
        </div>
      </div>
    </footer>
  );
}
