import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import AgendaPage from "@/pages/AgendaPage";
import { renderWithRouter } from "@/test/test-utils";

describe("AgendaPage", () => {
  it("renders agenda headers and day sections", () => {
    renderWithRouter(<AgendaPage />, { route: "/agenda" });

    expect(screen.getByRole("heading", { name: /Agenda de la Misión/i })).toBeInTheDocument();
    expect(screen.getByText(/8 y 9 de Septiembre, 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Día 1/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Día 2/i })).toBeInTheDocument();
  });
});
