import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles - Attio design
        "flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2",
        "text-sm text-foreground placeholder:text-muted-foreground",
        "transition-all duration-150 ease-in-out",
        // Focus styles
        "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary",
        // Disabled styles
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        // File input styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Selection styles
        "selection:bg-primary selection:text-primary-foreground",
        // Error styles
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
