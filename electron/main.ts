import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { autoUpdater } from "electron-updater";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST, "../public");

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "preload.js");
const url = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

function createWindow() {
  const isDev = !app.isPackaged && !!process.env.VITE_DEV_SERVER_URL;

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: process.env.VITE_PUBLIC
      ? join(process.env.VITE_PUBLIC, "vite.svg")
      : undefined,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      devTools: false, // Disable DevTools in all modes (local and production)
    },
    frame: true,
    show: false,
  });

  // Show window when ready to prevent visual flash
  win.once("ready-to-show", () => {
    win?.show();
  });

  if (isDev) {
    // Development mode
    win.loadURL(url);
  } else {
    // Production mode
    const distPath = process.env.DIST || join(__dirname, "../dist");
    win.loadFile(join(distPath, "index.html"));
  }

  win.on("closed", () => {
    win = null;
  });
}

// Configure auto-updater
autoUpdater.autoDownload = false; // Don't auto-download, let user choose
autoUpdater.autoInstallOnAppQuit = true; // Install on app quit after download

// Auto-updater event handlers
autoUpdater.on("checking-for-update", () => {
  console.log("Checking for updates...");
  win?.webContents.send("update-checking");
});

autoUpdater.on("update-available", (info) => {
  console.log("Update available:", info.version);
  win?.webContents.send("update-available", {
    version: info.version,
    releaseDate: info.releaseDate,
    releaseNotes: info.releaseNotes,
  });
});

autoUpdater.on("update-not-available", () => {
  console.log("No updates available");
  win?.webContents.send("update-not-available");
});

autoUpdater.on("update-downloaded", (info) => {
  console.log("Update downloaded:", info.version);
  win?.webContents.send("update-downloaded", {
    version: info.version,
  });

  // Show notification dialog
  dialog
    .showMessageBox(win!, {
      type: "info",
      title: "Update Ready",
      message: `Update ${info.version} has been downloaded.`,
      detail: "The update will be installed when you restart the application.",
      buttons: ["Restart Now", "Later"],
      defaultId: 0,
      cancelId: 1,
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall(false, true);
      }
    });
});

autoUpdater.on("error", (error) => {
  console.error("Update error:", error);
  win?.webContents.send("update-error", {
    message: error.message,
  });
});

autoUpdater.on("download-progress", (progressObj) => {
  win?.webContents.send("update-download-progress", {
    percent: progressObj.percent,
    transferred: progressObj.transferred,
    total: progressObj.total,
  });
});

// IPC handlers for update actions
ipcMain.handle("check-for-updates", async () => {
  try {
    await autoUpdater.checkForUpdates();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("download-update", async () => {
  try {
    autoUpdater.downloadUpdate();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("install-update", async () => {
  try {
    autoUpdater.quitAndInstall(false, true);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  try {
    createWindow();

    // Check for updates after a short delay (only in production)
    if (app.isPackaged) {
      setTimeout(() => {
        autoUpdater.checkForUpdates().catch((err) => {
          console.error("Failed to check for updates:", err);
        });
      }, 3000); // Check after 3 seconds
    }

    // macOS specific: re-create window when dock icon is clicked
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  } catch (error) {
    console.error("Error creating window:", error);
    app.quit();
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Quit when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on("web-contents-created", (_, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
});
