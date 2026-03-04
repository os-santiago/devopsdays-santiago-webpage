import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import SponsorshipPage from "@/pages/SponsorshipPage";
import { renderWithRouter } from "@/test/test-utils";

describe("SponsorshipPage", () => {
  it("renders sponsorship levels and contact actions", () => {
    renderWithRouter(<SponsorshipPage />, { route: "/patrocinio" });

    expect(screen.getByRole("heading", { name: /Niveles de Patrocinio/i })).toBeInTheDocument();
    expect(screen.getByText("Platinium 🪐")).toBeInTheDocument();
    expect(screen.getByText("Gold 🌎")).toBeInTheDocument();
    expect(screen.getByText("Silver 🌙")).toBeInTheDocument();

    const contactLinks = screen.getAllByRole("link", { name: "Contactar" });
    expect(contactLinks).toHaveLength(3);
    contactLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/contacto");
    });
  });
});
