import { Button, type ButtonVariant } from "@/common/@atoms/Button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface PageHeaderAction {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "xl" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
}

export interface PageHeaderProps {
  title: string;
  description: string;
  action?: PageHeaderAction;
  actions?: PageHeaderAction[];
  count?: number;
  className?: string;
  showBorder?: boolean;
  padding?: boolean;
}

export function PageHeader({
  title,
  description,
  action,
  actions,
  count,
  className,
  showBorder = true,
  padding = true,
}: PageHeaderProps) {
  const allActions = action ? [action, ...(actions || [])] : actions || [];

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        showBorder && "",
        padding && "px-6 pt-1",
        className
      )}
    >
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {count !== undefined && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {allActions.length > 0 && (
        <div className="flex items-center gap-2">
          {allActions.map((actionItem, index) => {
            const Icon = actionItem.icon;
            return (
              <Button
                key={index}
                onClick={actionItem.onClick}
                variant={actionItem.variant || "default"}
                size={actionItem.size || "md"}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {actionItem.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
