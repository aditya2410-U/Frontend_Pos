import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      classNames={{
        base: "bg-background/80 backdrop-blur-md border-b border-divider",
        wrapper: "px-4 sm:px-6",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-2"
            color="foreground"
            href="/"
          >
            {/* Healthcare Logo */}
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </div>
            <p className="font-bold text-xl text-foreground">HealthStack</p>
          </Link>
        </NavbarBrand>
        
        <div className="hidden lg:flex gap-1 justify-start ml-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "px-3 py-2 rounded-lg text-sm font-medium hover:bg-default-100 transition-colors",
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-3 items-center">
          <Link 
            isExternal 
            href={siteConfig.links.github} 
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-default-100 hover:bg-default-200 transition-colors"
          >
            <GithubIcon className="text-default-600 w-4 h-4" />
            <span className="text-sm text-default-600 font-medium">16,442</span>
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            href="/login"
            variant="light"
            className="text-sm font-medium"
          >
            Log in
          </Button>
        </NavbarItem>
        
        <NavbarItem>
          <Button
            as={Link}
            href="/signup"
            color="primary"
            className="text-sm font-medium"
          >
            Start building
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="pt-6">
        <div className="flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
                className="w-full py-2"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
