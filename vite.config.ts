import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), pluginRewriteAll()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
