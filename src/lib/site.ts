// Firma bilgileri ve site içeriği.
// NOT: Adres logodan alındı. Makine sayıları ve listeler tasarımdan alınmış yer tutuculardır;
// yayın öncesi firmadan teyit edilmelidir.

export const company = {
  name: "Alevsan",
  legalName: "Alevsan Torna Sanayi ve Ticaret Ltd. Şti.",
  slogan: "Çeliğe işlenen sanat.",
  founded: 1971,
  facilityArea: 800, // m²
  phone: "0216 471 00 06",
  phoneHref: "tel:+902164710006",
  whatsapp: "+90 535 637 37 37",
  whatsappHref: "https://wa.me/905356373737",
  email: "alevsancncotomat@hotmail.com",
  address: "Meclis Mah. Teraziler Cad. Perpim Sanayi Sitesi No:31/B-11, Sancaktepe / İstanbul",
  mapQuery: "Perpim Sanayi Sitesi, Teraziler Cad., Meclis Mah., Sancaktepe, İstanbul",
  workingHours: "Pazartesi – Cuma: 08:00 – 18:00 · Cumartesi: 08:00 – 13:00",
  siteUrl: "https://www.alevsan.com.tr",
};

export const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/makine-parki", label: "Makine Parkı" },
  { href: "/kalite", label: "Kalite" },
  { href: "/teklif-al", label: "Teklif Al" },
  { href: "/iletisim", label: "İletişim" },
] as const;

// Birden fazla fotoğrafı olan ürünler: kartına tıklanınca kaydırmalı görüntüleyicide açılır (ProductGallery)
const gallery = (name: string, count: number) => Array.from({ length: count }, (_, i) => `/images/gallery/${name}-${i + 1}.webp`);
export const galleries = {
  pirincInsert: gallery("pirinc-insert", 4),
  rekor: gallery("rekor", 4),
  percinSomun: gallery("percin-somun", 2),
  tornalanmis: gallery("tornalanmis", 2),
  ozelSomun: gallery("ozel-somun", 3),
  ozelBaglanti: gallery("ozel-baglanti", 4),
};

export const productCategories = [
  { slug: "percin-somunlar", title: "Perçin Somunlar", text: "Farklı ölçü ve malzemelerde perçin somun üretimi.", image: "/images/cat-percin-somun.webp", gallery: galleries.percinSomun },
  { slug: "pirinc-insertler", title: "Pirinç Insertler", text: "Yüksek mukavemetli pirinç insert çözümleri.", image: "/images/cat-pirinc-insert-v2.webp", gallery: galleries.pirincInsert },
  { slug: "somunlar", title: "Somunlar", text: "Standart ve özel somun üretimi.", image: "/images/cat-somun-v2.webp", gallery: [...galleries.ozelSomun, galleries.rekor[3]] },
  { slug: "rekorlar", title: "Rekorlar", text: "Çeşitli bağlantı rekorları ve özel üretimler.", image: "/images/cat-rekor-v2.webp", gallery: galleries.rekor },
  { slug: "tornalanmis-parcalar", title: "Tornalanmış Parçalar", text: "Hassas CNC tornalama ile özel parça üretimi.", image: "/images/cat-tornalanmis.webp", gallery: galleries.tornalanmis },
  { slug: "ozel-baglanti-elemanlari", title: "Özel Bağlantı Elemanları", text: "Farklı sektörlere yönelik özel bağlantı çözümleri.", image: "/images/cat-ozel-baglanti-v2.webp", gallery: galleries.ozelBaglanti },
  { slug: "cnc-ozel-parcalar", title: "CNC Özel Parçalar", text: "Teknik resme göre hassas CNC işleme.", image: "/images/cat-cnc-ozel.webp" },
  { slug: "diger-ozel-uretimler", title: "Diğer Özel Üretimler", text: "İhtiyacınıza yönelik özel parça üretimleri.", image: "/images/cat-diger-v2.webp" },
];

export const featuredProducts = [
  { title: "Perçin Somunlar", text: "Farklı ölçü ve formlarda özel üretim.", image: "/images/prod-percin-somun-v2.webp", gallery: galleries.percinSomun },
  { title: "Özel Somunlar", text: "Standart dışı ölçülerde somun imalatı.", image: "/images/prod-ozel-somun-v2.webp", gallery: galleries.ozelSomun },
  { title: "Bağlantı Rekorları", text: "Hidrolik ve pnömatik bağlantı elemanları.", image: "/images/prod-rekor-v3.webp", gallery: galleries.rekor },
  { title: "Özel Tornalanmış Parçalar", text: "Numuneye veya teknik resme göre hassas imalat.", image: "/images/prod-tornalanmis-v2.webp", gallery: galleries.tornalanmis },
];

export const sampleWorks = [
  { title: "Perçin Somun Çeşitleri", text: "Farklı ölçü ve formlar", image: "/images/sample-1-v2.webp", gallery: galleries.percinSomun },
  { title: "Pirinç Insert Uygulamaları", text: "Yüksek tutunma performansı", image: "/images/sample-2-v2.webp", gallery: galleries.pirincInsert },
  { title: "Tornalanmış Özel Parça", text: "Hassas toleranslarda üretim", image: "/images/sample-3.webp" },
  { title: "CNC Özel Üretimler", text: "Teknik resme özel çözümler", image: "/images/sample-4.webp" },
  { title: "Rekor ve Bağlantı Elemanları", text: "Farklı sektörler için üretim", image: "/images/sample-5-v3.webp", gallery: galleries.rekor },
];

export const machines = [
  {
    title: "CNC Otomatlar",
    count: 7,
    countLabel: "CNC Otomat",
    image: "/images/m-cnc-otomat-v2.webp",
    points: ["Yüksek hassasiyetli seri üretim", "Karmaşık geometrilerde çözüm", "Dar toleranslarda stabil üretim"],
  },
  {
    title: "CNC Kayar Makine",
    count: 3,
    countLabel: "CNC Kayar Makine",
    image: "/images/m-cnc-kayar-v2.webp",
    points: ["Küçük ve hassas parçalar için ideal", "Yüksek hassasiyetli işleme", "Seri üretime uygun esnek yapı"],
  },
  {
    title: "İndeks Otomatlar",
    count: 55,
    countLabel: "İndeks Otomat",
    image: "/images/m-indeks-v2.webp",
    points: ["Çok eksenli işleme kabiliyeti", "Yüksek üretim hızı", "Karmaşık parçalar için ideal çözüm"],
  },
  {
    title: "6 Milli Otomatlar",
    count: 5,
    countLabel: "6 Milli Otomat",
    image: "/images/m-6milli-v2.webp",
    points: ["Aynı anda çoklu işleme", "Yüksek hız ve verimlilik", "Orta ve yüksek hacimli seri üretim"],
  },
  {
    title: "Transfer Makineleri",
    count: 5,
    countLabel: "Transfer Makinesi",
    image: "/images/m-transfer-v2.webp",
    points: ["Yüksek adetli seri üretim", "Otomatik ve kesintisiz üretim", "Maksimum verimlilik ve tutarlılık"],
  },
];

export const homeMachines = [
  { title: "CNC Otomatlar", text: "Yüksek hassasiyette seri üretim.", image: "/images/mach-cnc-torna-v2.webp" },
  { title: "CNC Kayar Otomatlar", text: "Küçük çaplı hassas parçalar.", image: "/images/mach-cnc-kayar-v2.webp" },
  { title: "İndeks Otomatlar", text: "Kompleks parça imalatı.", image: "/images/mach-isleme-v2.webp" },
  { title: "Transfer Makineleri", text: "Yüksek adetli üretim.", image: "/images/mach-transfer-v2.webp" },
];

export const sectors = [
  { icon: "Car", title: "Otomotiv Sanayi" },
  { icon: "Cog", title: "Makine İmalatı" },
  { icon: "Factory", title: "Endüstriyel Ekipmanlar" },
  { icon: "Gauge", title: "Hidrolik & Pnömatik Sistemler" },
  { icon: "WashingMachine", title: "Beyaz Eşya Sanayi" },
  { icon: "Zap", title: "Elektrik & Elektronik" },
  { icon: "Tractor", title: "Tarım Makineleri" },
  { icon: "HardHat", title: "Özel Projeler ve Diğer Sektörler" },
] as const;

export const materials = ["Otomat Çeliği", "Paslanmaz Çelik", "Pirinç", "Alüminyum", "Bakır", "Karbon Çeliği", "Diğer / Belirtilecek"];
export const deliveryTimes = ["Acil (1 hafta içinde)", "2 – 3 hafta", "1 ay", "1 aydan uzun", "Esnek"];
