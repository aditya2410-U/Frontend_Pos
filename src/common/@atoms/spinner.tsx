import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "size-4 border-[2px]",
    md: "size-6 border-[3px]",
    lg: "size-8 border-[3px]",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "rounded-full border-solid border-muted border-t-primary animate-spin",
          sizeClasses[size]
        )}
        style={{
          animation: "spin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export { Spinner };
