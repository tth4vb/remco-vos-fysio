"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/content";

interface HeaderProps {
  settings: SiteSettings;
}

export default function Header({ settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-main-dark/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Gradient overlay when not scrolled */}
      {!isScrolled && (
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
      )}

      <div className="content-container-wide relative">
        <nav className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo-white.png"
              alt={settings.logoText}
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-text-on-dark text-lg font-semibold leading-tight tracking-wide">
                {settings.logoText}
              </span>
              <span className="font-body text-text-on-dark/80 text-xs tracking-widest italic">
                {settings.logoSubtext}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {settings.navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetId)}
                className="font-body text-nav text-text-on-dark uppercase tracking-widest hover:text-accent-orange transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}

            {/* WhatsApp/Phone Icon */}
            {settings.whatsappUrl && (
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-text-on-dark/10 flex items-center justify-center hover:bg-accent-orange transition-colors duration-200"
                aria-label="Contact via WhatsApp"
              >
                <Phone className="w-4 h-4 text-text-on-dark" />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-text-on-dark transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text-on-dark transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text-on-dark transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute left-0 right-0 bg-main-dark/95 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-80 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-5">
            {settings.navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetId)}
                className="font-body text-nav text-text-on-dark uppercase tracking-widest text-left py-2 hover:text-accent-orange transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            {settings.whatsappUrl && (
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-nav text-text-on-dark uppercase tracking-widest py-2 hover:text-accent-orange transition-colors duration-200"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
