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
              className="md:hidden fixed top-0 right-0 bottom-0 w-[70%] max-w-[280px] z-50 bg-background/80 backdrop-blur-xl border-l border-white/10 shadow-2xl"
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-8">
                <div className="flex flex-col gap-1">
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
                          "block py-3 px-3 rounded-xl text-base font-medium transition-colors",
                          location.pathname === link.href
                            ? "text-accent bg-accent/10"
                            : "text-foreground/80 hover:text-accent hover:bg-accent/5"
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
                  className="mt-auto"
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