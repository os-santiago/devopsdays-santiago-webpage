import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import SponsorsSection from "@/components/SponsorsSection";
import { renderWithRouter } from "@/test/test-utils";

describe("SponsorsSection", () => {
  it("renders sponsor tiers and sample logos", () => {
    renderWithRouter(<SponsorsSection />);

    expect(screen.getByText("Platino 🪐")).toBeInTheDocument();
    expect(screen.getByText("Oro ⭐")).toBeInTheDocument();
    expect(screen.getByText("Plata 🌙")).toBeInTheDocument();
    expect(screen.getByText("Mondini IT")).toBeInTheDocument();
    expect(screen.getByText("Dynatrace")).toBeInTheDocument();
  });

  it("links to sponsorship page", () => {
    renderWithRouter(<SponsorsSection />);

    expect(screen.getByRole("link", { name: /Conviértete en Patrocinador/i })).toHaveAttribute(
      "href",
      "/patrocinio",
    );
  });
});
