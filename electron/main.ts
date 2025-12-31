import { app, BrowserWindow } from "electron";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

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

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  try {
    createWindow();

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
