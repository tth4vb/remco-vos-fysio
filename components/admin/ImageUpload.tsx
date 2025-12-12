"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  aspectRatio = "aspect-video",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (value) {
        formData.append("oldUrl", value);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className={`relative ${aspectRatio} bg-gray-100 rounded-lg overflow-hidden`}>
          <Image
            src={value}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Verwijderen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          className={`relative ${aspectRatio} flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent-orange hover:bg-gray-50 transition-colors ${
            isUploading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              <span className="mt-2 text-sm text-gray-500">Uploaden...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Klik om afbeelding te uploaden
              </span>
              <span className="mt-1 text-xs text-gray-400">
                JPEG, PNG, WebP of GIF (max 4MB)
              </span>
            </>
          )}
        </label>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
