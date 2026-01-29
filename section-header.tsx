import React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
  align?: "left" | "center"
  dark?: boolean
}

export function SectionHeader({ 
  icon, 
  title, 
  subtitle, 
  action, 
  className,
  align = "left",
  dark = false
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "flex items-start justify-between gap-4 mb-6",
      align === "center" && "flex-col items-center text-center",
      className
    )}>
      <div className={cn(align === "center" && "flex flex-col items-center")}>
        <div className="flex items-center gap-2 mb-1">
          {icon && (
            <span className={cn("text-accent", dark && "text-accent")}>{icon}</span>
          )}
          <h2 className={cn(
            "font-serif text-xl font-semibold",
            dark ? "text-white" : "text-foreground"
          )}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className={cn(
            "text-sm",
            dark ? "text-white/70" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
