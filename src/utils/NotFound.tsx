import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon, Search } from "lucide-react";
import { Button } from "@/common/@atoms/button";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      {/* Animated 404 */}
      <div className="relative">
        <h1 className="text-[150px] font-bold text-muted-foreground/20 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-16 rounded-full bg-linear-to-br from-chart-1 to-chart-2 flex items-center justify-center shadow-lg animate-bounce">
              <Search color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {t("notFound.title")}
        </h2>
        <p className="text-muted-foreground max-w-md">
          {t("notFound.message")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild variant="default">
          <Link to="/dashboard">
            <HomeIcon className="mr-2 size-4" />
            {t("notFound.goDashboard")}
          </Link>
        </Button>
        <Button asChild variant="outline" onClick={() => window.history.back()}>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            {t("notFound.goBack")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
