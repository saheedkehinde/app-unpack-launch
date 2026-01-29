import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  price: string;
  image: string;
  href: string;
  actionLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function EventCard({
  title,
  date,
  price,
  image,
  href,
  actionLabel = "Book Now",
  secondaryLabel,
  secondaryHref,
}: EventCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden card-hover group">
      {/* Background Image */}
      <div className="aspect-[16/9] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-1 drop-shadow-lg">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-accent" />
                {date}
              </span>
              <span className="text-accent font-semibold">{price}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild size="sm" className="btn-book-now">
              <Link to={href}>{actionLabel}</Link>
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Link to={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/0 group-hover:border-accent/50 transition-colors duration-500" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/0 group-hover:border-white/20 transition-colors duration-500" />
    </div>
  );
}
