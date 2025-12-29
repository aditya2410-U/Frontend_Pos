import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/common/@atoms/sidebar";
import Header from "./Header";
import { AppSidebar } from "./AppSidebar";
import { AppBreadcrumbs } from "./AppBreadcrumbs";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <AppBreadcrumbs />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
