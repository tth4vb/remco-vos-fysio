import Image from "next/image";
import type { AboutContent } from "@/lib/content";

interface AboutSectionProps {
  data: AboutContent;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { title, image, body, signature, tagline } = data;

  // Split body by double newlines into paragraphs
  const paragraphs = body.split("\n\n");

  return (
    <section id="over-mij" className="bg-main-light section-padding">
      <div className="content-container">
        {/* Section Title */}
        <h2 className="font-display text-section-title md:text-section-title text-text-primary text-center mb-10 md:mb-14">
          {title}
        </h2>

        {/* Portrait Image */}
        <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-card overflow-hidden mb-10 md:mb-14 shadow-card">
          {image ? (
            <Image
              src={image}
              alt="Portretfoto"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          ) : (
            // Placeholder when no image
            <div className="w-full h-full bg-gradient-to-br from-main-dark/10 to-main-dark/5 flex items-center justify-center">
              <span className="text-main-dark/20 font-display text-4xl">RV</span>
            </div>
          )}
        </div>

        {/* Body Text */}
        <div className="font-body text-body-md md:text-body-lg text-text-primary leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-5 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Signature */}
        {signature && (
          <p className="font-body text-body-md text-text-primary mt-8">
            {signature}
          </p>
        )}

        {/* Tagline */}
        {tagline && (
          <p className="font-display text-body-lg text-text-primary/70 italic mt-6">
            &apos;{tagline}&apos;
          </p>
        )}
      </div>
    </section>
  );
}
