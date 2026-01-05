import { useEffect, useState } from "react";
import {
  Download,
  X,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/common/@atoms/Button";
import { Card } from "@/common/@atoms/card";
import { toast } from "sonner";

interface UpdateInfo {
  version: string;
  releaseDate?: string;
  releaseNotes?: string;
}

interface DownloadProgress {
  percent: number;
  transferred: number;
  total: number;
}

export function UpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string>("");

  useEffect(() => {
    // Only run in Electron environment
    if (!(window as any).electron?.updater) {
      return;
    }

    const updater = (window as any).electron.updater;

    // Get current app version
    updater.getAppVersion().then((version: string) => {
      setCurrentVersion(version);
    });

    // Set up event listeners
    updater.onUpdateChecking(() => {
      toast.info("Checking for updates...");
    });

    updater.onUpdateAvailable((info: UpdateInfo) => {
      setUpdateAvailable(true);
      setUpdateInfo(info);
      toast.success(`Update available: v${info.version}`, {
        description: "Click the notification to download",
        duration: 10000,
      });
    });

    updater.onUpdateNotAvailable(() => {
      toast.success("You're using the latest version");
    });

    updater.onUpdateDownloaded((info: { version: string }) => {
      setDownloading(false);
      setDownloaded(true);
      toast.success(`Update ${info.version} downloaded!`, {
        description: "Restart the app to install",
        duration: 10000,
      });
    });

    updater.onUpdateError((error: { message: string }) => {
      setDownloading(false);
      toast.error("Update error", {
        description: error.message,
      });
    });

    updater.onDownloadProgress((progress: DownloadProgress) => {
      setDownloadProgress(Math.round(progress.percent));
    });

    // Cleanup listeners on unmount
    return () => {
      updater.removeAllListeners("update-checking");
      updater.removeAllListeners("update-available");
      updater.removeAllListeners("update-not-available");
      updater.removeAllListeners("update-downloaded");
      updater.removeAllListeners("update-error");
      updater.removeAllListeners("update-download-progress");
    };
  }, []);

  const handleDownloadUpdate = async () => {
    if (!(window as any).electron?.updater) return;

    setDownloading(true);
    setDownloadProgress(0);
    const result = await (window as any).electron.updater.downloadUpdate();
    if (!result.success && result.error) {
      toast.error("Failed to download update", {
        description: result.error,
      });
      setDownloading(false);
    }
  };

  const handleInstallUpdate = async () => {
    if (!(window as any).electron?.updater) return;

    await (window as any).electron.updater.installUpdate();
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
    setDownloaded(false);
    setDownloadProgress(0);
  };

  // Don't show anything if not in Electron or no updates
  if (
    !(window as any).electron?.updater ||
    (!updateAvailable && !downloading && !downloaded)
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="p-4 shadow-lg border-2 border-primary/20">
        {downloaded ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">
                  Update Ready to Install
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Update {updateInfo?.version} has been downloaded. Restart the
                  app to install.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="h-6 w-6 p-0 rounded-md hover:bg-muted flex items-center justify-center"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleInstallUpdate}
                className="flex-1"
                size="sm"
              >
                <RefreshCw className="mr-2 size-4" />
                Restart & Install
              </Button>
            </div>
          </div>
        ) : downloading ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Download className="size-5 text-blue-500 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Downloading Update</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Downloading version {updateInfo?.version}...
                </p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {downloadProgress}%
                </p>
              </div>
            </div>
          </div>
        ) : updateAvailable ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">
                  Update Available: v{updateInfo?.version}
                </h3>
                {updateInfo?.releaseNotes && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {updateInfo.releaseNotes}
                  </p>
                )}
                {currentVersion && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Current version: v{currentVersion}
                  </p>
                )}
              </div>
              <button
                onClick={handleDismiss}
                className="h-6 w-6 p-0 rounded-md hover:bg-muted flex items-center justify-center"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleDownloadUpdate}
                className="flex-1"
                size="sm"
              >
                <Download className="mr-2 size-4" />
                Download Update
              </Button>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
