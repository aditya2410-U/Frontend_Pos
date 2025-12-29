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
import { LayoutDashboardIcon } from "lucide-react";
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

  return (
    <React.Fragment>
      {breadcrumbs.length > 0 && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <div className="flex items-center gap-2">
                  <LayoutDashboardIcon className="size-4" />
                  <Link to="/dashboard">{t("sidebar.dashboard")}</Link>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => {
              if (crumb.label === t("sidebar.dashboard")) return null;

              return (
                <div key={crumb.href} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </React.Fragment>
  );
}
