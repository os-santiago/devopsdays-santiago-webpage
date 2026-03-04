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

  it("renders prices and buy actions", () => {
    renderWithRouter(<TicketsSection />);

    expect(screen.getByText("$25.000 CLP")).toBeInTheDocument();
    expect(screen.getByText("$50.000 CLP")).toBeInTheDocument();
    expect(screen.getByText("$30.000 CLP")).toBeInTheDocument();
    expect(screen.getByText("$15.000 CLP")).toBeInTheDocument();

    const buyLinks = screen.getAllByRole("link", { name: "Comprar" });
    expect(buyLinks).toHaveLength(4);
    buyLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://ticketplus.cl/events/devopsdays-santiago-2026#select-tickets");
    });
  });
});
