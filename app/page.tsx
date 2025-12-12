import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import ContactFaqSection from "@/components/ContactFaqSection";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

// Force dynamic to always read fresh content
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <AnnouncementBanner data={content.announcement} />
      <Header settings={content.siteSettings} />
      <main>
        <Hero data={content.hero} />
        <ServicesGrid data={content.services} />
        <AboutSection data={content.about} />
        <ContactFaqSection data={content.faq} pricing={content.pricing} openingHours={content.openingHours} />
      </main>
      <Footer settings={content.siteSettings} />
      <FloatingWhatsAppButton settings={content.whatsappButton} />
    </>
  );
}
