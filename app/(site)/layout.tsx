import Header from "./components/Header";
import Footer from "./components/Footer";
import { getSviProfili } from "@/services/profiliService";

export const metadata = {
  title: {
    default: "Srednja Tehnička Škola Beograd | Tehničko obrazovanje",
    template: "%s | Srednja Tehnička Škola Beograd",
  },
  description:
    "Srednja Tehnička Škola u Beogradu - kvalitetno tehničko obrazovanje. Programi: elektrotehnika, mašinstvo, građevinarstvo. Upis 2026/2027. Redovno i vanredno školovanje.",
  keywords: [
    "srednja tehnička škola beograd",
    "tehničko obrazovanje",
    "upis u srednju školu 2026",
    "elektrotehnička škola",
    "mašinska škola beograd",
    "tehničke škole srbija",
  ],
  openGraph: {
    title: "Srednja Tehnička Škola Beograd",
    description: "Kvalitetno tehničko obrazovanje u Beogradu",
    type: "website",
  },
  icons: {
    icon: "/files/img/favicon.png",
    apple: "/files/img/favicon.png",
  },
};
export default async function RootLayout({ children }: any) {
  const profili = await getSviProfili();

  return (
    <>
      <Header obrazovniProfili={profili} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
