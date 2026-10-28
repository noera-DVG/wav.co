import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const host = process.env.TAURI_DEV_HOST || "localhost";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Vite options tailored for Tauri development and only declared in vite.config.ts
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
  },
  build: {
    target: "esnext",
    minify: true,
  },
}));
