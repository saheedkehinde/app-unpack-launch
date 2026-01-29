"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EventCardProps {
  title: string
  subtitle?: string
  date?: string
  price?: string
  image: string
  href: string
  actionLabel?: string
  secondaryLabel?: string
  secondaryHref?: string
  variant?: "featured" | "compact" | "horizontal"
  className?: string
}

export function EventCard({
  title,
  subtitle,
  date,
  price,
  image,
  href,
  actionLabel = "Book Now",
  secondaryLabel = "View Details",
  secondaryHref,
  variant = "featured",
  className,
}: EventCardProps) {
  if (variant === "horizontal") {
    return (
      <div className={cn("flex gap-4 p-3 bg-card rounded-2xl shadow-sm border border-border", className)}>
        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <h3 className="font-serif text-base font-semibold text-card-foreground truncate">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
          {(date || price) && (
            <p className="text-xs text-muted-foreground mt-1">
              {date}{date && price && " | "}{price}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <Link href={href} className={cn("block group", className)}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-serif text-lg font-semibold text-white">{title}</h3>
            {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className={cn("relative rounded-2xl overflow-hidden group card-hover", className)}>
      {/* Image with gradient overlay */}
      <div className="relative aspect-[4/3]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-serif text-2xl font-bold text-white mb-1 text-balance drop-shadow-lg">{title}</h3>
        {(date || price) && (
          <p className="text-sm text-white/80 mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </span>
            {date && price && <span className="text-accent">|</span>}
            {price && <span className="text-accent font-medium">{price}</span>}
          </p>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 h-10 text-sm font-medium shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:scale-105 active:scale-95"
          >
            <Link href={href}>{actionLabel}</Link>
          </Button>
          {secondaryLabel && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="bg-transparent border-2 border-white/50 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm rounded-full px-5 h-10 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Link href={secondaryHref || href}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
