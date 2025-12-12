"use client";

import type { AnnouncementBanner as AnnouncementBannerType } from "@/lib/content";

interface AnnouncementBannerProps {
  data: AnnouncementBannerType;
}

export default function AnnouncementBanner({ data }: AnnouncementBannerProps) {
  // Check if banner should be displayed
  if (!data.enabled || !data.message) {
    return null;
  }

  // Check date range if specified
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (data.startDate) {
    const startDate = new Date(data.startDate);
    if (today < startDate) {
      return null;
    }
  }

  if (data.endDate) {
    const endDate = new Date(data.endDate);
    endDate.setHours(23, 59, 59, 999);
    if (today > endDate) {
      return null;
    }
  }

  const bgColorClass =
    data.backgroundColor === "red"
      ? "bg-red-500"
      : data.backgroundColor === "blue"
      ? "bg-blue-500"
      : "bg-accent-orange";

  return (
    <div className={`${bgColorClass} text-white text-center py-3 px-4`}>
      <p className="font-body text-sm md:text-base">{data.message}</p>
    </div>
  );
}
