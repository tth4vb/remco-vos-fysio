import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Remco Vos Fysio | Sport massage en medische taping voor hardlopers",
  description:
    "Professionele sportmassage en medische taping voor hardlopers in Harderwijk. Kinesio Taping, Deep tissue massage, Trigger point massage.",
  keywords: [
    "sportmassage",
    "fysiotherapie",
    "hardlopers",
    "kinesio taping",
    "Harderwijk",
    "Remco Vos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${cormorant.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
