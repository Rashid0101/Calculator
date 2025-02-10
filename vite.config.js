import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ Use "/" or remove this line entirely for Netlify
});
