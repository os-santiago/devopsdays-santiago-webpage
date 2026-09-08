import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import TicketsSection from "@/components/TicketsSection";
import { renderWithRouter } from "@/test/test-utils";

describe("TicketsSection", () => {
  it("renders all ticket options", () => {
    renderWithRouter(<TicketsSection />);

    expect(screen.getByText("Entrada 2 días 🛸")).toBeInTheDocument();
    expect(screen.getByText("Entrada VIP ⭐")).toBeInTheDocument();
    expect(screen.getByText("Entrada 2 días con Estacionamiento 💎")).toBeInTheDocument();
    expect(screen.getByText("Entrada 1 día 🛠️")).toBeInTheDocument();
  });

  it("renders prices with ticket sales closed", () => {
    renderWithRouter(<TicketsSection />);

    expect(screen.getByText("$25.000 CLP")).toBeInTheDocument();
    expect(screen.getByText("$50.000 CLP")).toBeInTheDocument();
    expect(screen.getByText("$30.000 CLP")).toBeInTheDocument();
    expect(screen.getByText("$15.000 CLP")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "SOLD OUT!" })).toBeInTheDocument();
    const soldOutButtons = screen.getAllByRole("button", { name: "SOLD OUT!" });
    expect(soldOutButtons).toHaveLength(4);
    soldOutButtons.forEach((button) => expect(button).toBeDisabled());
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
