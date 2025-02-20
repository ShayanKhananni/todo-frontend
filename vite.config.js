import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://todo-backend-two-chi.vercel.app/api", 
        changeOrigin: true,
        secure: true, 
      },
    },
  },
  build: {
    outDir: "dist",
  },
  define: {
    "process.env": {},
  },
});
