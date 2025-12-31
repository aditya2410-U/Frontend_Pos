import { Link } from "react-router-dom";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/common/@atoms/sidebar";
import { IconSettings } from "@tabler/icons-react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  settingsUrl: string;
  isSettingsActive: boolean;
  onLogout: () => void;
  t: (key: string) => string;
}

export function SidebarFooterComponent({
  settingsUrl,
  isSettingsActive,
  onLogout,
  t,
}: SidebarFooterProps) {
  return (
    <SidebarFooter className="p-3 border-t border-border/60"></SidebarFooter>
  );
}
