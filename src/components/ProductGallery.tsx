"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { CardBody } from "./CardBody";

/**
 * Birden fazla fotoğrafı olan ürün kartı: tıklanınca fotoğraflar tam ekran, kaydırmalı görüntüleyicide açılır.
 * Kaydırma CSS scroll-snap ile yapılır (telefonda parmakla, masaüstünde oklar/klavye/küçük resimler).
 */
export function ProductGallery({
  title,
  text,
  image,
  images,
  aspect,
  titleSize,
}: {
  title: string;
  text: string;
  image: string;
  images: string[];
  aspect: string;
  titleSize: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number, smooth = true) => {
    const el = track.current;
    if (!el) return;
    const n = (i + images.length) % images.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: smooth ? "smooth" : "instant" });
    setIndex(n);
  }, [images.length]);

  const open = () => {
    dialog.current?.showModal();
    setIndex(0);
    // Dialog açıldıktan sonra genişlik belli olur
    requestAnimationFrame(() => goTo(0, false));
  };

  // Parmakla/tekerlekle kaydırınca hangi fotoğrafta olunduğunu güncelle
  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    d.addEventListener("keydown", onKey);
    return () => d.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="card group flex w-full flex-col overflow-hidden text-left transition hover:border-copper/60"
        aria-label={`${title} – ${images.length} fotoğrafı görüntüle`}
      >
        <CardBody title={title} text={text} image={image} aspect={aspect} titleSize={titleSize} showArrow photoCount={images.length} />
      </button>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="product-gallery m-auto h-[100svh] max-h-none w-screen max-w-none bg-transparent p-0 text-text"
        aria-label={title}
      >
        <div className="flex h-full flex-col gap-4 p-4 sm:p-8">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg font-semibold">{title}</p>
              <p className="text-xs text-muted">
                {index + 1} / {images.length}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/teklif-al" className="btn-copper hidden !px-4 !py-2 sm:inline-flex">
                Teklif Al <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-copper hover:text-copper"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-6xl min-h-0 flex-1">
            <div
              ref={track}
              onScroll={onScroll}
              className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {images.map((src, i) => (
                <div key={src} className="relative h-full w-full shrink-0 snap-center">
                  <Image src={src} alt={`${title} ${i + 1}`} fill sizes="90vw" className="object-contain" />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-text backdrop-blur transition hover:text-copper"
              aria-label="Önceki fotoğraf"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-text backdrop-blur transition hover:text-copper"
              aria-label="Sonraki fotoğraf"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-16 sm:w-16 ${
                  i === index ? "border-copper" : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`${i + 1}. fotoğraf`}
                aria-current={i === index}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
          <Link href="/teklif-al" className="btn-copper sm:hidden">
            Teklif Al <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </dialog>
    </>
  );
}
