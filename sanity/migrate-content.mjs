#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read content.json
const contentPath = path.join(__dirname, '..', 'data', 'content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

// Create Sanity client
const client = createClient({
  projectId: 'gmbzo7lj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
});

async function migrate() {
  console.log('Starting migration...');

  // 1. Create Navigation Items
  console.log('Creating navigation items...');
  const navRefs = [];
  for (const nav of content.siteSettings.navigation) {
    const doc = {
      _id: `nav-${nav.id}`,
      _type: 'navigationItem',
      label: nav.label,
      targetId: nav.targetId,
      visible: nav.visible,
    };
    await client.createOrReplace(doc);
    navRefs.push({ _type: 'reference', _ref: `nav-${nav.id}`, _key: nav.id });
    console.log(`  Created nav: ${nav.label}`);
  }

  // 2. Create Site Settings
  console.log('Creating site settings...');
  const siteSettings = {
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
  };
  await client.createOrReplace(siteSettings);
  console.log('  Site settings created');

  // 3. Create Services
  console.log('Creating services...');
  const serviceRefs = [];
  for (const service of content.services.items) {
    const doc = {
      _id: `service-${service.id}`,
      _type: 'service',
      title: service.title,
      description: service.description,
      // Note: Images would need to be uploaded separately
    };
    await client.createOrReplace(doc);
    serviceRefs.push({ _type: 'reference', _ref: `service-${service.id}`, _key: service.id });
    console.log(`  Created service: ${service.title}`);
  }

  // 4. Create FAQ Items
  console.log('Creating FAQ items...');
  const faqRefs = [];
  for (const faq of content.faq.items) {
    const doc = {
      _id: `faq-${faq.id}`,
      _type: 'faqItem',
      title: faq.title,
      answer: faq.answer,
    };
    await client.createOrReplace(doc);
    faqRefs.push({ _type: 'reference', _ref: `faq-${faq.id}`, _key: faq.id });
    console.log(`  Created FAQ: ${faq.title}`);
  }

  // 5. Create Home Page with all content
  console.log('Creating home page...');
  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    // Hero
    heroTitle: content.hero.title,
    heroCtaLabel: content.hero.ctaLabel,
    heroCtaUrl: content.hero.ctaUrl,
    // Services
    servicesTitle: content.services.title,
    services: serviceRefs,
    // About
    aboutTitle: content.about.title,
    aboutBody: content.about.body,
    aboutSignature: content.about.signature,
    aboutTagline: content.about.tagline,
    // Contact & FAQs
    contactFaqTitle: content.faq.title,
    faqs: faqRefs,
    // Pricing
    pricingTitle: content.pricing.title,
    pricingItems: content.pricing.items.map((item, index) => ({
      _type: 'pricingItem',
      _key: `price-${index}`,
      service: item.service,
      duration: item.duration || '',
      price: item.price,
    })),
    pricingNote: content.pricing.note || '',
    // Opening Hours
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
    // Announcement
    announcementEnabled: content.announcement.enabled,
    announcementMessage: content.announcement.message || '',
    announcementStartDate: content.announcement.startDate || null,
    announcementEndDate: content.announcement.endDate || null,
    announcementBackgroundColor: content.announcement.backgroundColor || 'orange',
    // WhatsApp
    whatsappEnabled: content.whatsappButton.enabled,
    whatsappPhoneNumber: content.whatsappButton.phoneNumber,
    whatsappPrefilledMessage: content.whatsappButton.prefilledMessage,
    whatsappPosition: content.whatsappButton.position,
  };
  await client.createOrReplace(homePage);
  console.log('  Home page created');

  console.log('\nMigration complete!');
  console.log('Note: Images need to be uploaded manually through Sanity Studio.');
}

// Check for token
if (!process.env.SANITY_API_TOKEN) {
  console.log('='.repeat(60));
  console.log('SANITY_API_TOKEN not set!');
  console.log('');
  console.log('To get a token:');
  console.log('1. Go to https://sanity.io/manage/project/gmbzo7lj/api');
  console.log('2. Click "Add API token"');
  console.log('3. Name it "Migration" and give it "Editor" permissions');
  console.log('4. Copy the token and run:');
  console.log('');
  console.log('   SANITY_API_TOKEN=your-token-here node migrate-content.mjs');
  console.log('='.repeat(60));
  process.exit(1);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
