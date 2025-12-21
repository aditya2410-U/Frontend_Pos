export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "HealthStack",
  description: "The healthcare platform that keeps your data in sync.",
  navItems: [
    {
      label: "Product",
      href: "/product",
    },
    {
      label: "Features",
      href: "/features",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Patients",
      href: "/patients",
    },
    {
      label: "Appointments",
      href: "/appointments",
    },
    {
      label: "Reports",
      href: "/reports",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    docs: "https://docs.example.com",
    discord: "https://discord.gg",
    sponsor: "https://example.com",
  },
};
