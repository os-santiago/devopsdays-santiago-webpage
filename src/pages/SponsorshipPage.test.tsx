import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import SponsorshipPage from "@/pages/SponsorshipPage";
import { renderWithRouter } from "@/test/test-utils";

describe("SponsorshipPage", () => {
  it("renders sponsorship levels and a single contact action", () => {
    renderWithRouter(<SponsorshipPage />, { route: "/patrocinio" });

    expect(screen.getByRole("heading", { name: /Niveles de Patrocinio/i })).toBeInTheDocument();
    expect(screen.getByText("Platinum 🪐")).toBeInTheDocument();
    expect(screen.getByText("Gold 🌎")).toBeInTheDocument();
    expect(screen.getByText("Silver 🌙")).toBeInTheDocument();
    expect(screen.getByText("Colaboraciones y Comunidades")).toBeInTheDocument();

    const contactLinks = screen.getAllByRole("link", { name: "Contactar" });
    expect(contactLinks).toHaveLength(1);
    contactLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/contacto");
    });

    expect(screen.getByRole("link", { name: "Convocar colaboraciones y comunidades" })).toHaveAttribute(
      "href",
      "/contacto",
    );
  });
});
