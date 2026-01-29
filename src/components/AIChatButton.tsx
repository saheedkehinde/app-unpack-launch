import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIChatButtonProps {
  onClick?: () => void;
  className?: string;
}

export function AIChatButton({ onClick, className }: AIChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 shadow-lg animate-pulse-glow",
        className
      )}
      size="icon"
    >
      <Sparkles className="w-6 h-6 text-accent-foreground" />
    </Button>
  );
}
