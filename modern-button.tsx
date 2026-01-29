import React from "react"
import { cn } from "@/lib/utils"

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  children: React.ReactNode
  isLoading?: boolean
}

export function ModernButton({
  variant = "primary",
  size = "md",
  icon,
  children,
  isLoading,
  className,
  ...props
}: ModernButtonProps) {
  return (
    <button
      className={cn(
        "relative font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 hover:scale-105",
        // Base padding by size
        size === "sm" && "px-4 h-9 text-sm",
        size === "md" && "px-6 h-11 text-base",
        size === "lg" && "px-8 h-12 text-lg",
        // Variants
        variant === "primary" && "light:bg-primary light:text-white light:shadow-lg light:shadow-primary/30 light:hover:shadow-primary/50 dark:bg-primary dark:text-white dark:shadow-lg dark:shadow-primary/20 dark:hover:shadow-primary/40",
        variant === "secondary" && "light:bg-gray-700 light:text-white light:hover:bg-gray-800 dark:bg-sidebar dark:text-sidebar-foreground dark:hover:bg-sidebar-accent",
        variant === "outline" && "light:border-2 light:border-primary light:text-primary light:hover:bg-primary/10 dark:border-2 dark:border-accent dark:text-accent dark:hover:bg-accent/10 bg-transparent",
        variant === "ghost" && "light:text-primary light:hover:bg-primary/10 dark:text-accent dark:hover:bg-accent/10 bg-transparent",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {icon && <span className="flex items-center justify-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}
