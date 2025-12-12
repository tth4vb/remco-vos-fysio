"use client";

import type { OpeningHoursContent } from "@/lib/content";

interface OpeningHoursTableProps {
  data: OpeningHoursContent;
}

export default function OpeningHoursTable({ data }: OpeningHoursTableProps) {
  const { title, days } = data;

  if (!days || days.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="font-display text-xl text-text-on-dark text-center mb-6">
        {title}
      </h3>

      <div className="bg-main-dark/50 rounded-lg overflow-hidden border border-text-on-dark/20">
        <table className="w-full">
          <tbody>
            {days.map((day, index) => (
              <tr
                key={day.day}
                className={`
                  ${index !== days.length - 1 ? "border-b border-text-on-dark/10" : ""}
                  hover:bg-text-on-dark/5 transition-colors
                `}
              >
                <td className="py-3 px-4 font-body text-text-on-dark font-medium">
                  {day.day}
                </td>
                <td className="py-3 px-4 font-body text-text-on-dark/80 text-right">
                  {!day.open ? (
                    <span className="text-text-on-dark/50">Gesloten</span>
                  ) : day.byAppointment ? (
                    <span className="italic">Op afspraak</span>
                  ) : (
                    <span>
                      {day.openTime} - {day.closeTime}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
