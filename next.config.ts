import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Siteyi geliştirme sırasında yerel ağdaki cihazlardan (telefon vb.) açabilmek için
  allowedDevOrigins: ["192.168.1.199"],
  experimental: {
    serverActions: {
      // Teklif formundaki teknik resim eki (en fazla 20 MB) + multipart payı
      bodySizeLimit: "21mb",
    },
  },
};

export default nextConfig;
