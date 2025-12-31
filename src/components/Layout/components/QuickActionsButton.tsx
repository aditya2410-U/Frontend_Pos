import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/common/@atoms/sidebar";
import { IconBolt } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Kbd } from "@/common/@atoms/kbd";

interface QuickActionsButtonProps {
  onOpen: () => void;
}

export function QuickActionsButton({ onOpen }: QuickActionsButtonProps) {
  return (
    <SidebarGroup className="mb-0 p-0 pb-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Quick actions"
              onClick={onOpen}
              className={cn(
                "h-9 rounded-lg transition-all duration-150 w-full justify-between mb-0",
                "text-muted-foreground hover:text-foreground hover:bg-muted font-medium"
              )}
            >
              <div className="flex items-center gap-2">
                <IconBolt className="size-4" stroke={1} />
                <span>Quick actions</span>
              </div>
              <Kbd className="text-xs">⌘K</Kbd>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
