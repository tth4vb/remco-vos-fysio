"use client";

import Image from "next/image";
import type { HeroContent } from "@/lib/content";

interface HeroPreviewProps {
  data: HeroContent;
}

export default function HeroPreview({ data }: HeroPreviewProps) {
  const lines = data.title.split("\n");

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-200">
        <span className="text-xs font-medium text-gray-500">Preview</span>
      </div>
      <div className="relative aspect-[21/9] bg-main-dark overflow-hidden">
        {data.backgroundImage ? (
          <Image
            src={data.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover opacity-70"
            sizes="400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
            <span className="text-gray-500 text-xs">Geen achtergrond</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="font-display text-white text-sm md:text-base leading-tight">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          {data.ctaLabel && (
            <span className="mt-2 px-3 py-1 bg-accent-orange text-white text-xs rounded">
              {data.ctaLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
