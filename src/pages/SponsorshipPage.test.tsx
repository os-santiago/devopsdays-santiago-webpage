import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import SponsorshipPage from "@/pages/SponsorshipPage";
import { renderWithRouter } from "@/test/test-utils";

describe("SponsorshipPage", () => {
  it("lists the 2027 tiers with slots, kept benefits and pending prices", () => {
    renderWithRouter(<SponsorshipPage />);

    expect(screen.getByRole("heading", { name: /Niveles de Patrocinio/i })).toBeInTheDocument();
    expect(screen.queryByText("SOLD OUT!")).not.toBeInTheDocument();

    const tiers: [string, string, string[]][] = [
      ["Platinum", "3 espacios", ["Stand 4x2 mtrs tipo isla", "Mucha más visibilidad"]],
      ["Gold", "6 espacios", ["Stand 3x2 mtrs", "Mayor visibilidad"]],
      ["Silver", "4 espacios", ["Stand 2x2 mtrs"]],
      ["Comunidades y Training", "6 espacios", ["Presencia en redes sociales y página web"]],
    ];
    tiers.forEach(([name, slots, benefits]) => {
      const card = within(screen.getByRole("heading", { name }).closest("li") as HTMLElement);
      expect(card.getByText(slots)).toBeInTheDocument();
      expect(card.getByText("Valor: pronto lo publicaremos")).toBeInTheDocument();
      benefits.forEach((benefit) => expect(card.getByText(benefit)).toBeInTheDocument());
      expect(card.queryByText(/Entradas|Estacionamiento|After Office|escenario/)).not.toBeInTheDocument();
    });

    expect(screen.getAllByText(/Pronto publicaremos más beneficios por nivel/)).toHaveLength(5);
    expect(screen.getAllByRole("link", { name: "Contactar" })).toHaveLength(4);
    screen.getAllByRole("link", { name: "Contactar" }).forEach((link) => expect(link).toHaveAttribute("href", "/contacto"));
  });
});
