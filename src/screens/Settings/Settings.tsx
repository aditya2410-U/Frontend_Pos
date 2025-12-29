import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("settings.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("settings.description")}
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground mb-4">
          {t("settings.placeholder")}
        </p>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {t("settings.selectLanguage")}
          </h2>
          <div className="flex gap-2">
            <Button
              variant={i18n.language === "en" ? "default" : "outlined"}
              onClick={() => changeLanguage("en")}
            >
              English
            </Button>
            <Button
              variant={i18n.language === "fr" ? "default" : "outlined"}
              onClick={() => changeLanguage("fr")}
            >
              Français
            </Button>
            <Button
              variant={i18n.language === "es" ? "default" : "outlined"}
              onClick={() => changeLanguage("es")}
            >
              Español
            </Button>
            <Button
              variant={i18n.language === "hi" ? "default" : "outlined"}
              onClick={() => changeLanguage("hi")}
            >
              हिंदी
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
