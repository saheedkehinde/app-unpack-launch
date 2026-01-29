import { Link, useLocation } from "react-router-dom";
import { Home, CalendarDays, Utensils, User, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/bookings", icon: CalendarDays, label: "Events" },
  { href: "/restaurant", icon: Utensils, label: "Dine" },
  { href: "/gallery", icon: ImageIcon, label: "Gallery" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-md border-t border-sidebar-border safe-area-inset-bottom">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-accent"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-xl transition-all duration-300",
                    isActive && "bg-accent/20"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
