"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Clock, ArrowUpRight } from "lucide-react"

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/bookings", label: "Book Event" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/rooms", label: "Rooms & Lodging" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground hidden md:block">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-accent">
                TIMAK CENTRE
              </h3>
              <p className="text-accent/60 text-sm mt-1 tracking-widest uppercase">
                Luxury Events & Hospitality
              </p>
            </div>
            <p className="text-sidebar-foreground/60 text-sm leading-relaxed max-w-sm">
              Experience luxury at Ilorin&apos;s premier destination for weddings, 
              corporate events, fine dining, and premium lodging. Where moments 
              become timeless.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/timakcentre"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 text-sidebar-foreground/70 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=%2B2348061723069"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 group"
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-5 h-5 text-sidebar-foreground/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-semibold mb-6 text-accent">
              Navigate
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/60 hover:text-accent transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg font-semibold mb-6 text-accent">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+2348061723069"
                  className="flex items-start gap-3 text-sm text-sidebar-foreground/60 hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block">08061723069</span>
                    <span className="block">09155852386</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info.timakcentre@gmail.com"
                  className="flex items-start gap-3 text-sm text-sidebar-foreground/60 hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="pt-1.5">info.timakcentre@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://share.google/KYEiIF6kNUWgRMvHK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-sidebar-foreground/60 hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="pt-1.5">ITA-ALAMU, Ajase-Ipo Road, Ilorin, Kwara State</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg font-semibold mb-6 text-accent">
              Hours
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div className="text-sm text-sidebar-foreground/60">
                  <p className="font-medium text-sidebar-foreground/80">Event Halls</p>
                  <p>Available 24/7 for bookings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div className="text-sm text-sidebar-foreground/60">
                  <p className="font-medium text-sidebar-foreground/80">Restaurant</p>
                  <p>8:00 AM - 10:00 PM Daily</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div className="text-sm text-sidebar-foreground/60">
                  <p className="font-medium text-sidebar-foreground/80">Reception</p>
                  <p>24 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sidebar-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-sidebar-foreground/40">
              &copy; {new Date().getFullYear()} TIMAK CENTRE. All rights reserved.
            </p>
            <p className="text-xs text-accent/60 italic font-serif">
              &ldquo;Where Moments Become Timeless&rdquo;
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
