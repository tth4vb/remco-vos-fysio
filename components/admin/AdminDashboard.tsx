"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, LogOut, ChevronDown, ChevronUp, Eye } from "lucide-react";
import type { SiteContent } from "@/lib/content";

interface AdminDashboardProps {
  initialContent: SiteContent;
}

type Section = "settings" | "hero" | "services" | "about" | "faq";

export default function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<Section>>(
    new Set<Section>(["hero"])
  );
  const router = useRouter();

  const toggleSection = (section: Section) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setSaveMessage("Opgeslagen!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("Fout bij opslaan");
      }
    } catch {
      setSaveMessage("Fout bij opslaan");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: Section;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-main-dark text-text-on-dark rounded-lg hover:bg-main-dark/90 transition-colors"
    >
      <span className="font-display text-lg">{title}</span>
      {expandedSections.has(section) ? (
        <ChevronUp className="w-5 h-5" />
      ) : (
        <ChevronDown className="w-5 h-5" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-main-dark text-text-on-dark sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl">Content Beheer</h1>
          <div className="flex items-center gap-3">
            {saveMessage && (
              <span className="text-sm text-accent-orange">{saveMessage}</span>
            )}
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <Eye className="w-4 h-4" />
              Bekijk site
            </a>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-accent-orange rounded-lg hover:bg-accent-orange-hover transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Opslaan..." : "Opslaan"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {/* Site Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Site Instellingen" section="settings" />
          {expandedSections.has("settings") && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Logo Tekst"
                  value={content.siteSettings.logoText}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      siteSettings: { ...content.siteSettings, logoText: v },
                    })
                  }
                />
                <InputField
                  label="Logo Subtekst"
                  value={content.siteSettings.logoSubtext}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      siteSettings: { ...content.siteSettings, logoSubtext: v },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Telefoon"
                  value={content.siteSettings.phone}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      siteSettings: { ...content.siteSettings, phone: v },
                    })
                  }
                />
                <InputField
                  label="E-mail"
                  value={content.siteSettings.email}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      siteSettings: { ...content.siteSettings, email: v },
                    })
                  }
                />
              </div>
              <InputField
                label="Adres"
                value={content.siteSettings.address}
                onChange={(v) =>
                  setContent({
                    ...content,
                    siteSettings: { ...content.siteSettings, address: v },
                  })
                }
              />
              <InputField
                label="WhatsApp URL"
                value={content.siteSettings.whatsappUrl}
                onChange={(v) =>
                  setContent({
                    ...content,
                    siteSettings: { ...content.siteSettings, whatsappUrl: v },
                  })
                }
              />
            </div>
          )}
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Hero Sectie" section="hero" />
          {expandedSections.has("hero") && (
            <div className="p-6 space-y-4">
              <TextAreaField
                label="Titel (gebruik Enter voor nieuwe regel)"
                value={content.hero.title}
                onChange={(v) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, title: v },
                  })
                }
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="CTA Knop Tekst"
                  value={content.hero.ctaLabel}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, ctaLabel: v },
                    })
                  }
                />
                <InputField
                  label="CTA Link"
                  value={content.hero.ctaUrl}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, ctaUrl: v },
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Diensten" section="services" />
          {expandedSections.has("services") && (
            <div className="p-6 space-y-6">
              <InputField
                label="Sectie Titel"
                value={content.services.title}
                onChange={(v) =>
                  setContent({
                    ...content,
                    services: { ...content.services, title: v },
                  })
                }
              />
              {content.services.items.map((service, index) => (
                <div
                  key={service.id}
                  className="p-4 bg-gray-50 rounded-lg space-y-3"
                >
                  <InputField
                    label={`Dienst ${index + 1} - Titel`}
                    value={service.title}
                    onChange={(v) => {
                      const newItems = [...content.services.items];
                      newItems[index] = { ...newItems[index], title: v };
                      setContent({
                        ...content,
                        services: { ...content.services, items: newItems },
                      });
                    }}
                  />
                  <TextAreaField
                    label="Beschrijving"
                    value={service.description}
                    onChange={(v) => {
                      const newItems = [...content.services.items];
                      newItems[index] = { ...newItems[index], description: v };
                      setContent({
                        ...content,
                        services: { ...content.services, items: newItems },
                      });
                    }}
                    rows={4}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Over Mij" section="about" />
          {expandedSections.has("about") && (
            <div className="p-6 space-y-4">
              <InputField
                label="Sectie Titel"
                value={content.about.title}
                onChange={(v) =>
                  setContent({
                    ...content,
                    about: { ...content.about, title: v },
                  })
                }
              />
              <TextAreaField
                label="Tekst (gebruik lege regels voor nieuwe paragrafen)"
                value={content.about.body}
                onChange={(v) =>
                  setContent({
                    ...content,
                    about: { ...content.about, body: v },
                  })
                }
                rows={10}
              />
              <InputField
                label="Handtekening"
                value={content.about.signature}
                onChange={(v) =>
                  setContent({
                    ...content,
                    about: { ...content.about, signature: v },
                  })
                }
              />
              <InputField
                label="Tagline"
                value={content.about.tagline}
                onChange={(v) =>
                  setContent({
                    ...content,
                    about: { ...content.about, tagline: v },
                  })
                }
              />
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Contact & FAQs" section="faq" />
          {expandedSections.has("faq") && (
            <div className="p-6 space-y-6">
              <InputField
                label="Sectie Titel"
                value={content.faq.title}
                onChange={(v) =>
                  setContent({
                    ...content,
                    faq: { ...content.faq, title: v },
                  })
                }
              />
              {content.faq.items.map((faq, index) => (
                <div
                  key={faq.id}
                  className="p-4 bg-gray-50 rounded-lg space-y-3"
                >
                  <InputField
                    label={`FAQ ${index + 1} - Titel`}
                    value={faq.title}
                    onChange={(v) => {
                      const newItems = [...content.faq.items];
                      newItems[index] = { ...newItems[index], title: v };
                      setContent({
                        ...content,
                        faq: { ...content.faq, items: newItems },
                      });
                    }}
                  />
                  <TextAreaField
                    label="Antwoord"
                    value={faq.answer}
                    onChange={(v) => {
                      const newItems = [...content.faq.items];
                      newItems[index] = { ...newItems[index], answer: v };
                      setContent({
                        ...content,
                        faq: { ...content.faq, items: newItems },
                      });
                    }}
                    rows={5}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Reusable form components
function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent resize-vertical"
      />
    </div>
  );
}
