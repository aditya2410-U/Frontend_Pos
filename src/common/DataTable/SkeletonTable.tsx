import { Skeleton } from "@/common/@atoms/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonTableProps {
  /** Number of columns to display */
  columnCount?: number;
  /** Number of rows to display */
  rowCount?: number;
  /** Custom class name */
  className?: string;
  /** Show search bar skeleton */
  showSearch?: boolean;
  /** Show pagination skeleton */
  showPagination?: boolean;
}

export function SkeletonTable({
  columnCount = 10,
  rowCount = 10,
  className,
  showSearch = false,
  showPagination = false,
}: SkeletonTableProps) {
  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Search Bar */}
      {showSearch && (
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-9 w-full max-w-xs bg-gray-200 dark:bg-muted/40" />
          <Skeleton className="h-9 w-24 bg-gray-200 dark:bg-muted/40" />
        </div>
      )}

      {/* Table Container */}
      <div className="border-t border-border bg-background  overflow-hidden">
        {/* Header Row */}
        <div className="border-b border-border bg-muted/80">
          <div className="flex gap-3 px-4 py-2.5">
            {Array.from({ length: columnCount }).map((_, i) => (
              <div
                key={`header-${i}`}
                className={cn("flex-1", i === 0 && "min-w-[150px]")}
              >
                <Skeleton className="h-2.5 w-16 bg-gray-200 dark:bg-muted/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Body Rows */}
        <div className="divide-y divide-border">
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
            >
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={cn(
                    "flex-1 flex items-center",
                    colIndex === 0 && "min-w-[150px]"
                  )}
                >
                  {colIndex === columnCount - 1 ? (
                    // Last column - action buttons
                    <div className="flex gap-1.5 ml-auto">
                      <Skeleton className="h-6 w-6 rounded bg-muted" />
                      <Skeleton className="h-6 w-6 rounded bg-muted" />
                    </div>
                  ) : (
                    // Regular cells - all uniform size
                    <Skeleton className="h-2.5 w-20  bg-muted" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-32 bg-gray-200 dark:bg-muted/40" />
          <div className="flex gap-1.5">
            <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-muted/40" />
            <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-muted/40" />
            <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-muted/40" />
            <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-muted/40" />
            <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-muted/40" />
          </div>
        </div>
      )}
    </div>
  );
}
