import { app, BrowserWindow } from "electron";
import { join } from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

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
    },
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    frame: true,
    show: false,
  });

  // Show window when ready to prevent visual flash
  win.once("ready-to-show", () => {
    win?.show();
  });

  if (url) {
    // Development mode
    win.loadURL(url);
    // Open DevTools in development
    win.webContents.openDevTools();
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
  createWindow();

  // macOS specific: re-create window when dock icon is clicked
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
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
