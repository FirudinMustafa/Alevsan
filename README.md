# Alevsan Torna – Web Sitesi

Next.js 16 (App Router) + Tailwind CSS 4. Tasarım: `../ALEVSAN_Web_Sitesi_Tasarim_Seti.pdf`.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
```

## Yapı

- `src/lib/site.ts` – firma bilgileri, menü, ürün/makine/sektör listeleri, form seçenekleri (içerik buradan düzenlenir)
- `src/components/` – Header, Footer, Logo (`public/brand/` – AlevsanLogo.jpeg kaynağından şeffaf PNG), SiteLoader (yükleme ekranı), ortak bölüm bileşenleri (`ui.tsx`)
- `src/app/*/page.tsx` – sayfalar: Ana Sayfa, Hakkımızda, Ürünler, Makine Parkı, Kalite, Teklif Al, İletişim, KVKK
- `src/app/teklif-al/actions.ts` – teklif formu (Server Action, doğrulama, Resend ile e-posta + dosya eki)
- `public/images/` – **geçici görseller**: PDF tasarımından kırpıldı, Real-ESRGAN (x4plus, 2 geçiş) ile büyütüldü; arka plan görselleri 3840 px, kartlar 1200–1920 px

## Teklif formu

`.env.example` dosyasını `.env.local` olarak kopyalayıp `RESEND_API_KEY` ve `QUOTE_TO_EMAIL` değerlerini girin.
Anahtar yokken geliştirme ortamında talepler sunucu konsoluna yazılır.

> Vercel'de fonksiyon istek gövdesi ~4.5 MB ile sınırlıdır. 20 MB'a kadar ek desteği için yayına almadan önce
> dosya yüklemesi Vercel Blob (istemci tarafı yükleme) gibi bir depolamaya taşınmalıdır.

## Yayın öncesi yapılacaklar

- [x] Gerçek logo – `public/brand/` (vektör/yüksek çözünürlüklü kaynak gelirse `scripts/extract-logo.mjs` yeniden çalıştırılır)
- [ ] Gerçek telefon, adres, e-posta, harita konumu – `src/lib/site.ts`
- [ ] Ürün ve makine fotoğraflarının gerçek/yüksek çözünürlüklü görsellerle değiştirilmesi – `public/images/`
- [ ] Makine sayıları, ürün kategorileri, malzeme ve teslim süresi listelerinin teyidi
- [ ] Kalite sayfası: sertifikalar ve ölçüm ekipmanları
- [ ] KVKK metninin hukuki onayı
- [ ] Resend alan adı doğrulaması ve büyük dosyalar için Blob yüklemesi
