"use client";

import type { PricingContent, OpeningHoursContent } from "@/lib/content";
import { Clock, Euro } from "lucide-react";

interface PricingHoursSectionProps {
  pricing: PricingContent;
  openingHours: OpeningHoursContent;
}

export default function PricingHoursSection({ pricing, openingHours }: PricingHoursSectionProps) {
  return (
    <section id="tarieven" className="bg-main-light section-padding">
      <div className="content-container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Pricing Card */}
          <div className="bg-white rounded-card shadow-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center">
                <Euro className="w-5 h-5 text-accent-orange" />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-text-primary font-semibold">
                {pricing.title}
              </h3>
            </div>

            <div className="space-y-3">
              {pricing.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <span className="font-body text-text-primary">{item.service}</span>
                    {item.duration && (
                      <span className="ml-2 text-sm text-gray-500">({item.duration})</span>
                    )}
                  </div>
                  <span className="font-display text-lg text-accent-orange font-semibold">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {pricing.note && (
              <p className="mt-4 text-sm text-gray-500 italic">{pricing.note}</p>
            )}
          </div>

          {/* Opening Hours Card */}
          <div className="bg-white rounded-card shadow-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-main-dark/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-main-dark" />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-text-primary font-semibold">
                {openingHours.title}
              </h3>
            </div>

            <div className="space-y-2">
              {openingHours.days.map((day) => (
                <div
                  key={day.day}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="font-body text-text-primary font-medium">{day.day}</span>
                  <span className="font-body text-gray-600">
                    {!day.open ? (
                      <span className="text-gray-400">Gesloten</span>
                    ) : day.byAppointment ? (
                      <span className="italic text-accent-orange">Op afspraak</span>
                    ) : (
                      <span className="text-right">
                        {day.openTime} - {day.closeTime}
                        {day.openTime2 && day.closeTime2 && (
                          <>
                            <br />
                            {day.openTime2} - {day.closeTime2}
                          </>
                        )}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {openingHours.note && (
              <p className="mt-4 text-sm text-gray-500 italic">{openingHours.note}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
