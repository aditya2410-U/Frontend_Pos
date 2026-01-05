import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electron", {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  // Auto-updater API
  updater: {
    checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
    downloadUpdate: () => ipcRenderer.invoke("download-update"),
    installUpdate: () => ipcRenderer.invoke("install-update"),
    getAppVersion: () => ipcRenderer.invoke("get-app-version"),
    // Event listeners
    onUpdateChecking: (callback: () => void) => {
      ipcRenderer.on("update-checking", () => callback());
    },
    onUpdateAvailable: (
      callback: (info: {
        version: string;
        releaseDate?: string;
        releaseNotes?: string;
      }) => void
    ) => {
      ipcRenderer.on("update-available", (_, info) => callback(info));
    },
    onUpdateNotAvailable: (callback: () => void) => {
      ipcRenderer.on("update-not-available", () => callback());
    },
    onUpdateDownloaded: (callback: (info: { version: string }) => void) => {
      ipcRenderer.on("update-downloaded", (_, info) => callback(info));
    },
    onUpdateError: (callback: (error: { message: string }) => void) => {
      ipcRenderer.on("update-error", (_, error) => callback(error));
    },
    onDownloadProgress: (
      callback: (progress: {
        percent: number;
        transferred: number;
        total: number;
      }) => void
    ) => {
      ipcRenderer.on("update-download-progress", (_, progress) =>
        callback(progress)
      );
    },
    // Remove listeners
    removeAllListeners: (channel: string) => {
      ipcRenderer.removeAllListeners(channel);
    },
  },
});
