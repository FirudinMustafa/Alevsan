"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-[0.8rem] font-medium transition-colors hover:text-copper ${
                isActive(item.href) ? "text-copper" : "text-text/90"
              }`}
            >
              {item.label}
              {isActive(item.href) && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded bg-copper" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/teklif-al" className="btn-copper hidden px-5 py-2.5 sm:inline-flex">
            Teklif Al <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="rounded-md border border-line p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line lg:hidden" aria-label="Mobil menü">
          <div className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line/50 py-3 text-sm font-medium ${isActive(item.href) ? "text-copper" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/teklif-al" className="btn-copper mt-4" onClick={() => setOpen(false)}>
              Teklif Al <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
