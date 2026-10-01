import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteLoader } from "@/components/SiteLoader";
import { company } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Alevsan Torna | Hassas Talaşlı İmalat ve Özel Bağlantı Elemanları",
    template: "%s | Alevsan Torna",
  },
  description:
    "Alevsan Torna Sanayi ve Ticaret Ltd. Şti. – 1971'den bugüne teknik resme veya numuneye göre özel ölçü ve seri üretim metal parçalar, perçin somun, pirinç insert, rekor ve CNC tornalanmış parçalar.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Alevsan Torna",
    images: ["/images/hero-home.webp"],
  },
};

// ?loader parametresi ile ekran tekrar gösterilebilir (test için)
const loaderScript = `try{if(!/[?&]loader/.test(location.search)&&sessionStorage.getItem("alevsan-loader"))document.documentElement.classList.add("loader-seen");else sessionStorage.setItem("alevsan-loader","1")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Yükleme ekranı oturum başına bir kez gösterilir */}
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <SiteLoader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
