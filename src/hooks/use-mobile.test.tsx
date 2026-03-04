import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "@/hooks/use-mobile";

function TestComponent() {
  const isMobile = useIsMobile();
  return <div>{isMobile ? "mobile" : "desktop"}</div>;
}

describe("useIsMobile", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when width is below breakpoint", () => {
    window.innerWidth = 767;
    render(<TestComponent />);

    expect(screen.getByText("mobile")).toBeInTheDocument();
  });

  it("returns false when width is at or above breakpoint", () => {
    window.innerWidth = 768;
    render(<TestComponent />);

    expect(screen.getByText("desktop")).toBeInTheDocument();
  });

  it("updates on matchMedia change event", () => {
    let listener: (() => void) | undefined;

    vi.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          matches: false,
          media: "(max-width: 767px)",
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: (_: string, cb: () => void) => {
            listener = cb;
          },
          removeEventListener: () => {
            listener = undefined;
          },
          dispatchEvent: () => true,
        }) as unknown as MediaQueryList,
    );

    window.innerWidth = 1024;
    render(<TestComponent />);
    expect(screen.getByText("desktop")).toBeInTheDocument();

    window.innerWidth = 500;
    act(() => {
      listener?.();
    });

    expect(screen.getByText("mobile")).toBeInTheDocument();
  });
});
