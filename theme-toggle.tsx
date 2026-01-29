'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component only renders on client to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative h-10 w-10 md:h-10 md:w-10 rounded-lg light:bg-primary/10 light:hover:bg-primary/20 light:text-primary dark:bg-sidebar-accent dark:hover:bg-sidebar-accent/80 dark:text-accent transition-all duration-300 flex items-center justify-center"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current mode: ${isDark ? 'Dark' : 'Light'}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={cn(
            'w-5 h-5 transition-all duration-300 absolute',
            isDark
              ? 'scale-0 opacity-0 -rotate-90'
              : 'scale-100 opacity-100 rotate-0'
          )}
        />
        <Moon
          className={cn(
            'w-5 h-5 transition-all duration-300 absolute',
            isDark
              ? 'scale-100 opacity-100 rotate-0'
              : 'scale-0 opacity-0 rotate-90'
          )}
        />
      </div>
      <span className="sr-only">Toggle theme between light and dark mode</span>
    </Button>
  )
}
