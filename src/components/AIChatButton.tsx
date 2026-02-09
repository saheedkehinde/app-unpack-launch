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
        "fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#ffee9a] to-[#b88a2e] hover:from-[#ffee9a]/90 hover:to-[#b88a2e]/90 shadow-lg shadow-[#b88a2e]/40 animate-pulse-glow p-2 border-2 border-[#ffee9a]/60",
        className
      )}
      size="icon"
    >
      <img src={timakLogo} alt="Timak AI" className="w-10 h-10 object-contain" />
    </Button>
  );
}
