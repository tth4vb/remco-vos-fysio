import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      images: content.seo.ogImage ? [{ url: content.seo.ogImage }] : undefined,
      locale: "nl_NL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: content.seo.ogImage ? [content.seo.ogImage] : undefined,
    },
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={dmSerif.variable}>
      <body>{children}</body>
    </html>
  );
}