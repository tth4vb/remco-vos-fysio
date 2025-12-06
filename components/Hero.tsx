import Image from "next/image";
import type { HeroContent } from "@/lib/content";

interface HeroProps {
  data: HeroContent;
}

export default function Hero({ data }: HeroProps) {
  const { title, ctaLabel, ctaUrl, backgroundImage } = data;

  // Split the hero title by newlines for proper line breaks
  const titleLines = title.split("\n");

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/hero-bg.png"}
          alt="Achtergrondafbeelding"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 content-container-wide w-full pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-xl">
          {/* Main Heading */}
          <h1 className="font-display text-hero-sm md:text-hero-md lg:text-hero-lg text-text-on-dark mb-8 md:mb-10 text-balance">
            {titleLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* CTA Button */}
          {ctaLabel && (
            <a href={ctaUrl || "#contact"} className="btn-primary">
              {ctaLabel}
            </a>
          )}
        </div>
      </div>

      {/* Bottom fade/gradient for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-main-dark to-transparent z-10" />
    </section>
  );
}
