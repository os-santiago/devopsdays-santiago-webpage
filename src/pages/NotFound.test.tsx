import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import NotFound from "@/pages/NotFound";
import { renderWithRouter } from "@/test/test-utils";

describe("NotFound", () => {
  it("renders 404 and logs missing route", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderWithRouter(<NotFound />, { route: "/ruta-que-no-existe" });

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText("¡Ups! Te caíste del mapa.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");

    expect(errorSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/ruta-que-no-existe",
    );

    errorSpy.mockRestore();
  });
});
