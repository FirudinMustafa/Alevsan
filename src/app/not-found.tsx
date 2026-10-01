import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-32 text-center">
      <p className="text-copper-grad font-display text-7xl font-bold">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Sayfa bulunamadı</h1>
      <p className="mt-3 text-muted">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
      <Link href="/" className="btn-copper mt-8">
        Ana Sayfaya Dön <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
