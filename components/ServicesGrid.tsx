import Image from "next/image";
import type { ServicesContent, ServiceItem } from "@/lib/content";

interface ServicesGridProps {
  data: ServicesContent;
}

function ServiceCard({ service }: { service: ServiceItem }) {
  // Split description by double newlines into paragraphs
  const paragraphs = service.description.split("\n\n");

  return (
    <article className="service-card overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-main-light">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          // Placeholder when no image
          <div className="w-full h-full bg-gradient-to-br from-main-light to-gray-100 flex items-center justify-center">
            <span className="text-text-primary/20 font-display text-2xl">
              {service.title[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="font-display text-card-title text-text-primary text-center mb-4">
          {service.title}
        </h3>

        <div className="font-body text-body-sm text-text-primary/80 leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-2 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ServicesGrid({ data }: ServicesGridProps) {
  const { title, items } = data;

  return (
    <section id="diensten" className="bg-main-dark section-padding">
      <div className="content-container-wide">
        {/* Section Title */}
        <h2 className="font-display text-section-title md:text-section-title text-text-on-dark text-center mb-12 md:mb-16">
          {title}
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
