import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import timakLogo from "@/assets/timak-logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/bookings", label: "Bookings" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-b from-black/70 via-black/50 to-transparent backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Logo + Brand */}
            <Link to="/" className="flex items-center gap-2.5">
              <img src={timakLogo} alt="TIMAK CENTRE" className="w-12 h-12 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-base font-bold bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent tracking-wide">TIMAK</span>
                <span className="text-[9px] text-white/60 font-medium tracking-[0.2em] uppercase">Centre</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent",
                    location.pathname === link.href
                      ? "text-accent"
                      : "text-white/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation - Slide from right */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed top-16 right-3 z-50 bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 w-[220px]">
                {/* Logo + Brand Header */}
                <div className="flex items-center gap-2.5 mb-4 px-1">
                  <img src={timakLogo} alt="TIMAK CENTRE" className="w-10 h-10 object-contain" />
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-sm font-bold bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent tracking-wide">TIMAK</span>
                    <span className="text-[8px] text-white/60 font-medium tracking-[0.2em] uppercase">Centre</span>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#b88a2e]/30 to-transparent mb-3" />

                <div className="flex flex-col gap-1.5">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block py-2.5 px-3 rounded-xl text-sm font-medium transition-all border",
                          location.pathname === link.href
                            ? "text-[#ffee9a] bg-gradient-to-r from-[#b88a2e]/20 to-[#ffee9a]/10 border-[#b88a2e]/40 shadow-sm shadow-[#b88a2e]/10"
                            : "text-white/80 border-[#b88a2e]/15 hover:border-[#b88a2e]/30 hover:bg-[#b88a2e]/10 hover:text-[#ffee9a]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4"
                >
                  <Button
                    className="btn-book-now w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}