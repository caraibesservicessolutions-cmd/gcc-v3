import type { MetadataRoute } from "next";
import { locales, routesV3 } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return locales.flatMap((locale) =>
    routesV3.map((route) => ({
      url: `${baseUrl}/${locale}${route === "/" ? "" : route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.7
    }))
  );
}
