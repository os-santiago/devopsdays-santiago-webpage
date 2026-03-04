import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import type { ReactNode } from "react";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  type MotionComponentProps = {
    children?: ReactNode;
    [key: string]: unknown;
  };
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
        return React.forwardRef<unknown, MotionComponentProps>(({ children, ...props }, ref) => {
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
    AnimatePresence: ({ children }: { children?: ReactNode }) =>
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
