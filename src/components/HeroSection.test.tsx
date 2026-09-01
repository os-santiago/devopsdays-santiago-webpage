import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroSection from "@/components/HeroSection";
import { renderWithRouter } from "@/test/test-utils";

describe("HeroSection", () => {
  it("renders core content and CTAs", () => {
    renderWithRouter(<HeroSection />);

    expect(screen.getByRole("heading", { name: /DevOpsDays/i })).toBeInTheDocument();
    expect(screen.getByText("8-9 Septiembre, 2026")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Comprar Entradas/i })).toHaveAttribute("href", "#entradas");
    expect(screen.getByRole("link", { name: /Descubre nuestra agenda/i })).toHaveAttribute("href", "/agenda");
  });

  it("contains location link to map", () => {
    renderWithRouter(<HeroSection />);

    const locationLink = screen.getByRole("link", {
      name: "Centro de Extensión UC, Santiago, Chile",
    });

    expect(locationLink).toHaveAttribute("href", "https://maps.app.goo.gl/sZCydBh2ycoQvyxH8");
    expect(locationLink).toHaveAttribute("target", "_blank");
  });

  it("shows the event address and map in the directions modal", async () => {
    renderWithRouter(<HeroSection />);

    await userEvent.click(screen.getByRole("button", { name: "¿Cómo llegar?" }));

    expect(screen.getByRole("heading", { name: "¿Cómo llegar al evento?" })).toBeInTheDocument();
    expect(screen.getByText("Av. Alameda Libertador Bernardo O'Higgins 390, 8331150 Santiago, Región Metropolitana")).toBeInTheDocument();
    expect(screen.getByTitle("Mapa del lugar del evento")).toHaveAttribute("src", expect.stringContaining("google.com/maps"));
  });
});
