import Image from "next/image";
import Link from "next/link";
import { GearEmblem } from "./GearEmblem";

// Logo parçaları ../AlevsanLogo.jpeg kaynağından şeffaf olarak çıkarıldı
// (bkz. scripts/extract-logo.mjs). Menüdeki amblem vektör dişlilerle canlandırılır (GearEmblem).
export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Alevsan – Ana Sayfa">
      <GearEmblem mode="nav" className="h-12 w-auto" />
      <span className="flex flex-col leading-none">
        <Image src="/brand/alevsan-wordmark.png" alt="Alevsan" width={971} height={129} priority className="h-[22px] w-auto" />
        <span className="mt-1.5 block text-[0.52rem] font-medium tracking-[0.16em] text-muted">TORNA SANAYİ VE TİCARET LTD. ŞTİ.</span>
      </span>
    </Link>
  );
}

export function LogoFull({ className = "w-56" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Alevsan – Ana Sayfa" className="inline-block">
      <Image src="/brand/alevsan-logo.png" alt="Alevsan Torna Sanayi ve Ticaret Ltd. Şti. – Çeliğe işlenen sanat" width={971} height={905} className={`h-auto ${className}`} />
    </Link>
  );
}
