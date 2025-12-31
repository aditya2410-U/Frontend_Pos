import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/common/@atoms/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/@atoms/collapsible";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import CustomText from "@/common/@atoms/Text/CustomText";
import type { SidebarGroup as SidebarGroupType } from "../constants";
import { SidebarMenuItem } from "./SidebarMenuItem";

interface CollapsibleGroupProps {
  group: SidebarGroupType;
  isOpen: boolean;
  onToggle: () => void;
  isActive: (url: string) => boolean;
}

export function CollapsibleGroup({
  group,
  isOpen,
  onToggle,
  isActive,
}: CollapsibleGroupProps) {
  return (
    <SidebarGroup className="mb-0 px-2 py-1">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <SidebarGroupLabel className="text-[12px] font-medium text-muted-foreground/70 uppercase tracking-wider px-2 mb-0 mt-0 cursor-pointer hover:text-foreground transition-colors">
            <div className="flex items-center gap-2">
              <IconChevronRight
                className={cn(
                  "size-3 transition-transform duration-200",
                  isOpen && "rotate-90"
                )}
                stroke={1.5}
              />
              <CustomText type="Micro" className="text-muted-foreground">
                {group.label}
              </CustomText>
            </div>
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 ">
              {group.items.map((item) => (
                <SidebarMenuItem
                  key={item.url}
                  item={item}
                  isActive={isActive}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}
