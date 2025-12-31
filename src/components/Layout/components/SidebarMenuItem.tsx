import { Link } from "react-router-dom";
import {
  SidebarMenuButton,
  SidebarMenuItem as SidebarMenuItemPrimitive,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/common/@atoms/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/@atoms/collapsible";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { SidebarMenuItem as SidebarMenuItemType } from "../constants";
import { useState } from "react";
import { DEFAULT_TAGS } from "@/common/DataTable/constants";

interface SidebarMenuItemProps {
  item: SidebarMenuItemType;
  isActive: (url: string) => boolean;
}

export function SidebarMenuItem({ item, isActive }: SidebarMenuItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  // Check if any child is active
  const isChildActive =
    hasChildren && item.children?.some((child) => isActive(child.url));
  const itemActive = isActive(item.url) || isChildActive;

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItemPrimitive>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={itemActive}
              className={cn(
                "h-6 transition-all duration-150 text-[14px]  justify-between",
                itemActive
                  ? "text-foreground font-medium"
                  : "text-foreground hover:text-foreground hover:bg-muted font-medium"
              )}
            >
              <DEFAULT_TAGS.DIV className="flex items-center gap-2 flex-1">
                <item.icon className="size-4" stroke={1} />
                <span>{item.title}</span>
                <IconChevronRight
                  className={cn(
                    "size-3 transition-transform duration-200 shrink-0",
                    isOpen && "rotate-90"
                  )}
                  stroke={1.5}
                />
              </DEFAULT_TAGS.DIV>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children?.map((child) => (
                <SidebarMenuSubItem key={child.url}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive(child.url)}
                    className={cn(
                      "h-6 transition-all duration-150 text-[14px] ",
                      isActive(child.url)
                        ? "text-foreground font-medium"
                        : "text-foreground hover:text-foreground hover:bg-muted font-medium"
                    )}
                  >
                    <Link to={child.url}>
                      <child.icon className="size-4" stroke={1} />
                      <span>{child.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItemPrimitive>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItemPrimitive>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        isActive={itemActive}
        className={cn(
          "h-6 transition-all duration-150 text-[14px]",
          itemActive
            ? "text-foreground font-medium"
            : "text-foreground hover:text-foreground hover:bg-muted font-medium"
        )}
      >
        <Link to={item.url}>
          <item.icon className="size-4" stroke={1} />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItemPrimitive>
  );
}
