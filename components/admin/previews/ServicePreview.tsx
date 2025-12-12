"use client";

import Image from "next/image";
import type { ServiceItem } from "@/lib/content";

interface ServicePreviewProps {
  service: ServiceItem;
}

export default function ServicePreview({ service }: ServicePreviewProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-200">
        <span className="text-xs font-medium text-gray-500">Preview</span>
      </div>
      <div className="p-3">
        <div className="relative aspect-[4/3] bg-gray-100 rounded overflow-hidden mb-2">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="200px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-xs">Geen afbeelding</span>
            </div>
          )}
        </div>
        <h3 className="font-display text-sm text-main-dark mb-1">{service.title || "Titel"}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {service.description || "Beschrijving..."}
        </p>
      </div>
    </div>
  );
}
