# Remco Vos Fysio Website

A pixel-perfect implementation of a physiotherapy/sports massage website built with Next.js 14, Tailwind CSS, and Sanity.io v3.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with custom design system
- **Sanity.io v3** as the CMS
- **Lucide React** for icons

## Project Structure

```
remco-vos-fysio/
├── app/
│   ├── globals.css       # Tailwind styles + custom utilities
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Main page with Sanity data fetching
├── components/
│   ├── Header.tsx        # Sticky navigation
│   ├── Hero.tsx          # Hero section with background image
│   ├── ServicesGrid.tsx  # 2x2 services grid
│   ├── AboutSection.tsx  # About section with portrait
│   ├── ContactFaqSection.tsx # FAQ accordion
│   ├── Footer.tsx        # Footer with contact info
│   └── Logo.tsx          # Fox logo SVG
├── lib/
│   ├── sanity.client.ts  # Sanity client configuration
│   └── sanity.queries.ts # GROQ queries
├── sanity/
│   ├── schemas/          # Sanity document schemas
│   └── sanity.config.ts  # Sanity Studio configuration
├── types/
│   └── sanity.ts         # TypeScript types
└── public/               # Static assets
```

## Getting Started

### 1. Install Dependencies

```bash
# Install Next.js dependencies
npm install

# Install Sanity Studio dependencies
cd sanity && npm install && cd ..
```

### 2. Set Up Sanity

1. Create a new Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy the project ID from your Sanity dashboard
3. Create environment files:

```bash
# Root .env.local
cp .env.example .env.local

# Sanity .env
cp sanity/.env.example sanity/.env
```

4. Update both files with your Sanity project ID:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

5. Add CORS origins in your Sanity project settings:
   - `http://localhost:3000` (for development)
   - Your production URL

### 3. Run the Development Servers

**Terminal 1 - Next.js:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Terminal 2 - Sanity Studio:**
```bash
npm run sanity
```
Open [http://localhost:3333](http://localhost:3333)

### 4. Add Content in Sanity

1. Open Sanity Studio at `localhost:3333`
2. Create a **Site Settings** document with:
   - Logo text, phone, email, address
   - Navigation items (Diensten, Over mij, Contact, Contraindicaties)
3. Create a **Home Page** document with:
   - Hero title and CTA
   - Hero background image
   - About section content and image
4. Create **Service** documents for each service
5. Create **FAQ Item** documents for the accordion

The website will show placeholder content until you add content in Sanity.

## Design System

### Colors
- `main-dark`: #424B3C (dark green)
- `main-light`: #FFF9F3 (cream background)
- `accent-orange`: #EB9100 (CTA buttons)
- `text-primary`: #302B2F (body text)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Cormorant Garamond (serif)

### Key Classes
- `.content-container` - Max width 702px centered
- `.section-padding` - Consistent vertical padding
- `.service-card` - Card styling with shadow
- `.btn-primary` - Orange CTA button

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

### Sanity Studio

```bash
cd sanity
npm run deploy
```

## Content Structure (Sanity Schemas)

- **siteSettings** - Global settings (singleton)
- **homePage** - Home page content (singleton)
- **service** - Individual services
- **faqItem** - FAQ accordion items
- **navigationItem** - Nav menu items

## License

Private - All rights reserved.
