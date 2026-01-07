import fs from "fs";
import path from "path";

// Types for content
export interface NavigationItem {
  id: string;
  label: string;
  targetId: string;
  visible: boolean;
}

export interface SiteSettings {
  title: string;
  logoText: string;
  logoSubtext: string;
  phone: string;
  email: string;
  address: string;
  whatsappUrl: string;
  navigation: NavigationItem[];
}

export interface HeroContent {
  title: string;
  ctaLabel: string;
  ctaUrl: string;
  backgroundImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface ServicesContent {
  title: string;
  items: ServiceItem[];
}

export interface AboutContent {
  title: string;
  image: string;
  body: string;
  signature: string;
  tagline: string;
}

export interface FaqItem {
  id: string;
  title: string;
  answer: string;
}

export interface FaqContent {
  title: string;
  items: FaqItem[];
}

export interface PricingItem {
  id: string;
  service: string;
  duration: string;
  price: number;
}

export interface PricingContent {
  title: string;
  items: PricingItem[];
  note: string;
}

export interface DayHours {
  day: string;
  open: boolean;
  openTime: string;
  closeTime: string;
  openTime2?: string;
  closeTime2?: string;
  byAppointment: boolean;
}

export interface OpeningHoursContent {
  title: string;
  days: DayHours[];
  note: string;
}

export interface AnnouncementBanner {
  enabled: boolean;
  message: string;
  startDate: string;
  endDate: string;
  backgroundColor: string;
}

export interface WhatsAppButtonSettings {
  enabled: boolean;
  phoneNumber: string;
  prefilledMessage: string;
  position: "left" | "right";
}

export interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  keywords: string[];
}

export interface SiteContent {
  seo: SEOMetadata;
  siteSettings: SiteSettings;
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  faq: FaqContent;
  pricing: PricingContent;
  openingHours: OpeningHoursContent;
  announcement: AnnouncementBanner;
  whatsappButton: WhatsAppButtonSettings;
}

const contentFilePath = path.join(process.cwd(), "data", "content.json");

// Read default content from JSON file (for fallback/initial data)
function getDefaultContent(): SiteContent {
  try {
    const fileContent = fs.readFileSync(contentFilePath, "utf-8");
    return JSON.parse(fileContent) as SiteContent;
  } catch (error) {
    console.error("Error reading content file:", error);
    throw new Error("Failed to read default content");
  }
}

// Check if Sanity is configured
function isSanityConfigured(): boolean {
  const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
  return projectId !== "your-project-id" && !!projectId && /^[a-z0-9-]+$/.test(projectId);
}

// Transform Sanity data to SiteContent format
function transformSanityData(sanityData: {
  siteSettings: Record<string, unknown> | null;
  homePage: Record<string, unknown> | null;
}): SiteContent | null {
  const { siteSettings, homePage } = sanityData;

  // If no data from Sanity, return null to use fallback
  if (!siteSettings && !homePage) {
    return null;
  }

  const defaults = getDefaultContent();

  // Build the content object, using defaults where Sanity data is missing
  return {
    seo: {
      title: (homePage?.seoTitle as string) || defaults.seo.title,
      description: (homePage?.seoDescription as string) || defaults.seo.description,
      ogImage: (homePage?.ogImage as string) || defaults.seo.ogImage,
      keywords: homePage?.seoKeywords ? (homePage.seoKeywords as string[]) : defaults.seo.keywords,
    },
    siteSettings: {
      title: (siteSettings?.title as string) || defaults.siteSettings.title,
      logoText: (siteSettings?.logoText as string) || defaults.siteSettings.logoText,
      logoSubtext: (siteSettings?.logoSubtext as string) || defaults.siteSettings.logoSubtext,
      phone: (siteSettings?.phone as string) || defaults.siteSettings.phone,
      email: (siteSettings?.email as string) || defaults.siteSettings.email,
      address: (siteSettings?.address as string) || defaults.siteSettings.address,
      whatsappUrl: (siteSettings?.whatsappUrl as string) || defaults.siteSettings.whatsappUrl,
      navigation: siteSettings?.navigation
        ? (siteSettings.navigation as Array<{ _id: string; label: string; targetId: string; visible?: boolean }>).map(
            (nav, index) => ({
              id: nav._id || String(index + 1),
              label: nav.label,
              targetId: nav.targetId,
              visible: nav.visible !== false,
            })
          )
        : defaults.siteSettings.navigation,
    },
    hero: {
      title: (homePage?.heroTitle as string) || defaults.hero.title,
      ctaLabel: (homePage?.heroCtaLabel as string) || defaults.hero.ctaLabel,
      ctaUrl: (homePage?.heroCtaUrl as string) || defaults.hero.ctaUrl,
      backgroundImage: (homePage?.heroBackgroundImage as string) || defaults.hero.backgroundImage,
    },
    services: {
      title: (homePage?.servicesTitle as string) || defaults.services.title,
      items: homePage?.services
        ? (homePage.services as Array<{ _id: string; title: string; image: string; description: string }>).map(
            (service, index) => ({
              id: service._id || String(index + 1),
              title: service.title,
              image: service.image || "/placeholder.png",
              description: service.description,
            })
          )
        : defaults.services.items,
    },
    about: {
      title: (homePage?.aboutTitle as string) || defaults.about.title,
      image: (homePage?.aboutImage as string) || defaults.about.image,
      body: (homePage?.aboutBody as string) || defaults.about.body,
      signature: (homePage?.aboutSignature as string) || defaults.about.signature,
      tagline: (homePage?.aboutTagline as string) || defaults.about.tagline,
    },
    faq: {
      title: (homePage?.contactFaqTitle as string) || defaults.faq.title,
      items: homePage?.faqs
        ? (homePage.faqs as Array<{ _id: string; title: string; answer: string }>).map((faq, index) => ({
            id: faq._id || String(index + 1),
            title: faq.title,
            answer: faq.answer,
          }))
        : defaults.faq.items,
    },
    pricing: {
      title: (homePage?.pricingTitle as string) || defaults.pricing.title,
      items: homePage?.pricingItems
        ? (homePage.pricingItems as Array<{ _key: string; service: string; duration: string; price: number }>).map(
            (item, index) => ({
              id: item._key || String(index + 1),
              service: item.service,
              duration: item.duration || "",
              price: item.price,
            })
          )
        : defaults.pricing.items,
      note: (homePage?.pricingNote as string) || defaults.pricing.note,
    },
    openingHours: {
      title: (homePage?.openingHoursTitle as string) || defaults.openingHours.title,
      days: homePage?.openingHours
        ? (
            homePage.openingHours as Array<{
              day: string;
              open: boolean;
              openTime: string;
              closeTime: string;
              openTime2?: string;
              closeTime2?: string;
              byAppointment: boolean;
            }>
          ).map((day) => ({
            day: day.day,
            open: day.open !== false,
            openTime: day.openTime || "",
            closeTime: day.closeTime || "",
            openTime2: day.openTime2,
            closeTime2: day.closeTime2,
            byAppointment: day.byAppointment || false,
          }))
        : defaults.openingHours.days,
      note: (homePage?.openingHoursNote as string) || defaults.openingHours.note,
    },
    announcement: {
      enabled: (homePage?.announcementEnabled as boolean) ?? defaults.announcement.enabled,
      message: (homePage?.announcementMessage as string) || defaults.announcement.message,
      startDate: (homePage?.announcementStartDate as string) || defaults.announcement.startDate,
      endDate: (homePage?.announcementEndDate as string) || defaults.announcement.endDate,
      backgroundColor: (homePage?.announcementBackgroundColor as string) || defaults.announcement.backgroundColor,
    },
    whatsappButton: {
      enabled: (homePage?.whatsappEnabled as boolean) ?? defaults.whatsappButton.enabled,
      phoneNumber: (homePage?.whatsappPhoneNumber as string) || defaults.whatsappButton.phoneNumber,
      prefilledMessage: (homePage?.whatsappPrefilledMessage as string) || defaults.whatsappButton.prefilledMessage,
      position: ((homePage?.whatsappPosition as string) || defaults.whatsappButton.position) as "left" | "right",
    },
  };
}

// Read content - tries Sanity first, falls back to JSON file
export async function getContent(): Promise<SiteContent> {
  // If Sanity is not configured, use file system
  if (!isSanityConfigured()) {
    console.log("[getContent] Sanity not configured, using local JSON file");
    return getDefaultContent();
  }

  try {
    // Dynamically import to avoid build-time initialization
    const { sanityFetch } = await import("./sanity.client");
    const { allContentQuery } = await import("./sanity.queries");

    // Fetch from Sanity with revalidation
    const sanityData = await sanityFetch<{
      siteSettings: Record<string, unknown> | null;
      homePage: Record<string, unknown> | null;
    }>({
      query: allContentQuery,
      tags: ["content"],
    });
    console.log("[getContent] Sanity data fetched successfully");

    const transformed = transformSanityData(sanityData);

    if (transformed) {
      return transformed;
    }

    // No content in Sanity yet - return default
    console.log("[getContent] No content in Sanity yet, using defaults");
    return getDefaultContent();
  } catch (error) {
    console.error("[getContent] Error fetching from Sanity, falling back to file:", error);
    return getDefaultContent();
  }
}

// Synchronous version for components that can't be async (uses file only)
export function getContentSync(): SiteContent {
  return getDefaultContent();
}

// Save content is no longer needed with Sanity (content is managed via Sanity Studio)
// Keeping for backwards compatibility, but it now just writes to local file
export async function saveContent(content: SiteContent): Promise<void> {
  try {
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing content file:", error);
    throw new Error("Failed to save content");
  }
}

// Update a specific section (for local file only)
export async function updateSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K]
): Promise<SiteContent> {
  const content = await getContent();
  content[section] = data;
  await saveContent(content);
  return content;
}
