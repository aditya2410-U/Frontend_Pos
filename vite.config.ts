import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Plugin to exclude DMG/EXE/AppImage files from dist after Vite copies public files
    {
      name: "exclude-installers",
      closeBundle() {
        // Clean up any DMG/EXE/AppImage files from dist/downloads after build
        const distDownloads = path.resolve(__dirname, "dist/downloads");
        if (fs.existsSync(distDownloads)) {
          const files = fs.readdirSync(distDownloads);
          files.forEach((file) => {
            if (file.match(/\.(dmg|exe|AppImage)$/i)) {
              const filePath = path.join(distDownloads, file);
              try {
                fs.unlinkSync(filePath);
                console.log(`🗑️  Removed ${file} from dist/downloads`);
              } catch (err) {
                // Ignore errors
              }
            }
          });
        }
        // Also clean dist-electron/downloads if it exists
        const distElectronDownloads = path.resolve(
          __dirname,
          "dist-electron/downloads"
        );
        if (fs.existsSync(distElectronDownloads)) {
          const files = fs.readdirSync(distElectronDownloads);
          files.forEach((file) => {
            if (file.match(/\.(dmg|exe|AppImage)$/i)) {
              const filePath = path.join(distElectronDownloads, file);
              try {
                fs.unlinkSync(filePath);
                console.log(`🗑️  Removed ${file} from dist-electron/downloads`);
              } catch (err) {
                // Ignore errors
              }
            }
          });
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./", // Use relative paths for Electron
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild", // Use esbuild (faster, built-in)
    sourcemap: false, // Disable source maps in production to reduce size
    rollupOptions: {
      output: {
        manualChunks: undefined, // Let Vite handle chunking automatically
      },
    },
  },
  server: {
    port: 5173,
    // Serve download files from public/downloads
    fs: {
      allow: [".."],
    },
  },
});
