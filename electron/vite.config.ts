import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  build: {
    outDir: resolve(__dirname, "../dist-electron"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "main.ts"),
        preload: resolve(__dirname, "preload.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
      },
      external: ["electron", "url", "path", "node:url", "node:path"],
    },
  },
  // Ensure Node.js modules are available
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
  },
});
