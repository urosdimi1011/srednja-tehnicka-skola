import Header from "./components/Header";
import Footer from "./components/Footer";
import { getSviProfili } from "@/services/profiliService";
import type { Metadata } from "next";

const BASE = "https://sts.edu.rs";
const OG_IMAGE = `${BASE}/files/img/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Srednja Tehnicka Skola Dositej Obradovic Beograd",
    template: "%s | STS Dositej Beograd",
  },
  description:
    "Srednja Tehnicka Skola Dositej Obradovic u Beogradu - kvalitetno tehnicko obrazovanje. Programi: elektrotehnika, masinstvo, gradjevinarstvo. Upis 2026/2027. Redovno i vanredno skolovanje.",
  keywords: [
    "srednja tehnicka skola beograd",
    "Dositej Obradovic skola",
    "tehnicko obrazovanje beograd",
    "upis u srednju skolu 2026",
    "elektrotehnicka skola beograd",
    "masinska skola beograd",
    "gradjevinska skola beograd",
    "vanredno skolovanje beograd",
    "tehnicke skole srbija",
  ],
  openGraph: {
    siteName: "STS Dositej Beograd",
    title: "Srednja Tehnicka Skola Dositej Obradovic Beograd",
    description:
      "Kvalitetno tehnicko obrazovanje u Beogradu - elektrotehnika, masinstvo, gradjevinarstvo.",
    type: "website",
    url: BASE,
    locale: "sr_RS",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Srednja Tehnicka Skola Dositej Obradovic Beograd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srednja Tehnicka Skola Dositej Obradovic Beograd",
    description:
      "Kvalitetno tehnicko obrazovanje u Beogradu - elektrotehnika, masinstvo, gradjevinarstvo.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/files/img/favicon.png",
    apple: "/files/img/favicon.png",
  },
  alternates: {
    canonical: BASE,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Srednja Tehnicka Skola Dositej Obradovic",
  alternateName: "STS Dositej",
  url: BASE,
  logo: `${BASE}/files/img/favicon.png`,
  image: OG_IMAGE,
  description:
    "Srednja Tehnicka Skola Dositej Obradovic u Beogradu nudi kvalitetno tehnicko obrazovanje u oblastima elektrotehnike, masinstva i gradjevinarstva.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beograd",
    addressCountry: "RS",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+381-11-323-55-00",
      contactType: "customer service",
      availableLanguage: "Serbian",
    },
    {
      "@type": "ContactPoint",
      telephone: "+381-64-812-96-95",
      contactType: "customer service",
      description: "Vanredno skolovanje",
      availableLanguage: "Serbian",
    },
  ],
  email: "srednjatehnickaskola@gmail.com",
  sameAs: [],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profili = await getSviProfili();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header obrazovniProfili={profili} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
