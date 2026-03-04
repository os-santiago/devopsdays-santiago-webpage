import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

vi.mock("@/components/ui/toaster", () => ({
  Toaster: () => null,
}));

vi.mock("@/components/ui/sonner", () => ({
  Toaster: () => null,
}));

vi.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }: { children: ReactNode }) => children,
}));

import App from "@/App";

describe("App routes", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders agenda route", () => {
    window.history.pushState({}, "", "/agenda");
    render(<App />);

    expect(screen.getByRole("heading", { name: /Agenda de la Misión/i })).toBeInTheDocument();
  });

  it("renders not found route", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    window.history.pushState({}, "", "/unknown-route");
    render(<App />);

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});
