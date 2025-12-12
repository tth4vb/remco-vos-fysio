"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, HardDrive } from "lucide-react";

interface BlobUsage {
  totalSizeMB: number;
  limitMB: number;
  usagePercent: number;
  blobCount: number;
  isNearLimit: boolean;
  isAtLimit: boolean;
  message: string | null;
}

export default function BlobUsageWarning() {
  const [usage, setUsage] = useState<BlobUsage | null>(null);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await fetch("/api/admin/blob-usage");
        if (res.ok) {
          const data = await res.json();
          setUsage(data);
        }
      } catch (e) {
        console.error("Failed to fetch blob usage:", e);
      }
    };

    fetchUsage();
  }, []);

  if (!usage || (!usage.isNearLimit && !usage.isAtLimit)) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-lg flex items-start gap-3 ${
        usage.isAtLimit
          ? "bg-red-50 border border-red-200"
          : "bg-yellow-50 border border-yellow-200"
      }`}
    >
      <AlertTriangle
        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
          usage.isAtLimit ? "text-red-500" : "text-yellow-500"
        }`}
      />
      <div className="flex-1">
        <p
          className={`font-medium ${
            usage.isAtLimit ? "text-red-800" : "text-yellow-800"
          }`}
        >
          {usage.message}
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <HardDrive className="w-4 h-4" />
          <span>
            {usage.totalSizeMB} MB / {usage.limitMB} MB ({usage.usagePercent}%)
          </span>
          <span className="text-gray-400">|</span>
          <span>{usage.blobCount} afbeeldingen</span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              usage.isAtLimit ? "bg-red-500" : "bg-yellow-500"
            }`}
            style={{ width: `${Math.min(usage.usagePercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
