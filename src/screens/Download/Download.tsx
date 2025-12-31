import { useState, useEffect, useRef } from "react";
import {
  Download as DownloadIcon,
  Monitor,
  Laptop,
  Terminal,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/common/@atoms/Button";
import { Card } from "@/common/@atoms/card";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/common/@atoms/PageHeader";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  extension: string;
  downloadUrl: string;
  recommended?: boolean;
}

export default function Download() {
  const { t } = useTranslation();
  const [detectedPlatform, setDetectedPlatform] = useState<string>("");
  const recommendedCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect user's platform with improved detection
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    // More accurate platform detection
    if (platform.includes("win") || userAgent.includes("win")) {
      setDetectedPlatform("windows");
    } else if (platform.includes("mac") || userAgent.includes("mac")) {
      setDetectedPlatform("macos");
    } else if (platform.includes("linux") || userAgent.includes("linux")) {
      setDetectedPlatform("linux");
    } else if (userAgent.includes("android")) {
      setDetectedPlatform("android");
    } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      setDetectedPlatform("ios");
    } else {
      setDetectedPlatform("unknown");
    }
  }, []);

  // Download URLs - Uses environment variables or defaults to GitHub releases
  // Set VITE_DOWNLOAD_BASE_URL in .env for production
  const downloadBaseUrl =
    import.meta.env.VITE_DOWNLOAD_BASE_URL ||
    "https://github.com/aditya2410-U/Frontend_Pos/releases/download";
  const appName = import.meta.env.VITE_APP_NAME || "inventory-pos";
  // Release tag version (v1.0.1) - this is the GitHub release tag
  const releaseTag = import.meta.env.VITE_RELEASE_TAG || "v1.0.1";
  // File version (1.0.0) - this is the version in the actual filenames on GitHub
  const fileVersion = import.meta.env.VITE_FILE_VERSION || "1.0.0";
  // Display version
  const appVersion = import.meta.env.VITE_APP_VERSION || "1.0.1";

  // Detect if Apple Silicon or Intel Mac
  // Default to arm64 for Mac users (most modern Macs are Apple Silicon)
  const isAppleSilicon =
    navigator.platform.toLowerCase().includes("arm") ||
    navigator.userAgent.toLowerCase().includes("arm") ||
    // Check for M1/M2/M3 chips in user agent
    navigator.userAgent.toLowerCase().includes("m1") ||
    navigator.userAgent.toLowerCase().includes("m2") ||
    navigator.userAgent.toLowerCase().includes("m3") ||
    // Default to arm64 for Mac users (better compatibility)
    (detectedPlatform === "macos" &&
      !navigator.userAgent.toLowerCase().includes("intel"));

  const platforms: Platform[] = [
    {
      id: "macos",
      name: "macOS",
      icon: <Laptop className="size-6" />,
      extension: ".dmg",
      // Default to Apple Silicon (arm64) version - works on both Intel and Apple Silicon Macs
      // GitHub releases format: /releases/download/{tag}/{filename}
      downloadUrl:
        isAppleSilicon || detectedPlatform === "macos"
          ? `${downloadBaseUrl}/${releaseTag}/inventory-pos-mac-arm64-${appVersion}.dmg`
          : `${downloadBaseUrl}/${releaseTag}/inventory-pos-mac-${appVersion}.dmg`,
      recommended: detectedPlatform === "macos",
    },
    {
      id: "windows",
      name: "Windows",
      icon: <Monitor className="size-6" />,
      extension: ".exe",
      downloadUrl: `${downloadBaseUrl}/${releaseTag}/${appName}-win-${fileVersion}.exe`,
      recommended: detectedPlatform === "windows",
    },
    {
      id: "linux",
      name: "Linux",
      icon: <Terminal className="size-6" />,
      extension: ".AppImage",
      downloadUrl: `${downloadBaseUrl}/${releaseTag}/${appName}-linux-${fileVersion}.AppImage`,
      recommended: detectedPlatform === "linux",
    },
  ];

  const handleDownload = (platform: Platform) => {
    // GitHub releases URLs work with spaces - browser will encode automatically
    // Format: https://github.com/owner/repo/releases/download/tag/filename
    const link = document.createElement("a");
    link.href = platform.downloadUrl;
    // Extract filename from URL
    const filename =
      platform.downloadUrl.split("/").pop() ||
      `inventory-pos${platform.extension}`;
    link.download = filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("download.title")}
        description={t("download.description")}
      />

      {/* Main Download Section */}
      <div className="grid gap-6 md:grid-cols-3 px-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            ref={platform.recommended ? recommendedCardRef : null}
            className={
              platform.recommended ? "md:col-span-3 lg:col-span-1" : ""
            }
          >
            <Card
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                platform.recommended
                  ? "ring-2 ring-primary shadow-lg scale-105 bg-primary/5"
                  : "opacity-75"
              }`}
            >
              {platform.recommended && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  <CheckCircle2 className="size-3" />
                  {t("download.recommended")}
                </div>
              )}

              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {platform.extension.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleDownload(platform)}
                    disabled={platform.id === "windows"}
                  >
                    <DownloadIcon className="mr-2 size-4" />
                    {platform.id === "windows"
                      ? "Coming Soon"
                      : t("download.downloadFor", { platform: platform.name })}
                  </Button>

                  {platform.id === "macos" && (
                    <div className="space-y-1.5 pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground">
                        Choose your Mac:
                      </p>
                      <a
                        href={`${downloadBaseUrl}/${releaseTag}/inventory-pos-mac-${appVersion}.dmg`}
                        download
                        className="block text-xs text-primary hover:underline"
                      >
                        Intel Mac (x64)
                      </a>
                      <a
                        href={`${downloadBaseUrl}/${releaseTag}/inventory-pos-mac-arm64-${appVersion}.dmg`}
                        download
                        className="block text-xs text-primary hover:underline"
                      >
                        Apple Silicon (M1/M2/M3)
                      </a>
                      <div className="mt-2 pt-2 border-t bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                        <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                          ⚠️ Important: "Damaged" Error Fix
                        </p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
                          This app is <strong>unsigned</strong> (free/open
                          source). macOS blocks unsigned apps by default.
                        </p>
                        <div className="bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded mb-2">
                          <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                            ✅ Solution (Choose One):
                          </p>
                          <div className="text-xs text-yellow-800 dark:text-yellow-200 space-y-2">
                            <div>
                              <strong>
                                Method 1 - Copy App & Remove Quarantine:
                              </strong>
                              <ol className="ml-4 list-decimal space-y-1 mt-1">
                                <li>Open the DMG file (double-click it)</li>
                                <li>
                                  Drag "Inventory POS.app" to your{" "}
                                  <strong>Applications</strong> folder (or
                                  Desktop)
                                </li>
                                <li>
                                  Open <strong>Terminal</strong> app
                                </li>
                                <li>
                                  Run this command to remove quarantine:
                                  <code className="block bg-yellow-200 dark:bg-yellow-800/60 p-1 rounded mt-1 font-mono text-[10px] break-all">
                                    xattr -cr "/Applications/Inventory POS.app"
                                  </code>
                                  <span className="text-[10px] italic block mt-1">
                                    (Or use ~/Desktop/Inventory POS.app if
                                    copied to Desktop)
                                  </span>
                                </li>
                                <li>
                                  Now try opening the app - it should work!
                                </li>
                              </ol>
                            </div>
                            <div>
                              <strong>Method 2 - Disable Gatekeeper:</strong>
                              <ol className="ml-4 list-decimal space-y-1 mt-1">
                                <li>
                                  Open <strong>Terminal</strong> app
                                </li>
                                <li>
                                  Run:{" "}
                                  <code className="bg-yellow-200 dark:bg-yellow-800/60 px-1 rounded text-[10px]">
                                    sudo spctl --master-disable
                                  </code>
                                </li>
                                <li>Enter your password when prompted</li>
                                <li>
                                  Check status:{" "}
                                  <code className="bg-yellow-200 dark:bg-yellow-800/60 px-1 rounded text-[10px]">
                                    spctl --status
                                  </code>
                                </li>
                                <li>
                                  If it says "disabled", you can now open the
                                  app
                                </li>
                                <li>
                                  Re-enable later:{" "}
                                  <code className="bg-yellow-200 dark:bg-yellow-800/60 px-1 rounded text-[10px]">
                                    sudo spctl --master-enable
                                  </code>
                                </li>
                              </ol>
                            </div>
                            <div>
                              <strong>Method 3 - Right-Click Open:</strong>
                              <ol className="ml-4 list-decimal space-y-1 mt-1">
                                <li>Mount the DMG file</li>
                                <li>
                                  <strong>Right-click</strong> on "Inventory
                                  POS.app"
                                </li>
                                <li>
                                  Select <strong>"Open"</strong> (not
                                  double-click)
                                </li>
                                <li>
                                  Click <strong>"Open"</strong> in the warning
                                  dialog
                                </li>
                                <li>The app should launch</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 italic">
                          Note: The app is unsigned (free/open source). macOS
                          blocks unsigned apps by default.
                        </p>
                      </div>
                    </div>
                  )}

                  {platform.id === "windows" && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground text-center italic">
                        Windows build coming soon. Requires Windows machine or
                        Wine to build.
                      </p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    <p>{t("download.systemRequirements")}</p>
                    {platform.id === "macos" && (
                      <p className="mt-1">
                        macOS 10.15+ (Intel & Apple Silicon)
                      </p>
                    )}
                    {platform.id === "windows" && (
                      <p className="mt-1">Windows 10 or later</p>
                    )}
                    {platform.id === "linux" && (
                      <>
                        <p className="mt-1">Most Linux distributions</p>
                        <p className="mt-1 text-green-600 dark:text-green-400 font-medium">
                          ✓ Available now!
                        </p>
                      </>
                    )}
                    {platform.id === "windows" && (
                      <p className="mt-1 text-yellow-600 dark:text-yellow-400 font-medium">
                        ⏳ Coming soon
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 text-primary" />
            <div>
              <h3 className="font-semibold">
                {t("download.installationTitle")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("download.installationInstructions")}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="mb-2 text-sm font-semibold">
              {t("download.version")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("download.latestVersion")}:{" "}
              <span className="font-medium">{appVersion}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("download.releaseDate")}:{" "}
              <span className="font-medium">2024</span>
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="mb-2 text-sm font-semibold">
              {t("download.notes")}
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {t("download.note1")}</li>
              <li>• {t("download.note2")}</li>
              <li>• {t("download.note3")}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
