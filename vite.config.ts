import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Сайт публикуется в репозитории <user>.github.io → отдаётся из корня, base "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
