import type { MetadataRoute } from "next";
import { company, nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: `${company.siteUrl}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
