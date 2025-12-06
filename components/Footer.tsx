import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import type { SiteSettings } from "@/lib/content";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const { phone, email, address } = settings;

  return (
    <footer className="bg-main-dark py-8 md:py-10">
      <div className="content-container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo-footer.png"
              alt="Remco Vos Fysio"
              width={40}
              height={40}
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-text-on-dark/80 hover:text-text-on-dark transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="font-body text-footer">{phone}</span>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-text-on-dark/80 hover:text-text-on-dark transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span className="font-body text-footer">{email}</span>
              </a>
            )}

            {address && (
              <div className="flex items-center gap-2 text-text-on-dark/80">
                <MapPin className="w-4 h-4" />
                <span className="font-body text-footer">{address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
