import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import PricingHoursSection from "@/components/PricingHoursSection";
import AboutSection from "@/components/AboutSection";
import ContactFaqSection from "@/components/ContactFaqSection";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

// Force dynamic to always read fresh content
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header settings={content.siteSettings} announcement={content.announcement} />
      <main>
        <Hero data={content.hero} />
        <ServicesGrid data={content.services} />
        <PricingHoursSection pricing={content.pricing} openingHours={content.openingHours} />
        <AboutSection data={content.about} />
        <ContactFaqSection data={content.faq} />
      </main>
      <Footer settings={content.siteSettings} />
      <FloatingWhatsAppButton settings={content.whatsappButton} />
    </>
  );
}
