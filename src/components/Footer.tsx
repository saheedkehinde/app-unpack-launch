import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import timakLogo from "@/assets/timak-logo.png";

export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border mt-8">
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Logo & Description */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={timakLogo} alt="TIMAK CENTRE" className="w-16 h-16 object-contain" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-sidebar-foreground mb-2">TIMAK CENTRE</h3>
          <p className="text-sm text-sidebar-foreground/60 max-w-xs mx-auto">
            Creating unforgettable moments for over 15 years. Your premier destination for events and celebrations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-semibold mb-3 bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/services" className="block text-sm bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent hover:bg-clip-padding hover:text-white hover:bg-gradient-to-r hover:from-[#ffee9a] hover:to-[#b88a2e] hover:px-2 hover:py-0.5 hover:rounded transition-all">Our Services</Link>
              <Link to="/gallery" className="block text-sm bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent hover:bg-clip-padding hover:text-white hover:bg-gradient-to-r hover:from-[#ffee9a] hover:to-[#b88a2e] hover:px-2 hover:py-0.5 hover:rounded transition-all">Gallery</Link>
              <Link to="/bookings" className="block text-sm bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent hover:bg-clip-padding hover:text-white hover:bg-gradient-to-r hover:from-[#ffee9a] hover:to-[#b88a2e] hover:px-2 hover:py-0.5 hover:rounded transition-all">Book Event</Link>
              <Link to="/restaurant" className="block text-sm bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent hover:bg-clip-padding hover:text-white hover:bg-gradient-to-r hover:from-[#ffee9a] hover:to-[#b88a2e] hover:px-2 hover:py-0.5 hover:rounded transition-all">Restaurant</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent">Contact</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
                <MapPin className="w-4 h-4 text-accent" />
                Ilorin, Kwara State
              </p>
              <p className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
                <Phone className="w-4 h-4 text-accent" />
                +234 800 000 0000
              </p>
              <p className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
                <Mail className="w-4 h-4 text-accent" />
                info@timakcentre.com
              </p>
              <p className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
                <Clock className="w-4 h-4 text-accent" />
                Mon - Sun: 8AM - 10PM
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/40">
            © {new Date().getFullYear()} TIMAK CENTRE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
