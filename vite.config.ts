import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import styleX from "vite-plugin-stylex";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), styleX(), TanStackRouterVite()],
});

