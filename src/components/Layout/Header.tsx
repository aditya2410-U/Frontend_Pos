import { LogOutIcon } from "lucide-react";
import { Button } from "@/common/@atoms/button";
import { Separator } from "@/common/@atoms/separator";
import { SidebarTrigger } from "@/common/@atoms/sidebar";
import { useLogout } from "@/api/queries/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Welcome back!</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOutIcon className="mr-2 size-3" />
          Logout
        </Button>
      </div>
    </header>
  );
}
