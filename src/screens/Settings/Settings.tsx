import { useTranslation } from "react-i18next";
import {
  useTheme,
  type Theme,
  type ColorTheme,
} from "@/common/@atoms/theme-provider";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor, Check } from "lucide-react";

// Theme preview component
interface ThemePreviewProps {
  mode: Theme;
  isSelected: boolean;
  onClick: () => void;
  label: string;
}

function ThemePreview({ mode, isSelected, onClick, label }: ThemePreviewProps) {
  const isDark = mode === "dark";
  const isSystem = mode === "system";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-3 transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      {/* Preview Card */}
      <div
        className={cn(
          "relative w-full aspect-[4/3] rounded-lg overflow-hidden border shadow-sm",
          isDark
            ? "bg-zinc-900"
            : isSystem
              ? "bg-gradient-to-r from-white to-zinc-900"
              : "bg-white"
        )}
      >
        {/* Sidebar Preview */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-1/4 border-r",
            isDark
              ? "bg-zinc-800 border-zinc-700"
              : isSystem
                ? "bg-gradient-to-b from-zinc-100 to-zinc-800"
                : "bg-zinc-100 border-zinc-200"
          )}
        >
          {/* Sidebar items */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "mx-1 my-1 h-1.5 rounded-sm",
                isDark
                  ? "bg-zinc-600"
                  : isSystem
                    ? "bg-zinc-300"
                    : "bg-zinc-300",
                i === 0 && "bg-primary/60"
              )}
            />
          ))}
        </div>

        {/* Main Content Preview */}
        <div className="absolute left-1/4 right-0 top-0 bottom-0 p-2">
          {/* Header */}
          <div
            className={cn(
              "h-2 w-1/2 rounded-sm mb-2",
              isDark ? "bg-zinc-700" : "bg-zinc-200"
            )}
          />
          {/* Content blocks */}
          <div className="space-y-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-sm",
                  isDark ? "bg-zinc-700" : "bg-zinc-200",
                  i === 2 && "w-2/3"
                )}
              />
            ))}
          </div>
          {/* Cards */}
          <div className="mt-2 grid grid-cols-2 gap-1">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-4 rounded-sm",
                  isDark
                    ? "bg-zinc-800 border border-zinc-700"
                    : "bg-zinc-50 border border-zinc-200"
                )}
              />
            ))}
          </div>
        </div>

        {/* Selection Check */}
        {isSelected && (
          <div className="absolute top-1 right-1 size-4 rounded-full bg-primary flex items-center justify-center">
            <Check
              className="size-2.5 text-primary-foreground"
              strokeWidth={3}
            />
          </div>
        )}
      </div>

      {/* Label with Icon */}
      <div className="flex items-center gap-2 text-sm font-medium">
        {mode === "light" && <Sun className="size-4" />}
        {mode === "dark" && <Moon className="size-4" />}
        {mode === "system" && <Monitor className="size-4" />}
        <span>{label}</span>
      </div>
    </button>
  );
}

// Color option component
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
        "relative size-9 rounded-full transition-all duration-200 hover:scale-110",
        isSelected && "ring-2 ring-offset-2 ring-offset-background ring-primary"
      )}
      style={{ backgroundColor: bgColor }}
    >
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Check className="size-4 text-white drop-shadow-md" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// Language option component
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
        "flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <span className="text-2xl">{flag}</span>
      <span className="font-medium">{label}</span>
      {isSelected && (
        <Check className="size-4 text-primary ml-auto" strokeWidth={2.5} />
      )}
    </button>
  );
}

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

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
    <div className="max-w-4xl mx-auto space-y-8 pb-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("settings.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("settings.description")}
        </p>
      </div>

      {/* Theme Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t("settings.theme")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("settings.themeDescription")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ThemePreview
            mode="light"
            isSelected={theme === "light"}
            onClick={() => setTheme("light")}
            label={t("settings.modes.light")}
          />
          <ThemePreview
            mode="dark"
            isSelected={theme === "dark"}
            onClick={() => setTheme("dark")}
            label={t("settings.modes.dark")}
          />
          <ThemePreview
            mode="system"
            isSelected={theme === "system"}
            onClick={() => setTheme("system")}
            label={t("settings.modes.system")}
          />
        </div>
      </section>

      {/* Accent Color Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t("settings.accentColor")}</h2>
          <p className="text-sm text-muted-foreground">
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
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t("settings.language")}</h2>
          <p className="text-sm text-muted-foreground">
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
