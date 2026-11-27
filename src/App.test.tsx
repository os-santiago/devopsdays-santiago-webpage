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

  it("renders agenda route as a locked level while there is no agenda", () => {
    window.history.pushState({}, "", "/agenda");
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: /Mapa de Niveles/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /La agenda se está construyendo/i })).toBeInTheDocument();
  });

  it("renders speakers route as a locked level while there are no speakers", () => {
    window.history.pushState({}, "", "/speakers");
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: /Los Jugadores/i })).toBeInTheDocument();
    expect(screen.getByText("Nivel bloqueado")).toBeInTheDocument();
  });

  it("renders the code of conduct and its navigation link", () => {
    window.history.pushState({}, "", "/codigo-de-conducta");
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "Código de conducta" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Quick Version" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Less Quick Version" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Código de conducta" })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "confcodeofconduct.com" })).toHaveAttribute("href", "https://confcodeofconduct.com/");
    expect(screen.getByText(/DevOpsDays Santiago 2027 deben estar de acuerdo/)).toBeInTheDocument();
  });

  it("renders not found route", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    window.history.pushState({}, "", "/unknown-route");
    render(<App />);

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});
