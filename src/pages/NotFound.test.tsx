import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import NotFound from "@/pages/NotFound";
import { renderWithRouter } from "@/test/test-utils";

describe("NotFound", () => {
  it("renders 404 and logs missing route", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderWithRouter(<NotFound />, { route: "/ruta-que-no-existe" });

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/");

    expect(errorSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/ruta-que-no-existe",
    );

    errorSpy.mockRestore();
  });
});
