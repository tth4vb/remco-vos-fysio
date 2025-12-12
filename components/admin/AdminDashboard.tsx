"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, LogOut, ChevronDown, ChevronUp, Eye, Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Download } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import ImageUpload from "./ImageUpload";
import BlobUsageWarning from "./BlobUsageWarning";
import HeroPreview from "./previews/HeroPreview";
import ServicePreview from "./previews/ServicePreview";
import AboutPreview from "./previews/AboutPreview";

interface AdminDashboardProps {
  initialContent: SiteContent;
}

type Section = "settings" | "hero" | "services" | "about" | "faq" | "pricing" | "hours" | "announcement" | "navigation" | "whatsapp";

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

  const handleDownloadBackup = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    const date = new Date().toISOString().split("T")[0];
    link.download = `content-backup-${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const addService = () => {
    const newId = String(Date.now());
    const newService = {
      id: newId,
      title: "Nieuwe dienst",
      image: "",
      description: "",
    };
    setContent({
      ...content,
      services: {
        ...content.services,
        items: [...content.services.items, newService],
      },
    });
  };

  const deleteService = (index: number) => {
    const newItems = content.services.items.filter((_, i) => i !== index);
    setContent({
      ...content,
      services: { ...content.services, items: newItems },
    });
  };

  const addFaq = () => {
    const newId = String(Date.now());
    const newFaq = {
      id: newId,
      title: "Nieuwe FAQ",
      answer: "",
    };
    setContent({
      ...content,
      faq: {
        ...content.faq,
        items: [...content.faq.items, newFaq],
      },
    });
  };

  const deleteFaq = (index: number) => {
    const newItems = content.faq.items.filter((_, i) => i !== index);
    setContent({
      ...content,
      faq: { ...content.faq, items: newItems },
    });
  };

  const addPricing = () => {
    const newId = String(Date.now());
    const newPricing = {
      id: newId,
      service: "Nieuwe dienst",
      duration: "",
      price: 0,
    };
    setContent({
      ...content,
      pricing: {
        ...content.pricing,
        items: [...content.pricing.items, newPricing],
      },
    });
  };

  const deletePricing = (index: number) => {
    const newItems = content.pricing.items.filter((_, i) => i !== index);
    setContent({
      ...content,
      pricing: { ...content.pricing, items: newItems },
    });
  };

  const moveNavItem = (index: number, direction: "up" | "down") => {
    const newNav = [...content.siteSettings.navigation];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newNav.length) return;

    [newNav[index], newNav[newIndex]] = [newNav[newIndex], newNav[index]];
    setContent({
      ...content,
      siteSettings: { ...content.siteSettings, navigation: newNav },
    });
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
              onClick={handleDownloadBackup}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
              title="Download backup"
            >
              <Download className="w-4 h-4" />
            </button>
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
        {/* Blob Usage Warning */}
        <BlobUsageWarning />

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
              <HeroPreview data={content.hero} />
              <ImageUpload
                label="Achtergrond afbeelding"
                value={content.hero.backgroundImage}
                onChange={(url) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, backgroundImage: url },
                  })
                }
                aspectRatio="aspect-[21/9]"
              />
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Dienst {index + 1}</span>
                    <button
                      onClick={() => deleteService(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Verwijderen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="max-w-[200px]">
                    <ServicePreview service={service} />
                  </div>
                  <ImageUpload
                    label="Afbeelding"
                    value={service.image}
                    onChange={(url) => {
                      const newItems = [...content.services.items];
                      newItems[index] = { ...newItems[index], image: url };
                      setContent({
                        ...content,
                        services: { ...content.services, items: newItems },
                      });
                    }}
                    aspectRatio="aspect-[4/3]"
                  />
                  <InputField
                    label="Titel"
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
              <button
                onClick={addService}
                className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-accent-orange hover:text-accent-orange transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nieuwe dienst toevoegen
              </button>
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Over Mij" section="about" />
          {expandedSections.has("about") && (
            <div className="p-6 space-y-4">
              <div className="max-w-[250px]">
                <AboutPreview data={content.about} />
              </div>
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
              <ImageUpload
                label="Portret afbeelding"
                value={content.about.image}
                onChange={(url) =>
                  setContent({
                    ...content,
                    about: { ...content.about, image: url },
                  })
                }
                aspectRatio="aspect-[4/3]"
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">FAQ {index + 1}</span>
                    <button
                      onClick={() => deleteFaq(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Verwijderen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <InputField
                    label="Titel"
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
              <button
                onClick={addFaq}
                className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-accent-orange hover:text-accent-orange transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nieuwe FAQ toevoegen
              </button>
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Tarieven" section="pricing" />
          {expandedSections.has("pricing") && (
            <div className="p-6 space-y-4">
              <InputField
                label="Sectie Titel"
                value={content.pricing.title}
                onChange={(v) =>
                  setContent({
                    ...content,
                    pricing: { ...content.pricing, title: v },
                  })
                }
              />

              {/* Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 font-medium text-gray-700">Dienst</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-700">Duur</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-700">Prijs (€)</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.pricing.items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={item.service}
                            onChange={(e) => {
                              const newItems = [...content.pricing.items];
                              newItems[index] = { ...newItems[index], service: e.target.value };
                              setContent({
                                ...content,
                                pricing: { ...content.pricing, items: newItems },
                              });
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-accent-orange"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={item.duration}
                            onChange={(e) => {
                              const newItems = [...content.pricing.items];
                              newItems[index] = { ...newItems[index], duration: e.target.value };
                              setContent({
                                ...content,
                                pricing: { ...content.pricing, items: newItems },
                              });
                            }}
                            placeholder="bv. 30 min"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-accent-orange"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => {
                              const newItems = [...content.pricing.items];
                              newItems[index] = { ...newItems[index], price: Number(e.target.value) };
                              setContent({
                                ...content,
                                pricing: { ...content.pricing, items: newItems },
                              });
                            }}
                            className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-accent-orange"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <button
                            onClick={() => deletePricing(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Verwijderen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={addPricing}
                className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-accent-orange hover:text-accent-orange transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nieuw tarief toevoegen
              </button>

              <TextAreaField
                label="Extra opmerking (optioneel)"
                value={content.pricing.note}
                onChange={(v) =>
                  setContent({
                    ...content,
                    pricing: { ...content.pricing, note: v },
                  })
                }
                rows={2}
              />
            </div>
          )}
        </div>

        {/* Opening Hours Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Openingstijden" section="hours" />
          {expandedSections.has("hours") && (
            <div className="p-6 space-y-4">
              <InputField
                label="Sectie Titel"
                value={content.openingHours.title}
                onChange={(v) =>
                  setContent({
                    ...content,
                    openingHours: { ...content.openingHours, title: v },
                  })
                }
              />

              {/* Hours Table */}
              <div className="space-y-2">
                {content.openingHours.days.map((day, index) => (
                  <div
                    key={day.day}
                    className={`p-3 rounded-lg border ${
                      day.open ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="w-24 font-medium text-gray-700">{day.day}</div>

                      {/* Open Toggle */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={day.open}
                          onChange={(e) => {
                            const newDays = [...content.openingHours.days];
                            newDays[index] = { ...newDays[index], open: e.target.checked };
                            setContent({
                              ...content,
                              openingHours: { ...content.openingHours, days: newDays },
                            });
                          }}
                          className="w-4 h-4 text-accent-orange rounded focus:ring-accent-orange"
                        />
                        <span className="text-sm text-gray-600">Open</span>
                      </label>

                      {day.open && (
                        <>
                          {/* By Appointment Toggle */}
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={day.byAppointment}
                              onChange={(e) => {
                                const newDays = [...content.openingHours.days];
                                newDays[index] = { ...newDays[index], byAppointment: e.target.checked };
                                setContent({
                                  ...content,
                                  openingHours: { ...content.openingHours, days: newDays },
                                });
                              }}
                              className="w-4 h-4 text-accent-orange rounded focus:ring-accent-orange"
                            />
                            <span className="text-sm text-gray-600">Op afspraak</span>
                          </label>

                          {!day.byAppointment && (
                            <div className="flex items-center gap-2">
                              <select
                                value={day.openTime}
                                onChange={(e) => {
                                  const newDays = [...content.openingHours.days];
                                  newDays[index] = { ...newDays[index], openTime: e.target.value };
                                  setContent({
                                    ...content,
                                    openingHours: { ...content.openingHours, days: newDays },
                                  });
                                }}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-accent-orange"
                              >
                                {generateTimeOptions().map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                              <span className="text-gray-500">-</span>
                              <select
                                value={day.closeTime}
                                onChange={(e) => {
                                  const newDays = [...content.openingHours.days];
                                  newDays[index] = { ...newDays[index], closeTime: e.target.value };
                                  setContent({
                                    ...content,
                                    openingHours: { ...content.openingHours, days: newDays },
                                  });
                                }}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-accent-orange"
                              >
                                {generateTimeOptions().map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </>
                      )}

                      {!day.open && (
                        <span className="text-sm text-gray-500 italic">Gesloten</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Announcement Banner Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Afwezigheid / Vakantie Banner" section="announcement" />
          {expandedSections.has("announcement") && (
            <div className="p-6 space-y-4">
              {/* Preview */}
              {content.announcement.enabled && content.announcement.message && (
                <div
                  className={`p-3 rounded-lg text-center text-white text-sm ${
                    content.announcement.backgroundColor === "orange"
                      ? "bg-accent-orange"
                      : content.announcement.backgroundColor === "red"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                >
                  {content.announcement.message}
                </div>
              )}

              {/* Enable Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.announcement.enabled}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      announcement: { ...content.announcement, enabled: e.target.checked },
                    })
                  }
                  className="w-5 h-5 text-accent-orange rounded focus:ring-accent-orange"
                />
                <span className="font-medium text-gray-700">Banner tonen op website</span>
              </label>

              {content.announcement.enabled && (
                <>
                  <TextAreaField
                    label="Bericht"
                    value={content.announcement.message}
                    onChange={(v) =>
                      setContent({
                        ...content,
                        announcement: { ...content.announcement, message: v },
                      })
                    }
                    rows={2}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start datum (optioneel)
                      </label>
                      <input
                        type="date"
                        value={content.announcement.startDate}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            announcement: { ...content.announcement, startDate: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Eind datum (optioneel)
                      </label>
                      <input
                        type="date"
                        value={content.announcement.endDate}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            announcement: { ...content.announcement, endDate: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Achtergrondkleur
                    </label>
                    <div className="flex gap-3">
                      {[
                        { value: "orange", label: "Oranje", className: "bg-accent-orange" },
                        { value: "red", label: "Rood", className: "bg-red-500" },
                        { value: "blue", label: "Blauw", className: "bg-blue-500" },
                      ].map((color) => (
                        <label
                          key={color.value}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
                            content.announcement.backgroundColor === color.value
                              ? "border-gray-800"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="bannerColor"
                            value={color.value}
                            checked={content.announcement.backgroundColor === color.value}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                announcement: { ...content.announcement, backgroundColor: e.target.value },
                              })
                            }
                            className="sr-only"
                          />
                          <span className={`w-4 h-4 rounded ${color.className}`}></span>
                          <span className="text-sm text-gray-700">{color.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Tip: Laat datums leeg om de banner altijd te tonen (totdat je hem uitzet).
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="Navigatie Menu" section="navigation" />
          {expandedSections.has("navigation") && (
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Pas de volgorde aan, wijzig labels, of verberg menu-items.
              </p>

              <div className="space-y-2">
                {content.siteSettings.navigation.map((navItem, index) => (
                  <div
                    key={navItem.id}
                    className={`p-3 rounded-lg border ${
                      navItem.visible ? "bg-white border-gray-200" : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Reorder buttons */}
                      <div className="flex flex-col">
                        <button
                          onClick={() => moveNavItem(index, "up")}
                          disabled={index === 0}
                          className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          title="Omhoog"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveNavItem(index, "down")}
                          disabled={index === content.siteSettings.navigation.length - 1}
                          className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          title="Omlaag"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Grip icon */}
                      <GripVertical className="w-4 h-4 text-gray-300" />

                      {/* Label input */}
                      <input
                        type="text"
                        value={navItem.label}
                        onChange={(e) => {
                          const newNav = [...content.siteSettings.navigation];
                          newNav[index] = { ...newNav[index], label: e.target.value };
                          setContent({
                            ...content,
                            siteSettings: { ...content.siteSettings, navigation: newNav },
                          });
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-accent-orange"
                      />

                      {/* Target ID (read-only info) */}
                      <span className="text-xs text-gray-400 w-20">
                        #{navItem.targetId}
                      </span>

                      {/* Visible toggle */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={navItem.visible}
                          onChange={(e) => {
                            const newNav = [...content.siteSettings.navigation];
                            newNav[index] = { ...newNav[index], visible: e.target.checked };
                            setContent({
                              ...content,
                              siteSettings: { ...content.siteSettings, navigation: newNav },
                            });
                          }}
                          className="w-4 h-4 text-accent-orange rounded focus:ring-accent-orange"
                        />
                        <span className="text-sm text-gray-600">Zichtbaar</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Button Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SectionHeader title="WhatsApp Knop" section="whatsapp" />
          {expandedSections.has("whatsapp") && (
            <div className="p-6 space-y-4">
              {/* Enable Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.whatsappButton.enabled}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whatsappButton: { ...content.whatsappButton, enabled: e.target.checked },
                    })
                  }
                  className="w-5 h-5 text-accent-orange rounded focus:ring-accent-orange"
                />
                <span className="font-medium text-gray-700">WhatsApp knop tonen op website</span>
              </label>

              {content.whatsappButton.enabled && (
                <>
                  <InputField
                    label="Telefoonnummer (zonder + of 0)"
                    value={content.whatsappButton.phoneNumber}
                    onChange={(v) =>
                      setContent({
                        ...content,
                        whatsappButton: { ...content.whatsappButton, phoneNumber: v },
                      })
                    }
                  />

                  <TextAreaField
                    label="Vooraf ingevuld bericht"
                    value={content.whatsappButton.prefilledMessage}
                    onChange={(v) =>
                      setContent({
                        ...content,
                        whatsappButton: { ...content.whatsappButton, prefilledMessage: v },
                      })
                    }
                    rows={2}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Positie op scherm
                    </label>
                    <div className="flex gap-4">
                      {[
                        { value: "left", label: "Links onderin" },
                        { value: "right", label: "Rechts onderin" },
                      ].map((pos) => (
                        <label
                          key={pos.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
                            content.whatsappButton.position === pos.value
                              ? "border-accent-orange bg-accent-orange/10"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="whatsappPosition"
                            value={pos.value}
                            checked={content.whatsappButton.position === pos.value}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                whatsappButton: {
                                  ...content.whatsappButton,
                                  position: e.target.value as "left" | "right",
                                },
                              })
                            }
                            className="sr-only"
                          />
                          <span className="text-sm text-gray-700">{pos.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    De WhatsApp knop zweeft altijd zichtbaar onderin het scherm.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper function to generate time options
function generateTimeOptions(): string[] {
  const times: string[] = [];
  for (let hour = 6; hour <= 23; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    times.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return times;
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
