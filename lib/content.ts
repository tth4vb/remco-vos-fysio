import fs from "fs";
import path from "path";
import { put, list, del } from "@vercel/blob";

const CONTENT_BLOB_NAME = "site-content.json";

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
  byAppointment: boolean;
}

export interface OpeningHoursContent {
  title: string;
  days: DayHours[];
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

export interface SiteContent {
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

// Check if Blob is available (has credentials)
function isBlobAvailable(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// Read content - tries Blob first, falls back to JSON file
export async function getContent(): Promise<SiteContent> {
  // If Blob is not configured, use file system
  if (!isBlobAvailable()) {
    return getDefaultContent();
  }

  try {
    // List blobs to find our content file
    const { blobs } = await list({ prefix: CONTENT_BLOB_NAME });
    const contentBlob = blobs.find(b => b.pathname === CONTENT_BLOB_NAME);

    if (contentBlob) {
      // Fetch the content from the blob URL with cache busting
      const response = await fetch(contentBlob.url, {
        cache: 'no-store',
        next: { revalidate: 0 }
      });
      if (response.ok) {
        const content = await response.json() as SiteContent;
        return content;
      }
    }

    // No content in Blob yet - return default WITHOUT seeding
    // Seeding should only happen via explicit admin save, not on read
    console.log("No content found in Blob storage, using defaults");
    return getDefaultContent();
  } catch (error) {
    console.error("Error reading from Blob, falling back to file:", error);
    return getDefaultContent();
  }
}

// Synchronous version for components that can't be async (uses file only)
export function getContentSync(): SiteContent {
  return getDefaultContent();
}

// Save content to Blob (and optionally to file for backup)
export async function saveContent(content: SiteContent): Promise<void> {
  if (!isBlobAvailable()) {
    // Fallback to file system for local development
    try {
      fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), "utf-8");
      return;
    } catch (error) {
      console.error("Error writing content file:", error);
      throw new Error("Failed to save content");
    }
  }

  try {
    // First, try to delete any existing content blob
    const { blobs } = await list({ prefix: CONTENT_BLOB_NAME });
    for (const blob of blobs) {
      if (blob.pathname === CONTENT_BLOB_NAME) {
        await del(blob.url);
      }
    }

    // Then upload the new content
    const jsonContent = JSON.stringify(content, null, 2);
    await put(CONTENT_BLOB_NAME, jsonContent, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
  } catch (error) {
    console.error("Error saving to Blob:", error);
    throw new Error("Failed to save content");
  }
}

// Update a specific section
export async function updateSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K]
): Promise<SiteContent> {
  const content = await getContent();
  content[section] = data;
  await saveContent(content);
  return content;
}
