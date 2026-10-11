import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CardBody } from "./CardBody";
import { ProductGallery } from "./ProductGallery";

export type IconItem = { icon: LucideIcon; label: string; text?: string };

/** Sayfa başı: solda başlık, sağda görsel (görsel solda koyu degrade ile metne karışır). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%]">
        <Image src={image} alt="" fill priority sizes="(min-width: 768px) 62vw, 100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink from-5% via-ink/50 via-30% to-transparent to-60%" />
        <div className="absolute inset-0 bg-ink/60 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>
      <div className="container-x py-20 md:py-28">
        <div className="max-w-2xl">
          {eyebrow ?<p className="eyebrow mb-4">{eyebrow}</p> : <span className="mb-6 block h-0.5 w-10 bg-copper" />}
          <h1 className="title-metal text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <div className="mt-5 text-lg text-text/90 sm:text-xl">{subtitle}</div>}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Başlık altındaki ikonlu kısa özellik satırı. */
export function IconRow({ items, circled = false }: { items: IconItem[]; circled?: boolean }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-y-6 sm:flex sm:flex-nowrap">
      {items.map(({ icon: Icon, label }, i) => (
        <li
          key={label}
          className={`flex flex-col items-center gap-3 px-3 text-center text-sm font-medium sm:px-5 ${
            i > 0 ? "sm:border-l sm:border-line" : "sm:pl-0"
          }`}
        >
          {circled ? (
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-copper/70 bg-ink/60">
              <Icon className="h-7 w-7 text-copper" strokeWidth={1.5} />
            </span>
          ) : (
            <Icon className="h-7 w-7 text-copper" strokeWidth={1.5} />
          )}
          <span className="max-w-28 leading-snug">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  action,
  line = false,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
  action?: { href: string; label: string };
  line?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {line && <span className="mb-5 block h-0.5 w-10 bg-copper" />}
        {eyebrow && (
          <p className="eyebrow flex items-center gap-4">
            {eyebrow}
            {!title && <span className="h-px w-14 bg-copper" />}
          </p>
        )}
        {title && <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>}
        {text && <p className="mt-4 text-muted">{text}</p>}
      </div>
      {action && (
        <Link href={action.href} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-copper hover:text-copper-light">
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Görselli kart: ürün, örnek üretim, makine. Birden fazla fotoğrafı varsa tıklanınca kaydırmalı görüntüleyici açılır. */
export function ImageCard({
  title,
  text,
  image,
  href,
  gallery,
  aspect = "aspect-[16/10]",
  titleSize = "text-lg",
}: {
  title: string;
  text: string;
  image: string;
  href?: string;
  gallery?: string[];
  aspect?: string;
  titleSize?: string;
}) {
  if (gallery && gallery.length > 1) {
    return <ProductGallery title={title} text={text} image={image} images={gallery} aspect={aspect} titleSize={titleSize} />;
  }
  const body = <CardBody title={title} text={text} image={image} aspect={aspect} titleSize={titleSize} showArrow={!!href} />;
  const cls = "card group flex flex-col overflow-hidden transition hover:border-copper/60";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Sayfa sonu teklif çağrısı: solda metin, sağda görsel. */
export function CtaBand({
  eyebrow,
  title,
  text,
  image,
  features,
  button = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text: string;
  image: string;
  features?: IconItem[];
  button?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[60%]">
        <Image src={image} alt="" fill sizes="60vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink from-5% via-ink/50 via-30% to-transparent to-60%" />
        <div className="absolute inset-0 bg-ink/60 md:hidden" />
      </div>
      <div className="container-x py-20">
        <div className="max-w-xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-text/85">{text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
            {button && (
              <Link href="/teklif-al" className="btn-copper">
                Teklif Al <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {features?.map(({ icon: Icon, label }) => (
              <span key={label} className="flex flex-col items-center gap-2 text-center text-xs font-medium">
                <Icon className="h-6 w-6 text-copper" strokeWidth={1.5} />
                <span className="max-w-24">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
