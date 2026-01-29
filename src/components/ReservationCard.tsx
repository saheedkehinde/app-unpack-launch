import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReservationCardProps {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  variant?: "horizontal" | "vertical";
}

export function ReservationCard({
  title,
  subtitle,
  image,
  href,
  variant = "horizontal",
}: ReservationCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        to={href}
        className="flex items-center gap-4 p-3 bg-sidebar rounded-2xl border border-sidebar-border hover:bg-sidebar-accent transition-all duration-300 group"
      >
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sidebar-foreground truncate">{title}</h4>
          <p className="text-sm text-sidebar-foreground/60 truncate">{subtitle}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-sidebar-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
      </Link>
    );
  }

  return (
    <Link
      to={href}
      className="block rounded-2xl overflow-hidden card-hover group"
    >
      <div className="aspect-square relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="font-semibold text-white">{title}</h4>
          <p className="text-sm text-white/70">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
