import { Link, useLocation } from "react-router-dom";
import { Home, CalendarDays, Utensils, ClipboardList, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/bookings", icon: CalendarDays, label: "Events" },
  { href: "/restaurant", icon: Utensils, label: "Dine" },
  { href: "/gallery", icon: ImageIcon, label: "Gallery" },
  { href: "/my-bookings", icon: ClipboardList, label: "Bookings" },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background/98 to-background/95 backdrop-blur-xl border-t border-border/50 pb-safe">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-300 min-w-[60px]",
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-2xl transition-all duration-300",
                    isActive && "bg-accent/20 shadow-lg shadow-accent/20"
                  )}
                >
                  <Icon className={cn("w-5 h-5 transition-transform duration-300", isActive && "scale-110")} />
                </div>
                <span className={cn(
                  "text-[9px] font-semibold uppercase tracking-wide transition-all duration-300",
                  isActive && "text-accent"
                )}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
