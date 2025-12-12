"use client";

import Image from "next/image";
import type { AboutContent } from "@/lib/content";

interface AboutPreviewProps {
  data: AboutContent;
}

export default function AboutPreview({ data }: AboutPreviewProps) {
  const firstParagraph = data.body.split("\n\n")[0] || "";

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-main-light">
      <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-200">
        <span className="text-xs font-medium text-gray-500">Preview</span>
      </div>
      <div className="p-4">
        <h2 className="font-display text-base text-center mb-3">{data.title || "Over mij"}</h2>

        <div className="relative aspect-[4/3] max-w-[120px] mx-auto bg-gray-200 rounded overflow-hidden mb-3">
          {data.image ? (
            <Image
              src={data.image}
              alt="Portrait"
              fill
              className="object-cover"
              sizes="120px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-display text-lg">
              RV
            </div>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-3 mb-2">
          {firstParagraph || "Tekst..."}
        </p>

        {data.signature && (
          <p className="text-xs text-gray-700">{data.signature}</p>
        )}

        {data.tagline && (
          <p className="text-xs text-gray-500 italic mt-1">&apos;{data.tagline}&apos;</p>
        )}
      </div>
    </div>
  );
}
