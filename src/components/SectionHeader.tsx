import { ReactNode } from "react";

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ icon, title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
            {icon}
          </div>
        )}
        <h2 className="font-serif text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {action}
    </div>
  );
}
