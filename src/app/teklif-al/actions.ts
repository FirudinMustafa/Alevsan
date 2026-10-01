"use server";

import { Resend } from "resend";
import { deliveryTimes, materials } from "@/lib/site";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
};

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXT = ["pdf", "dwg", "step", "stp", "dxf", "jpg", "jpeg", "png"];

const required = {
  name: "Ad Soyad",
  phone: "Telefon",
  email: "E-posta",
  product: "Ürün / Proje Adı",
  quantity: "Talep Edilen Adet",
  material: "Malzeme Türü",
  tolerance: "Ölçü / Tolerans",
  delivery: "Teslim Süresi",
} as const;

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Bot tuzağı: gerçek kullanıcılar bu alanı görmez
  if (formData.get("website")) return { status: "success", message: "Talebiniz alındı." };

  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const data = {
    name: get("name"),
    company: get("company"),
    phone: get("phone"),
    email: get("email"),
    product: get("product"),
    quantity: get("quantity"),
    material: get("material"),
    tolerance: get("tolerance"),
    delivery: get("delivery"),
    message: get("message"),
  };

  const errors: Record<string, string> = {};
  for (const [key, label] of Object.entries(required)) {
    if (!data[key as keyof typeof data]) errors[key] = `${label} zorunludur.`;
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Geçerli bir e-posta adresi girin.";
  if (data.phone && data.phone.replace(/\D/g, "").length < 10) errors.phone = "Geçerli bir telefon numarası girin.";
  if (data.material && !materials.includes(data.material)) errors.material = "Listeden bir malzeme seçin.";
  if (data.delivery && !deliveryTimes.includes(data.delivery)) errors.delivery = "Listeden bir teslim süresi seçin.";
  if (formData.get("kvkk") !== "on") errors.kvkk = "Devam etmek için KVKK metnini onaylamalısınız.";

  const file = formData.get("file");
  const hasFile = file instanceof File && file.size > 0;
  if (hasFile) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXT.includes(ext)) errors.file = "Desteklenmeyen dosya türü.";
    else if (file.size > MAX_FILE_BYTES) errors.file = "Dosya boyutu en fazla 20 MB olabilir.";
  }

  if (Object.keys(errors).length) {
    return { status: "error", message: "Lütfen işaretli alanları kontrol edin.", errors };
  }

  const rows = [
    ["Ad Soyad", data.name],
    ["Firma", data.company || "-"],
    ["Telefon", data.phone],
    ["E-posta", data.email],
    ["Ürün / Proje", data.product],
    ["Adet", data.quantity],
    ["Malzeme", data.material],
    ["Ölçü / Tolerans", data.tolerance],
    ["Teslim Süresi", data.delivery],
    ["Açıklama", data.message || "-"],
    ["Ek", hasFile ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : "Yok"],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[teklif] E-posta servisi yapılandırılmadı, talep konsola yazıldı:", Object.fromEntries(rows));
      return { status: "success", message: "Talebiniz alındı (geliştirme modu: e-posta gönderilmedi)." };
    }
    console.error("[teklif] RESEND_API_KEY veya QUOTE_TO_EMAIL eksik.");
    return { status: "error", message: "Talebiniz şu anda iletilemedi. Lütfen telefon veya e-posta ile bize ulaşın." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL ?? "Alevsan Web <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `Teklif Talebi: ${data.product} – ${data.company || data.name}`,
      html: `<h2>Yeni Teklif Talebi</h2><table cellpadding="6" style="border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="border:1px solid #ddd"><b>${k}</b></td><td style="border:1px solid #ddd">${escape(v).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table>`,
      attachments: hasFile ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }] : undefined,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[teklif] Gönderim hatası:", err);
    return { status: "error", message: "Talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin veya bizi arayın." };
  }

  return { status: "success", message: "Teşekkürler! Talebiniz alındı, en kısa sürede size dönüş yapacağız." };
}
