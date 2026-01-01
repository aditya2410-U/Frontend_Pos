/// <reference types="vite/client" />

interface ElectronUpdater {
  checkForUpdates: () => Promise<{ success: boolean; error?: string }>;
  downloadUpdate: () => Promise<{ success: boolean; error?: string }>;
  installUpdate: () => Promise<{ success: boolean; error?: string }>;
  getAppVersion: () => Promise<string>;
  onUpdateChecking: (callback: () => void) => void;
  onUpdateAvailable: (
    callback: (info: {
      version: string;
      releaseDate?: string;
      releaseNotes?: string;
    }) => void
  ) => void;
  onUpdateNotAvailable: (callback: () => void) => void;
  onUpdateDownloaded: (callback: (info: { version: string }) => void) => void;
  onUpdateError: (callback: (error: { message: string }) => void) => void;
  onDownloadProgress: (
    callback: (progress: {
      percent: number;
      transferred: number;
      total: number;
    }) => void
  ) => void;
  removeAllListeners: (channel: string) => void;
}

interface ElectronAPI {
  platform: string;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  updater?: ElectronUpdater;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
