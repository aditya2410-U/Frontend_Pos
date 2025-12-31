import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/common/@atoms/sidebar";
import { OrganizationDropdown } from "./OrganizationDropdown";

interface SidebarHeaderComponentProps {
  organizationName: string;
  onLogout: () => void;
}

export function SidebarHeaderComponent({
  organizationName,
  onLogout,
}: SidebarHeaderComponentProps) {
  return (
    <SidebarHeader className="">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 w-full border-b border-border/60">
            <OrganizationDropdown
              organizationName={organizationName}
              onLogout={onLogout}
            />
            <SidebarTrigger className="size-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors shrink-0 h-14" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
