import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import SponsorsSection from "@/components/SponsorsSection";
import { renderWithRouter } from "@/test/test-utils";

describe("SponsorsSection", () => {
  it("renders every tier with its open slots linking to the sponsorship page", () => {
    renderWithRouter(<SponsorsSection />);

    expect(screen.getByRole("heading", { name: "Sé aliado de DevOpsDays Land" })).toBeInTheDocument();
    expect(screen.getByText(/19 espacios disponibles/)).toBeInTheDocument();

    const slotsPerTier: [RegExp, number][] = [
      [/Platinum/, 3],
      [/Gold/, 6],
      [/Silver/, 4],
      [/Comunidades y Training/, 6],
    ];
    slotsPerTier.forEach(([name, count]) => {
      const tier = screen.getByRole("heading", { name }).parentElement as HTMLElement;
      expect(within(tier).getAllByRole("link", { name: /Espacio disponible/ })).toHaveLength(count);
    });

    expect(screen.getByRole("link", { name: "Conviértete en Patrocinador" })).toHaveAttribute("href", "/patrocinio");
  });
});
