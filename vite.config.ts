import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * Dev-only bridge so `npm run dev` serves /api/quotes from the same handler
 * Vercel deploys. Reads QUOTES_* from .env. Without a key the handler returns
 * 503 and the ticker stays hidden, exactly as in production.
 */
function devApi(mode: string): Plugin {
  return {
    name: "aish-dev-api",
    apply: "serve",
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), "");
      for (const key of ["QUOTES_API_KEY", "QUOTES_PROVIDER"]) {
        if (env[key] && !process.env[key]) process.env[key] = env[key];
      }
      server.middlewares.use("/api/quotes", async (_req, res) => {
        try {
          const mod = (await server.ssrLoadModule("/api/quotes.ts")) as { GET: () => Promise<Response> };
          const r = await mod.GET();
          res.statusCode = r.status;
          r.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(await r.text());
        } catch (e) {
          res.statusCode = 500;
          res.end(String(e));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), devApi(mode)],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          i18n: ["i18next", "react-i18next"],
        },
      },
    },
  },
}));
