"use client";

import type { PricingContent } from "@/lib/content";

interface PricingTableProps {
  data: PricingContent;
}

export default function PricingTable({ data }: PricingTableProps) {
  const { title, items, note } = data;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="font-display text-xl text-text-on-dark text-center mb-6">
        {title}
      </h3>

      <div className="bg-main-dark/50 rounded-lg overflow-hidden border border-text-on-dark/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-text-on-dark/20">
              <th className="text-left py-3 px-4 font-body text-sm text-text-on-dark/60 uppercase tracking-wide">
                Dienst
              </th>
              <th className="text-left py-3 px-4 font-body text-sm text-text-on-dark/60 uppercase tracking-wide">
                Duur
              </th>
              <th className="text-right py-3 px-4 font-body text-sm text-text-on-dark/60 uppercase tracking-wide">
                Prijs
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`
                  ${index !== items.length - 1 ? "border-b border-text-on-dark/10" : ""}
                  hover:bg-text-on-dark/5 transition-colors
                `}
              >
                <td className="py-3 px-4 font-body text-text-on-dark">
                  {item.service}
                </td>
                <td className="py-3 px-4 font-body text-text-on-dark/80">
                  {item.duration || "-"}
                </td>
                <td className="py-3 px-4 font-body text-text-on-dark text-right font-medium">
                  €{item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && (
        <p className="mt-4 text-center font-body text-sm text-text-on-dark/60 italic">
          {note}
        </p>
      )}
    </div>
  );
}
