import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/api/": "https://elementum-e-commerce-store-backend.onrender.com/",
      "/uploads/": "https://elementum-e-commerce-store-backend.onrender.com/",
    },
  },
});

// "/api/": "http://localhost:3000",
// "/uploads/": "http://localhost:3000",
