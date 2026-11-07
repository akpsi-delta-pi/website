import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves a repo named "<org>.github.io" (or a custom domain) from "/",
// and any other repo from "/<repo-name>/". The deploy workflow passes the right
// value in BASE_PATH, so the site works either way without code changes.
const basePath = process.env.BASE_PATH ? `${process.env.BASE_PATH.replace(/\/$/, "")}/` : "/";

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
});
