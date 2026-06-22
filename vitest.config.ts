import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/types/**",
        "src/**/*.test.{ts,tsx}",
        // Vendored shadcn/ui primitives (generated via `npx shadcn add`), not
        // first-party code. They ship variants/features (radio groups, the
        // sidebar's floating/icon-collapse modes, etc.) this app never uses —
        // covering every branch would mean testing paths with no real usage.
        "src/components/ui/**",
        // Vendored alongside the Sidebar primitive (also via shadcn CLI),
        // same reasoning — its matchMedia listener cleanup path isn't
        // exercised by any real interaction in this app.
        "src/hooks/use-mobile.ts",
      ],
      thresholds: {
        lines: 100,
        branches: 100,
        functions: 100,
        statements: 100,
      },
    },
  },
});
