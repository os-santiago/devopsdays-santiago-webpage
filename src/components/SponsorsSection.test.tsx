import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import SponsorsSection from "@/components/SponsorsSection";
import { renderWithRouter } from "@/test/test-utils";

describe("SponsorsSection", () => {
  it("renders sponsor tiers, linked sponsors, and available slots", () => {
    renderWithRouter(<SponsorsSection />);

    expect(screen.getByText("Platinum 🪐")).toBeInTheDocument();
    expect(screen.getByText("Oro ⭐")).toBeInTheDocument();
    expect(screen.getByText("Plata 🌙")).toBeInTheDocument();
    expect(screen.getByText("Colaboraciones / Comunidades 🚀")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Sitio web de Mondini IT" })).toHaveAttribute(
      "href",
      "https://mondini-it.com/",
    );
    expect(screen.getByRole("link", { name: "Sitio web de Dynatrace" })).toHaveAttribute(
      "href",
      "https://www.dynatrace.com",
    );
    expect(screen.getByRole("link", { name: "Sitio web de TG Native" })).toHaveAttribute(
      "href",
      "https://tgcorp.tech/",
    );

    expect(screen.getByRole("link", { name: "Sitio web de Unyko Talent" })).toHaveClass("bg-slate-950");
    expect(screen.getAllByText("Espacio disponible")).toHaveLength(6);
  });

  it("links to sponsorship page", () => {
    renderWithRouter(<SponsorsSection />);

    expect(screen.getByRole("link", { name: /Conviértete en Patrocinador/i })).toHaveAttribute(
      "href",
      "/patrocinio",
    );
  });
});
