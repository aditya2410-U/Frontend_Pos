import { useTranslation } from "react-i18next";
import {
  useTheme,
  type Theme,
  type ColorTheme,
} from "@/common/@atoms/theme-provider";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor, Check } from "lucide-react";

// Theme preview component - Attio style
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
        "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer",
        isSelected
          ? "border-primary bg-accent/50"
          : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
      )}
    >
      {/* Preview Card */}
      <div
        className={cn(
          "relative w-full aspect-[16/10] rounded-lg overflow-hidden border shadow-sm",
          isDark
            ? "bg-[#0f172a]"
            : isSystem
              ? "bg-gradient-to-r from-white to-[#0f172a]"
              : "bg-white"
        )}
      >
        {/* Sidebar Preview */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-[28%] border-r",
            isDark
              ? "bg-[#1e293b] border-[#334155]"
              : isSystem
                ? "bg-gradient-to-b from-[#fafbfc] to-[#1e293b]"
                : "bg-[#fafbfc] border-[#e5e7eb]"
          )}
        >
          {/* Logo area */}
          <div className="p-2">
            <div
              className={cn(
                "w-4 h-4 rounded-md",
                isDark ? "bg-[#3b82f6]" : "bg-primary"
              )}
            />
          </div>
          {/* Sidebar items */}
          <div className="px-2 space-y-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 rounded",
                  isDark ? "bg-[#334155]" : "bg-[#e5e7eb]",
                  i === 1 && (isDark ? "bg-[#3b82f6]" : "bg-primary")
                )}
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            ))}
          </div>
        </div>

        {/* Main Content Preview */}
        <div className="absolute left-[28%] right-0 top-0 bottom-0 p-3">
          {/* Header */}
          <div
            className={cn(
              "h-2 w-1/3 rounded mb-3",
              isDark ? "bg-[#334155]" : "bg-[#e5e7eb]"
            )}
          />
          {/* Content blocks */}
          <div className="space-y-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded",
                  isDark ? "bg-[#334155]" : "bg-[#e5e7eb]"
                )}
                style={{ width: `${70 + Math.random() * 30}%` }}
              />
            ))}
          </div>
          {/* Cards */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-6 rounded",
                  isDark
                    ? "bg-[#1e293b] border border-[#334155]"
                    : "bg-white border border-[#e5e7eb]"
                )}
              />
            ))}
          </div>
        </div>

        {/* Selection Check */}
        {isSelected && (
          <div className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <Check className="size-3 text-primary-foreground" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Label with Icon */}
      <div className="flex items-center gap-2 text-sm font-medium">
        {mode === "light" && <Sun className="size-4 text-muted-foreground" />}
        {mode === "dark" && <Moon className="size-4 text-muted-foreground" />}
        {mode === "system" && (
          <Monitor className="size-4 text-muted-foreground" />
        )}
        <span
          className={isSelected ? "text-foreground" : "text-muted-foreground"}
        >
          {label}
        </span>
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
        "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left",
        isSelected
          ? "border-primary bg-accent/50"
          : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
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

        <div className="grid grid-cols-3 gap-4 max-w-2xl">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
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
