import { useTranslation } from "react-i18next";
import {
  useTheme,
  type Theme,
  type ColorTheme,
} from "@/common/@atoms/theme-provider";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  LightThemePreview,
  DarkThemePreview,
  SystemThemePreviewLight,
  SystemThemePreviewDark,
  THEME_COLORS,
} from "@/assets/theme-previews";

// Theme preview component - Exact Attio style
interface ThemePreviewProps {
  mode: Theme;
  isSelected: boolean;
  onClick: () => void;
  label: string;
  accentColor: string;
}

function ThemePreview({
  mode,
  isSelected,
  onClick,
  label,
  accentColor,
}: ThemePreviewProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Outer container - theme-aware styles
        "flex gap-1 p-1 rounded-md cursor-pointer transition-colors",
        "bg-card",
        "border",
        isSelected
          ? "border-primary"
          : "border-border hover:border-muted-foreground/40"
      )}
    >
      {/* Inner wrapper - column layout */}
      <div className="flex flex-col items-center justify-start gap-1">
        {/* SVG container - theme-aware styles */}
        <div
          className={cn(
            "flex flex-row items-center justify-start gap-[1px] rounded-md overflow-hidden",
            "bg-muted",
            "border border-border"
          )}
        >
          {mode === "light" && <LightThemePreview accentColor={accentColor} />}
          {mode === "dark" && <DarkThemePreview accentColor={accentColor} />}
          {mode === "system" && (
            <>
              <SystemThemePreviewLight accentColor={accentColor} />
              <SystemThemePreviewDark accentColor={accentColor} />
            </>
          )}
        </div>

        {/* Label container - exact Attio styles */}
        <div className="flex flex-row items-center justify-center gap-2 py-1">
          {isSelected && (
            <Check className="size-3.5 text-primary" strokeWidth={2.5} />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              isSelected ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {label}
          </span>
        </div>
      </div>
    </button>
  );
}

// Color option component - Attio style
interface ColorOptionProps {
  color: ColorTheme;
  bgColor: string;
  isSelected: boolean;
  onClick: () => void;
}

function ColorOption({ bgColor, isSelected, onClick }: ColorOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative size-10 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none",
        isSelected &&
          "ring-2 ring-offset-2 ring-offset-background ring-foreground"
      )}
      style={{ backgroundColor: bgColor }}
    >
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Check
            className="size-5 text-white drop-shadow-md"
            strokeWidth={2.5}
          />
        </div>
      )}
    </button>
  );
}

// Language option component - Attio style
interface LanguageOptionProps {
  code: string;
  label: string;
  flag: string;
  isSelected: boolean;
  onClick: () => void;
}

function LanguageOption({
  label,
  flag,
  isSelected,
  onClick,
}: LanguageOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md border transition-all duration-200 text-left",
        "bg-card",
        isSelected
          ? "border-primary"
          : "border-border hover:border-muted-foreground/40"
      )}
    >
      <span className="text-2xl">{flag}</span>
      <span
        className={cn(
          "font-medium text-sm",
          isSelected ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
      {isSelected && (
        <Check className="size-4 text-primary ml-auto" strokeWidth={2.5} />
      )}
    </button>
  );
}

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

  // Get the current accent color based on selected color theme
  const currentAccentColor =
    THEME_COLORS[colorTheme] || THEME_COLORS["theme-orange"];

  const colorOptions: { theme: ColorTheme; color: string }[] = [
    { theme: "theme-teal", color: "#14b8a6" },
    { theme: "theme-blue", color: "#3b82f6" },
    { theme: "theme-yellow", color: "#eab308" },
    { theme: "theme-orange", color: "#f97316" },
    { theme: "theme-rose", color: "#f43f5e" },
    { theme: "theme-purple", color: "#a855f7" },
    { theme: "theme-green", color: "#22c55e" },
  ];

  const languageOptions = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("settings.title")}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {t("settings.description")}
        </p>
      </div>

      {/* Theme Section */}
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {t("settings.theme")}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("settings.themeDescription")}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <ThemePreview
            mode="light"
            isSelected={theme === "light"}
            onClick={() => setTheme("light")}
            label={t("settings.modes.light")}
            accentColor={currentAccentColor}
          />
          <ThemePreview
            mode="dark"
            isSelected={theme === "dark"}
            onClick={() => setTheme("dark")}
            label={t("settings.modes.dark")}
            accentColor={currentAccentColor}
          />
          <ThemePreview
            mode="system"
            isSelected={theme === "system"}
            onClick={() => setTheme("system")}
            label={t("settings.modes.system")}
            accentColor={currentAccentColor}
          />
        </div>
      </section>

      {/* Accent Color Section */}
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {t("settings.accentColor")}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("settings.accentColorDescription")}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {colorOptions.map((option) => (
            <ColorOption
              key={option.theme}
              color={option.theme}
              bgColor={option.color}
              isSelected={colorTheme === option.theme}
              onClick={() => setColorTheme(option.theme)}
            />
          ))}
        </div>
      </section>

      {/* Language Section */}
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {t("settings.language")}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("settings.selectLanguage")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {languageOptions.map((lang) => (
            <LanguageOption
              key={lang.code}
              code={lang.code}
              label={lang.label}
              flag={lang.flag}
              isSelected={i18n.language === lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
