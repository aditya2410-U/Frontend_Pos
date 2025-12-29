import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  StoreIcon,
  LogOut,
  SettingsIcon,
  UsersIcon,
  ShieldIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/common/@atoms/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "@/api/queries/useAuth";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    {
      title: t("sidebar.dashboard"),
      icon: LayoutDashboardIcon,
      url: "/dashboard",
    },
    {
      title: t("sidebar.products"),
      icon: PackageIcon,
      url: "/products",
    },
    {
      title: t("sidebar.orders"),
      icon: ShoppingCartIcon,
      url: "/orders",
    },
  ];

  const managementItems = [
    {
      title: t("sidebar.userManagement"),
      icon: UsersIcon,
      url: "/users",
    },
    {
      title: t("sidebar.roles"),
      icon: ShieldIcon,
      url: "/roles",
    },
    {
      title: t("sidebar.outlets"),
      icon: StoreIcon,
      url: "/outlets",
    },
  ];

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

  const MenuItemComponent = ({ item }: { item: (typeof mainMenuItems)[0] }) => {
    const active = isActive(item.url);
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={active}
          className={cn(
            "h-9 rounded-lg transition-all duration-150",
            active
              ? "bg-primary text-primary-foreground font-medium shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Link to={item.url}>
            <item.icon className="size-4" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      {/* Logo Header */}
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="h-10 hover:bg-transparent"
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <StoreIcon className="size-5" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {t("sidebar.posSystem")}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {t("sidebar.adminPanel")}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainMenuItems.map((item) => (
                <MenuItemComponent key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider px-2 mb-1">
            {t("sidebar.administration")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {managementItems.map((item) => (
                <MenuItemComponent key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Settings & Logout */}
      <SidebarFooter className="p-3 border-t border-border/60">
        <SidebarMenu className="gap-1">
          {/* Settings */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={t("sidebar.settings")}
              isActive={isActive("/settings")}
              className={cn(
                "h-9 rounded-lg transition-all duration-150",
                isActive("/settings")
                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Link to="/settings">
                <SettingsIcon className="size-4" />
                <span>{t("sidebar.settings")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t("sidebar.logout")}
              onClick={handleLogout}
              className="h-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-150"
            >
              <LogOut className="size-4" />
              <span>{t("sidebar.logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
