import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import ContactFaqSection from "@/components/ContactFaqSection";
import Footer from "@/components/Footer";

// Force dynamic to always read fresh content
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = getContent();

  return (
    <>
      <Header settings={content.siteSettings} />
      <main>
        <Hero data={content.hero} />
        <ServicesGrid data={content.services} />
        <AboutSection data={content.about} />
        <ContactFaqSection data={content.faq} />
      </main>
      <Footer settings={content.siteSettings} />
    </>
  );
}
