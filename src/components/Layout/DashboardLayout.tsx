import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/common/@atoms/sidebar";
import Header from "./Header";
import { AppSidebar } from "./AppSidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-auto ">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
