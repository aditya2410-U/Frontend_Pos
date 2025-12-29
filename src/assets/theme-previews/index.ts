export { LightThemePreview } from "./LightThemePreview";
export { DarkThemePreview } from "./DarkThemePreview";
export {
  SystemThemePreviewLight,
  SystemThemePreviewDark,
} from "./SystemThemePreview";

// Color mapping for theme accents
export const THEME_COLORS: Record<string, string> = {
  "theme-teal": "#14b8a6",
  "theme-blue": "#3b82f6",
  "theme-yellow": "#eab308",
  "theme-orange": "#f97316",
  "theme-rose": "#f43f5e",
  "theme-purple": "#a855f7",
  "theme-green": "#22c55e",
} as const;
