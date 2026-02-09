import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import timakLogo from "@/assets/timak-logo.png";

interface AIChatButtonProps {
  onClick?: () => void;
  className?: string;
}

export function AIChatButton({ onClick, className }: AIChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 shadow-lg animate-pulse-glow p-2",
        className
      )}
      size="icon"
    >
      <img src={timakLogo} alt="Timak AI" className="w-8 h-8 object-contain" />
    </Button>
  );
}
