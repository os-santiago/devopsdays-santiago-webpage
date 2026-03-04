import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Index from "@/pages/Index";
import { renderWithRouter } from "@/test/test-utils";

describe("Index page", () => {
  it("renders main homepage sections", () => {
    renderWithRouter(<Index />);

    expect(screen.getAllByRole("heading", { name: /DevOpsDays/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Aliados de la Misión/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Reserva tu Asiento/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Comparte tu Misión/i })).toBeInTheDocument();
  });
});
