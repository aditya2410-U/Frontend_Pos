import { Sidebar, SidebarContent } from "@/common/@atoms/sidebar";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import QuickActions from "@/components/QuickActions/QuickActions";
import {
  SidebarHeaderComponent,
  QuickActionsButton,
  CollapsibleGroup,
  SidebarFooterComponent,
} from "./components";
import { getSidebarGroups, DEFAULT_OPEN_GROUPS } from "./constants";
import { useLogout } from "@/api/queries/useAuth";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [openGroups, setOpenGroups] =
    useState<Record<string, boolean>>(DEFAULT_OPEN_GROUPS);

  const sidebarGroups = getSidebarGroups(t);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (url: string) => {
    if (url === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(url);
  };

  const toggleGroup = (groupKey: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeaderComponent
        organizationName={user?.organization?.name || ""}
        onLogout={handleLogout}
      />

      <SidebarContent className="gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-auto">
        <QuickActionsButton onOpen={() => setQuickActionsOpen(true)} />

        {sidebarGroups.map((group) => (
          <CollapsibleGroup
            key={group.key}
            group={group}
            isOpen={openGroups[group.key]}
            onToggle={() => toggleGroup(group.key)}
            isActive={isActive}
          />
        ))}
      </SidebarContent>

      <SidebarFooterComponent
        settingsUrl="/settings"
        isSettingsActive={isActive("/settings")}
        onLogout={handleLogout}
        t={t}
      />

      <QuickActions
        open={quickActionsOpen}
        onOpenChange={setQuickActionsOpen}
      />
    </Sidebar>
  );
}
