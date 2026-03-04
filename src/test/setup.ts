import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const motionOnlyProps = new Set([
    "initial",
    "animate",
    "exit",
    "whileInView",
    "whileHover",
    "whileTap",
    "variants",
    "transition",
    "viewport",
    "layout",
    "layoutId",
  ]);

  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) => {
        return React.forwardRef(({ children, ...props }: any, ref) => {
          const domProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !motionOnlyProps.has(key)),
          );

          return React.createElement(tag, { ...domProps, ref }, children);
        });
      },
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

afterEach(() => {
  cleanup();
});
