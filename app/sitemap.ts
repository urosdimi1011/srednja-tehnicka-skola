import { MetadataRoute } from "next";
import { prisma } from "@/api/prisma";

const BASE = "https://sts.edu.rs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [profili, smerovi, albumi, obavestenja] = await Promise.all([
    prisma.obrazovniProfil.findMany({
      select: { slug: true, updatedAt: true },
    }),
    prisma.smer.findMany({
      select: {
        slug: true,
        updatedAt: true,
        obrazovniProfil: { select: { slug: true } },
      },
    }),
    prisma.galerijaAlbum.findMany({
      where: { vidljiv: true },
      select: { id: true, updatedAt: true },
    }),
    prisma.obavestenje.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                            lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/obrazovni-profili`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/upis`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/skolovanje`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/obavestenja`,           lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/galerija`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/kontakt`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/misija-i-vizija`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/dokumentacija`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const profilPages: MetadataRoute.Sitemap = profili.map((p) => ({
    url: `${BASE}/obrazovni-profili/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const smerPages: MetadataRoute.Sitemap = smerovi.map((s) => ({
    url: `${BASE}/obrazovni-profili/${s.obrazovniProfil.slug}/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const albumPages: MetadataRoute.Sitemap = albumi.map((a) => ({
    url: `${BASE}/galerija/${a.id}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const obavestenjaPages: MetadataRoute.Sitemap = obavestenja.map((o) => ({
    url: `${BASE}/obavestenja/${o.id}`,
    lastModified: o.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...profilPages,
    ...smerPages,
    ...albumPages,
    ...obavestenjaPages,
  ];
}
