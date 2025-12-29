import { Link, useMatches } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/@atoms/breadcrumb";
import React from "react";
import { useTranslation } from "react-i18next";

export function AppBreadcrumbs() {
  const { t } = useTranslation();
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => Boolean((match.handle as any)?.breadcrumb))
    .map((match) => {
      const { breadcrumb } = match.handle as any;
      return {
        label: t(breadcrumb),
        href: match.pathname,
      };
    });

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link to="/dashboard">{t("sidebar.dashboard")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, index) => {
          if (crumb.label === t("sidebar.dashboard")) return null;

          return (
            <React.Fragment key={crumb.href}>
              <BreadcrumbSeparator className="text-muted-foreground/50" />
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="font-medium text-foreground">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
