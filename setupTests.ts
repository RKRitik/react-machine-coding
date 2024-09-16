import "@testing-library/jest-dom"; // Extends Vitest with jest-dom matchers
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up after each test to avoid memory leaks
afterEach(() => {
  cleanup();
});
