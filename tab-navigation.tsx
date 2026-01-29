"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  variant?: "pill" | "underline"
  className?: string
}

export function TabNavigation({ tabs, activeTab, onTabChange, variant = "pill", className }: TabNavigationProps) {
  if (variant === "underline") {
    return (
      <div className={cn("flex border-b border-border", className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("inline-flex bg-primary rounded-full p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
            activeTab === tab.id
              ? "bg-white text-primary shadow-sm"
              : "text-primary-foreground/90 hover:text-primary-foreground"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
