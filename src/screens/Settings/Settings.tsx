import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/button";
import { useTheme } from "@/common/@atoms/theme-provider";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

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

      <div className="rounded-lg border bg-card p-6 space-y-8">
        <p className="text-muted-foreground">{t("settings.placeholder")}</p>

        {/* Language Selection */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {t("settings.selectLanguage")}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={i18n.language === "en" ? "default" : "outline"}
              onClick={() => changeLanguage("en")}
            >
              English
            </Button>
            <Button
              variant={i18n.language === "fr" ? "default" : "outline"}
              onClick={() => changeLanguage("fr")}
            >
              Français
            </Button>
            <Button
              variant={i18n.language === "es" ? "default" : "outline"}
              onClick={() => changeLanguage("es")}
            >
              Español
            </Button>
            <Button
              variant={i18n.language === "hi" ? "default" : "outline"}
              onClick={() => changeLanguage("hi")}
            >
              हिंदी
            </Button>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{t("settings.selectMode")}</h2>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
            >
              {t("settings.modes.light")}
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
            >
              {t("settings.modes.dark")}
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => setTheme("system")}
            >
              {t("settings.modes.system")}
            </Button>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{t("settings.selectTheme")}</h2>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={colorTheme === "theme-green" ? "default" : "outline"}
              onClick={() => setColorTheme("theme-green")}
              className={
                colorTheme === "theme-green"
                  ? ""
                  : "hover:text-green-600 hover:border-green-600 hover:bg-green-50"
              }
            >
              {t("settings.themes.green")}
            </Button>
            <Button
              variant={colorTheme === "theme-blue" ? "default" : "outline"}
              onClick={() => setColorTheme("theme-blue")}
              className={
                colorTheme === "theme-blue"
                  ? ""
                  : "hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50"
              }
            >
              {t("settings.themes.blue")}
            </Button>
            <Button
              variant={colorTheme === "theme-rose" ? "default" : "outline"}
              onClick={() => setColorTheme("theme-rose")}
              className={
                colorTheme === "theme-rose"
                  ? ""
                  : "hover:text-rose-600 hover:border-rose-600 hover:bg-rose-50"
              }
            >
              {t("settings.themes.rose")}
            </Button>
            <Button
              variant={colorTheme === "theme-orange" ? "default" : "outline"}
              onClick={() => setColorTheme("theme-orange")}
              className={
                colorTheme === "theme-orange"
                  ? ""
                  : "hover:text-orange-600 hover:border-orange-600 hover:bg-orange-50"
              }
            >
              {t("settings.themes.orange")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
