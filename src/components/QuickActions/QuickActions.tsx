import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/common/@atoms/command";
import {
  IconLayoutCollage,
  IconPackage,
  IconShoppingCartShare,
  IconUserPlus,
  IconBinaryTree2,
  IconBuildingStore,
  IconSettings,
  IconSearch,
} from "@tabler/icons-react";
import { Kbd } from "@/common/@atoms/kbd";

interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  action: () => void;
  group: string;
}

interface QuickActionsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function QuickActions({
  open: controlledOpen,
  onOpenChange,
}: QuickActionsProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const navigate = useNavigate();

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) {
        onOpenChange(value);
      } else {
        setInternalOpen(value);
      }
    },
    [onOpenChange]
  );

  const quickActions: QuickAction[] = [
    {
      id: "search-records",
      label: "Search records",
      icon: IconSearch,
      shortcut: "/",
      action: () => {
        setOpen(false);
        // Navigate to search or focus search input
      },
      group: "Quick Actions",
    },
    {
      id: "dashboard",
      label: "Go to Dashboard",
      icon: IconLayoutCollage,
      shortcut: "d",
      action: () => {
        setOpen(false);
        navigate("/dashboard");
      },
      group: "Navigation",
    },
    {
      id: "products",
      label: "Go to Products",
      icon: IconPackage,
      shortcut: "p",
      action: () => {
        setOpen(false);
        navigate("/products");
      },
      group: "Navigation",
    },
    {
      id: "orders",
      label: "Go to Orders",
      icon: IconShoppingCartShare,
      shortcut: "o",
      action: () => {
        setOpen(false);
        navigate("/orders");
      },
      group: "Navigation",
    },
    {
      id: "create-user",
      label: "Create User",
      icon: IconUserPlus,
      shortcut: "u",
      action: () => {
        setOpen(false);
        navigate("/users/new");
      },
      group: "Create",
    },
    {
      id: "create-role",
      label: "Create Role",
      icon: IconBinaryTree2,
      shortcut: "r",
      action: () => {
        setOpen(false);
        navigate("/roles/new");
      },
      group: "Create",
    },
    {
      id: "create-outlet",
      label: "Create Outlet",
      icon: IconBuildingStore,
      shortcut: "c",
      action: () => {
        setOpen(false);
        navigate("/outlets/new");
      },
      group: "Create",
    },
    {
      id: "settings",
      label: "Open Settings",
      icon: IconSettings,
      shortcut: "s",
      action: () => {
        setOpen(false);
        navigate("/settings");
      },
      group: "Settings",
    },
  ];

  // Group actions by group
  const groupedActions = quickActions.reduce(
    (acc, action) => {
      if (!acc[action.group]) {
        acc[action.group] = [];
      }
      acc[action.group].push(action);
      return acc;
    },
    {} as Record<string, QuickAction[]>
  );

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Quick Actions"
      description="Search quick actions and records..."
      className="max-w-2xl"
    >
      <CommandInput placeholder="Search quick actions and records..." />
      <CommandList className="flex-1 overflow-auto">
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedActions).map(([groupName, actions]) => (
          <CommandGroup key={groupName} heading={groupName}>
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <CommandItem
                  key={action.id}
                  onSelect={action.action}
                  value={`${action.id} ${action.label} ${action.group}`}
                  className="cursor-pointer"
                >
                  <Icon className="size-4 shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium truncate">
                      {action.label}
                    </span>
                    {action.description && (
                      <span className="text-xs text-muted-foreground truncate">
                        {action.description}
                      </span>
                    )}
                  </div>
                  {action.shortcut && (
                    <CommandShortcut>
                      <Kbd className="text-xs">{action.shortcut}</Kbd>
                    </CommandShortcut>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

export default QuickActions;
