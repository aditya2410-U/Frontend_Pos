import { SidebarFooter } from "@/common/@atoms/sidebar";

interface SidebarFooterProps {
  settingsUrl: string;
  isSettingsActive: boolean;
  onLogout: () => void;
  t: (key: string) => string;
}

export function SidebarFooterComponent(_props: SidebarFooterProps) {
  return (
    <SidebarFooter className="p-3 border-t border-border/60"></SidebarFooter>
  );
}
