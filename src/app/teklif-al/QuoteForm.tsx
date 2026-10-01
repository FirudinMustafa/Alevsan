"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Box,
  FileText,
  Layers,
  Lock,
  Mail,
  Paperclip,
  Phone,
  Ruler,
  Shapes,
  Upload,
  User,
} from "lucide-react";
import { submitQuote, type QuoteState } from "./actions";
import { deliveryTimes, materials } from "@/lib/site";

const MAX_MB = 20;
const initial: QuoteState = { status: "idle" };

function Field({
  icon: Icon,
  error,
  children,
  className = "",
}: {
  icon: LucideIcon;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.6} />
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuote, initial);
  const [fileInfo, setFileInfo] = useState<{ name: string; tooBig: boolean } | null>(null);
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <CircleCheck className="h-14 w-14 text-copper" strokeWidth={1.3} />
        <h3 className="mt-5 font-display text-2xl font-bold">Talebiniz Alındı</h3>
        <p className="mt-3 max-w-md text-muted">{state.message}</p>
        <a href="/teklif-al" className="btn-outline mt-8">
          Yeni Talep Oluştur
        </a>
      </div>
    );
  }

  // Form, action prop'u yerine onSubmit ile gönderiliyor; böylece hata durumunda
  // React girilen değerleri sıfırlamıyor.
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (fileInfo?.tooBig) return;
    const fd = new FormData(ev.currentTarget);
    startTransition(() => formAction(fd));
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={User} error={e.name}>
          <input name="name" required autoComplete="name" placeholder="Ad Soyad *" className="field" aria-label="Ad Soyad" />
        </Field>
        <Field icon={Building2}>
          <input name="company" autoComplete="organization" placeholder="Firma Adı" className="field" aria-label="Firma Adı" />
        </Field>
        <Field icon={Phone} error={e.phone}>
          <input name="phone" type="tel" required autoComplete="tel" placeholder="Telefon *" className="field" aria-label="Telefon" />
        </Field>
        <Field icon={Mail} error={e.email}>
          <input name="email" type="email" required autoComplete="email" placeholder="E-posta *" className="field" aria-label="E-posta" />
        </Field>
      </div>

      <Field icon={Box} error={e.product}>
        <input name="product" required placeholder="Ürün / Proje Adı *" className="field" aria-label="Ürün / Proje Adı" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={Layers} error={e.quantity}>
          <input name="quantity" required inputMode="numeric" placeholder="Talep Edilen Adet *" className="field" aria-label="Talep Edilen Adet" />
        </Field>
        <Field icon={Shapes} error={e.material}>
          <select name="material" required defaultValue="" className="field appearance-none pr-10 invalid:text-muted/70" aria-label="Malzeme Türü">
            <option value="" disabled>
              Malzeme Türü * – Seçiniz
            </option>
            {materials.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted" />
        </Field>
        <Field icon={Ruler} error={e.tolerance}>
          <input name="tolerance" required placeholder="Ölçü / Tolerans * – Örn: Ø20 ±0.01" className="field" aria-label="Ölçü / Tolerans" />
        </Field>
        <Field icon={CalendarDays} error={e.delivery}>
          <select name="delivery" required defaultValue="" className="field appearance-none pr-10 invalid:text-muted/70" aria-label="Teslim Süresi">
            <option value="" disabled>
              Teslim Süresi * – Seçiniz
            </option>
            {deliveryTimes.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted" />
        </Field>
      </div>

      <div className="relative">
        <FileText className="pointer-events-none absolute top-4 left-4 h-4 w-4 text-muted" strokeWidth={1.6} />
        <textarea name="message" rows={4} placeholder="Açıklama – Projeniz hakkında detayları paylaşın..." className="field resize-y" aria-label="Açıklama" />
      </div>

      <div className="rounded-lg border border-dashed border-copper/70 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <Paperclip className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
            <div>
              <p className="text-sm font-semibold">Teknik Resim / Numune / Dosya Yükleme</p>
              <p className="mt-1 text-xs text-muted">PDF, DWG, STEP, DXF, JPG, PNG formatlarında dosya yükleyebilirsiniz. Maksimum dosya boyutu: {MAX_MB} MB</p>
              {fileInfo && (
                <p className={`mt-2 text-xs ${fileInfo.tooBig ? "text-red-400" : "text-copper"}`}>
                  {fileInfo.name}
                  {fileInfo.tooBig && ` – dosya ${MAX_MB} MB sınırını aşıyor`}
                </p>
              )}
              {e.file && <p className="mt-2 text-xs text-red-400">{e.file}</p>}
            </div>
          </div>
          <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md border border-line bg-ink-2 px-5 py-3 text-sm font-medium transition hover:border-copper">
            <Upload className="h-4 w-4 text-copper" /> Dosya Seçin
            <input
              type="file"
              name="file"
              accept=".pdf,.dwg,.step,.stp,.dxf,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={(ev) => {
                const f = ev.target.files?.[0];
                setFileInfo(f ? { name: f.name, tooBig: f.size > MAX_MB * 1024 * 1024 } : null);
              }}
            />
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-start gap-3 text-xs text-muted">
          <input type="checkbox" name="kvkk" className="mt-0.5 h-4 w-4 accent-copper" />
          <span>
            <Link href="/kvkk" target="_blank" className="text-copper underline-offset-2 hover:underline">
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum, kişisel verilerimin teklif süreci kapsamında işlenmesini kabul ediyorum. *
          </span>
        </label>
        {e.kvkk && <p className="mt-1.5 text-xs text-red-400">{e.kvkk}</p>}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-copper w-full py-4 text-base disabled:opacity-60">
        {pending ? "Gönderiliyor..." : "Teklif Talebi Gönder"} <ArrowRight className="h-4 w-4" />
      </button>
      <p className="flex items-center justify-center gap-2 text-xs text-muted">
        <Lock className="h-3.5 w-3.5" /> Tüm bilgileriniz gizli tutulur ve yalnızca teklif süreci için kullanılır.
      </p>
    </form>
  );
}
