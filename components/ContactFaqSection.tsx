"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FaqContent, FaqItem } from "@/lib/content";

interface ContactFaqSectionProps {
  data: FaqContent;
}

interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  // Split answer by newlines for proper formatting
  const answerLines = item.answer.split("\n");

  return (
    <div className="border-b border-text-on-dark/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-body text-body-lg text-text-on-dark group-hover:text-accent-orange transition-colors duration-200">
          {item.title}
        </span>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5 text-text-on-dark" />
          ) : (
            <Plus className="w-5 h-5 text-text-on-dark" />
          )}
        </span>
      </button>

      {/* Accordion Content */}
      <div
        className="accordion-content"
        data-open={isOpen}
        aria-hidden={!isOpen}
      >
        <div className="accordion-inner">
          <div className="pb-5">
            <div className="font-body text-body-md text-text-on-dark/80 leading-relaxed">
              {answerLines.map((line, index) => (
                <p key={index} className={line === "" ? "h-3" : "mb-1"}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactFaqSection({ data }: ContactFaqSectionProps) {
  const { title, items } = data;
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="contact" className="bg-main-dark section-padding">
      <div className="content-container">
        {/* Section Title */}
        <h2 className="font-display text-section-title md:text-section-title text-text-on-dark text-center mb-10 md:mb-14">
          {title}
        </h2>

        {/* Accordion */}
        <div className="border-t border-text-on-dark/20">
          {items.map((faq) => (
            <AccordionItem
              key={faq.id}
              item={faq}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
