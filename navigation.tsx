"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "light:bg-white light:shadow-lg light:border-b light:border-border dark:bg-sidebar/95 dark:backdrop-blur-xl dark:shadow-lg dark:border-b dark:border-sidebar-border"
          : "light:bg-white/80 light:backdrop-blur-md dark:bg-gradient-to-b dark:from-black/50 dark:to-transparent"
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className={cn(
              "font-serif text-xl font-bold tracking-wide transition-all duration-300",
              isScrolled 
                ? "light:bg-gradient-to-r light:from-foreground light:via-primary light:to-foreground light:bg-clip-text light:text-transparent dark:text-accent" 
                : "light:bg-gradient-to-r light:from-foreground light:via-primary light:to-foreground light:bg-clip-text light:text-transparent dark:text-white dark:group-hover:text-accent"
            )}>
              TIMAK CENTRE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                  pathname === link.href
                    ? "light:text-primary dark:text-accent"
                    : "light:text-gray-700 light:hover:text-primary dark:text-sidebar-foreground/70 dark:hover:text-sidebar-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full light:bg-primary dark:bg-accent")} />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle - Mobile */}
          <div className="flex lg:hidden">
            <ThemeToggle />
          </div>

          {/* CTA Button & Theme Toggle - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="light:bg-primary light:text-white light:hover:bg-primary/90 light:shadow-lg light:shadow-primary/30 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/30 rounded-full h-11 px-6 font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Link href="/bookings">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "transition-all duration-300 h-10 w-10 rounded-xl light:text-primary dark:text-sidebar-foreground",
                  isScrolled 
                    ? "light:hover:bg-primary/10 dark:hover:bg-sidebar-accent" 
                    : "light:hover:bg-primary/10 dark:hover:bg-white/10 backdrop-blur-sm"
                )}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 sm:w-96 bg-sidebar/95 backdrop-blur-xl border-sidebar-border border-l rounded-l-3xl p-6 shadow-2xl"
            >
              <div className="flex flex-col h-screen">

                {/* Mobile Links */}
                <div className="flex-1 py-6 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl",
                        pathname === link.href
                          ? "text-accent bg-accent/15"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Footer */}
                <div className="pt-6 border-t border-sidebar-border space-y-3">
                  <Button
                    asChild
                    className="w-full light:bg-primary light:text-white dark:bg-primary dark:text-primary-foreground light:hover:bg-primary/90 dark:hover:bg-primary/90 rounded-xl h-11 font-semibold shadow-lg light:shadow-primary/30 dark:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Link href="/bookings" onClick={() => setIsOpen(false)}>
                      Book an Event
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full light:border-primary light:text-primary light:hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 dark:hover:border-accent rounded-xl h-11 font-medium bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <a href="tel:+2348061723069">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
