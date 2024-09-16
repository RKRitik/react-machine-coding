import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // Required for testing with DOM
    setupFiles: "./setupTests.ts", // Path to your setup file
  },
});
