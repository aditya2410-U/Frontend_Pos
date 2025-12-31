import {
  IconLayoutCollage,
  IconPackage,
  IconShoppingCartShare,
  IconUserPlus,
  IconBinaryTree2,
  IconBuildingStore,
  IconSettings,
  IconChartBar,
  IconReportAnalytics,
  IconUsers,
  IconShield,
  IconDatabase,
  IconFileText,
  IconBell,
  IconHelp,
  IconCategory,
  IconBox,
  IconTruck,
  IconReceipt,
  IconCash,
  IconCreditCard,
  IconTrendingUp,
  IconHistory,
  IconPlus,
  IconUser,
  IconApps,
  IconHeart,
  IconLogout,
} from "@tabler/icons-react";

export interface SidebarMenuItem {
  title: string;
  icon: React.ComponentType<any>;
  url: string;
  children?: SidebarMenuItem[];
}

export interface SidebarGroup {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  items: SidebarMenuItem[];
}

export interface DropdownMenuItem {
  label: string;
  icon: React.ComponentType<any>;
  url?: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
  separatorBefore?: boolean;
}

export interface OrganizationDropdownSection {
  items: DropdownMenuItem[];
  separatorAfter?: boolean;
}

export const getSidebarGroups = (
  t: (key: string) => string
): SidebarGroup[] => [
  {
    key: "main",
    label: "Main",
    icon: IconLayoutCollage,
    items: [
      {
        title: t("sidebar.dashboard"),
        icon: IconLayoutCollage,
        url: "/dashboard",
      },
      {
        title: "Analytics",
        icon: IconChartBar,
        url: "/analytics",
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory",
    icon: IconPackage,
    items: [
      {
        title: t("sidebar.products"),
        icon: IconPackage,
        url: "/products",
        children: [
          {
            title: "All Products",
            icon: IconPackage,
            url: "/products",
          },
          {
            title: "Low Stock",
            icon: IconBox,
            url: "/products/low-stock",
          },
        ],
      },
      {
        title: "Categories",
        icon: IconCategory,
        url: "/categories",
      },
      {
        title: "Stock",
        icon: IconBox,
        url: "/stock",
      },
      {
        title: "Suppliers",
        icon: IconTruck,
        url: "/suppliers",
      },
    ],
  },
  {
    key: "sales",
    label: "Sales",
    icon: IconShoppingCartShare,
    items: [
      {
        title: t("sidebar.orders"),
        icon: IconShoppingCartShare,
        url: "/orders",
      },
      {
        title: "Transactions",
        icon: IconReceipt,
        url: "/transactions",
      },
      {
        title: "Payments",
        icon: IconCreditCard,
        url: "/payments",
      },
      {
        title: "Returns",
        icon: IconHistory,
        url: "/returns",
      },
    ],
  },
  {
    key: "management",
    label: "Management",
    icon: IconUsers,
    items: [
      {
        title: t("sidebar.userManagement"),
        icon: IconUserPlus,
        url: "/users",
      },
      {
        title: t("sidebar.roles"),
        icon: IconBinaryTree2,
        url: "/roles",
      },
      {
        title: t("sidebar.outlets"),
        icon: IconBuildingStore,
        url: "/outlets",
      },
      {
        title: "Permissions",
        icon: IconShield,
        url: "/permissions",
      },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    icon: IconReportAnalytics,
    items: [
      {
        title: "Sales Report",
        icon: IconTrendingUp,
        url: "/reports/sales",
      },
      {
        title: "Inventory Report",
        icon: IconDatabase,
        url: "/reports/inventory",
      },
      {
        title: "Financial Report",
        icon: IconCash,
        url: "/reports/financial",
      },
      {
        title: "Custom Reports",
        icon: IconFileText,
        url: "/reports/custom",
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: IconSettings,
    items: [
      {
        title: t("sidebar.settings"),
        icon: IconSettings,
        url: "/settings",
      },
      {
        title: "Notifications",
        icon: IconBell,
        url: "/settings/notifications",
      },
      {
        title: "Help & Support",
        icon: IconHelp,
        url: "/help",
      },
    ],
  },
];

export const getOrganizationDropdownSections =
  (): OrganizationDropdownSection[] => [
    {
      items: [
        {
          label: "New workspace",
          icon: IconPlus,
        },
      ],
      separatorAfter: true,
    },
    {
      items: [
        {
          label: "Account settings",
          icon: IconUser,
          url: "/settings/account",
        },
        {
          label: "Workspace settings",
          icon: IconSettings,
          url: "/settings",
        },
      ],
      separatorAfter: true,
    },
    {
      items: [
        {
          label: "Invite team members",
          icon: IconUserPlus,
          url: "/settings/invite",
        },
        {
          label: "Refer another team",
          icon: IconHeart,
          url: "/settings/refer",
        },
        {
          label: "Apps and integrations",
          icon: IconApps,
          url: "/settings/integrations",
        },
      ],
      separatorAfter: true,
    },
    {
      items: [
        {
          label: "Sign out",
          icon: IconLogout,
          variant: "destructive",
        },
      ],
    },
  ];

export const DEFAULT_OPEN_GROUPS: Record<string, boolean> = {
  main: true,
  inventory: true,
  sales: true,
  management: true,
  reports: true,
  settings: true,
};
