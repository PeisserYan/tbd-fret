import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tbd-fret.com";

  return [
    {
      url: `${base}/`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/france-italie`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/transport-turin`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/recrutement`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/mentions-legales`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/politique-de-confidentialite`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
