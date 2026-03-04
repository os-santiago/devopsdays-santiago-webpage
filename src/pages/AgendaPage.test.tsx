import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import AgendaPage, { AgendaDay } from "@/pages/AgendaPage";
import { renderWithRouter } from "@/test/test-utils";

describe("AgendaPage", () => {
  it("renders agenda headers and day sections", () => {
    renderWithRouter(<AgendaPage />, { route: "/agenda" });

    expect(screen.getByRole("heading", { name: /Agenda de la Misión/i })).toBeInTheDocument();
    expect(screen.getByText(/8 y 9 de Septiembre, 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Día 1/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Día 2/i })).toBeInTheDocument();
  });

  it("renders agenda items with icon styles and optional speaker", () => {
    renderWithRouter(
      <AgendaDay
        title="Prueba"
        items={[
          { time: "09:00", title: "Keynote", speaker: "Jane Doe", type: "keynote" },
          { time: "10:00", title: "Coffee Break", speaker: "", type: "break" },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Prueba" })).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Keynote")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("Coffee Break")).toBeInTheDocument();
  });
});
