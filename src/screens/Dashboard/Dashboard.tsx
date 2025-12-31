import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { useTranslation } from "react-i18next";
import { TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react";
import { PageHeader } from "@/common/@atoms/PageHeader";

export default function Dashboard() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("dashboard.totalSales"),
      value: "$45,231.89",
      trend: t("dashboard.salesTrend"),
      icon: DollarSign,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: t("dashboard.activeUsers"),
      value: "+2,350",
      trend: t("dashboard.usersTrend"),
      icon: Users,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Orders",
      value: "1,234",
      trend: "+12.5% from last week",
      icon: ShoppingCart,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
    {
      title: "Growth",
      value: "24.5%",
      trend: "Compared to last quarter",
      icon: TrendingUp,
      iconBg: "bg-info/10",
      iconColor: "text-info",
    },
  ];

  return (
    <div className="space-y-8 ">
      {/* Page Header */}
      <PageHeader
        title={t("Dashboard")}
        description={"Welcome back! Here's what's happening with your store."}
      />
      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 px-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-border/60 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`size-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-5 md:grid-cols-2 px-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-9 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-2 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Activity data coming soon...
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-9 rounded-lg bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                    <div className="h-2 bg-muted rounded animate-pulse w-1/3" />
                  </div>
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Product data coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
