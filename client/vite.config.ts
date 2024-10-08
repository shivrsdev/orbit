import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

const server_proxy = {
  target: "http://localhost:3000",
  ws: true,
  secure: false,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      "/auth": server_proxy,
      "/api": server_proxy,
    },
  },
});
