import { SidebarTrigger } from "@/common/@atoms/sidebar";
import { Separator } from "@/common/@atoms/separator";
import { AppBreadcrumbs } from "./AppBreadcrumbs";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <SidebarTrigger className="-ml-2 size-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" />
      <Separator orientation="vertical" className="h-5 bg-border/60" />
      <AppBreadcrumbs />
    </header>
  );
}
