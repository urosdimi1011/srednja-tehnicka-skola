import axios from "axios";
import { profili as mockProfili, Profil } from "@/data/profili";

// ─────────────────────────────────────────────────────────────────────────────
// Prebaci na FALSE kada backend bude spreman
// ─────────────────────────────────────────────────────────────────────────────
const USE_MOCK = true;

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
  timeout: 8000,
});

// ─── getAllProfili ────────────────────────────────────────────────────────────
export async function getAllProfili(): Promise<Profil[]> {
  if (USE_MOCK) {
    return mockProfili;
  }

  const { data } = await http.get<Profil[]>("/profili");
  return data;
}

// ─── getProfilBySlug ─────────────────────────────────────────────────────────
export async function getProfilBySlug(slug: string): Promise<Profil> {
  if (USE_MOCK) {
    console.log(slug);
    const profil = mockProfili.find((p) => p.slug === slug);
    if (!profil) throw new Error(`Profil "${slug}" nije pronađen`);
    return profil;
  }

  const { data } = await http.get<Profil>(`/profili/${slug}`);
  return data;
}

// ─── getProfiliPreview ───────────────────────────────────────────────────────
export async function getProfiliPreview(limit = 6) {
  const profili = await getAllProfili();
  return profili.slice(0, limit);
}