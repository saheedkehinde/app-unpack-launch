"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReservationCardProps {
  title: string
  subtitle?: string
  image: string
  href: string
  actionLabel?: string
  variant?: "featured" | "compact" | "horizontal"
  className?: string
}

export function ReservationCard({
  title,
  subtitle,
  image,
  href,
  actionLabel = "Reserve Now",
  variant = "featured",
  className,
}: ReservationCardProps) {
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
        {subtitle && (
          <p className="text-sm text-white/80 mb-4">
            {subtitle}
          </p>
        )}
        
        {/* Action button */}
        <Button
          asChild
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 h-10 text-sm font-medium shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:scale-105 active:scale-95"
        >
          <Link href={href}>{actionLabel}</Link>
        </Button>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
