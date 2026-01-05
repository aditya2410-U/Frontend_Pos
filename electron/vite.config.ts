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
      // Externalize all Node.js built-in modules and Electron
      external: (id) => {
        // Externalize Electron
        if (id === "electron") return true;

        // Externalize Node.js built-ins (both node: protocol and regular names)
        if (id.startsWith("node:")) return true;

        // Externalize common Node.js built-in modules
        const nodeBuiltins = [
          "url",
          "path",
          "fs",
          "os",
          "util",
          "stream",
          "events",
          "crypto",
          "buffer",
          "process",
          "assert",
          "constants",
          "querystring",
          "http",
          "https",
          "net",
          "tls",
          "zlib",
          "child_process",
        ];
        if (nodeBuiltins.includes(id)) return true;

        // Don't externalize anything else (relative imports, node_modules, etc.)
        return false;
      },
    },
  },
  // Ensure Node.js modules are available
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
  },
});
