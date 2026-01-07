#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read content.json
const contentPath = path.join(__dirname, '..', 'data', 'content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

const documents = [];

// 1. Navigation Items
for (const nav of content.siteSettings.navigation) {
  documents.push({
    _id: `nav-${nav.id}`,
    _type: 'navigationItem',
    label: nav.label,
    targetId: nav.targetId,
    visible: nav.visible,
  });
}

// 2. Site Settings
const navRefs = content.siteSettings.navigation.map(nav => ({
  _type: 'reference',
  _ref: `nav-${nav.id}`,
  _key: nav.id,
}));

documents.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: content.siteSettings.title,
  logoText: content.siteSettings.logoText,
  logoSubtext: content.siteSettings.logoSubtext,
  phone: content.siteSettings.phone,
  email: content.siteSettings.email,
  address: content.siteSettings.address,
  whatsappUrl: content.siteSettings.whatsappUrl,
  navigation: navRefs,
});

// 3. Services
for (const service of content.services.items) {
  documents.push({
    _id: `service-${service.id}`,
    _type: 'service',
    title: service.title,
    description: service.description,
  });
}

// 4. FAQ Items
for (const faq of content.faq.items) {
  documents.push({
    _id: `faq-${faq.id}`,
    _type: 'faqItem',
    title: faq.title,
    answer: faq.answer,
  });
}

// 5. Home Page
const serviceRefs = content.services.items.map(s => ({
  _type: 'reference',
  _ref: `service-${s.id}`,
  _key: s.id,
}));

const faqRefs = content.faq.items.map(f => ({
  _type: 'reference',
  _ref: `faq-${f.id}`,
  _key: f.id,
}));

documents.push({
  _id: 'homePage',
  _type: 'homePage',
  heroTitle: content.hero.title,
  heroCtaLabel: content.hero.ctaLabel,
  heroCtaUrl: content.hero.ctaUrl,
  servicesTitle: content.services.title,
  services: serviceRefs,
  aboutTitle: content.about.title,
  aboutBody: content.about.body,
  aboutSignature: content.about.signature,
  aboutTagline: content.about.tagline,
  contactFaqTitle: content.faq.title,
  faqs: faqRefs,
  pricingTitle: content.pricing.title,
  pricingItems: content.pricing.items.map((item, index) => ({
    _type: 'pricingItem',
    _key: `price-${index}`,
    service: item.service,
    duration: item.duration || '',
    price: item.price,
  })),
  pricingNote: content.pricing.note || '',
  openingHoursTitle: content.openingHours.title,
  openingHours: content.openingHours.days.map((day, index) => ({
    _type: 'dayHours',
    _key: `day-${index}`,
    day: day.day,
    open: day.open,
    openTime: day.openTime || '',
    closeTime: day.closeTime || '',
    openTime2: day.openTime2 || '',
    closeTime2: day.closeTime2 || '',
    byAppointment: day.byAppointment || false,
  })),
  openingHoursNote: content.openingHours.note || '',
  announcementEnabled: content.announcement.enabled,
  announcementMessage: content.announcement.message || '',
  announcementBackgroundColor: content.announcement.backgroundColor || 'orange',
  whatsappEnabled: content.whatsappButton.enabled,
  whatsappPhoneNumber: content.whatsappButton.phoneNumber,
  whatsappPrefilledMessage: content.whatsappButton.prefilledMessage,
  whatsappPosition: content.whatsappButton.position,
});

// Write NDJSON
const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n');
const outputPath = path.join(__dirname, 'migration-data.ndjson');
fs.writeFileSync(outputPath, ndjson);

console.log(`Created ${documents.length} documents in ${outputPath}`);
console.log('Documents created:');
documents.forEach(doc => console.log(`  - ${doc._type}: ${doc._id}`));
