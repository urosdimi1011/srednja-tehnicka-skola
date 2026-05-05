import "@/app/globals.css";
import { DM_Serif_Display, Outfit } from "next/font/google";
import ProgressBar from "./components/ProgressBar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${outfit.variable} ${dmSerif.variable}`}>
      <body className="font-sans">
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
