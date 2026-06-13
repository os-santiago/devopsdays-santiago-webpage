import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";
import { renderWithRouter } from "@/test/test-utils";

describe("HeroSection", () => {
  it("renders core content and CTAs", () => {
    renderWithRouter(<HeroSection />);

    expect(screen.getByRole("heading", { name: /DevOpsDays/i })).toBeInTheDocument();
    expect(screen.getByText("8-9 Septiembre, 2026")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Comprar Entradas/i })).toHaveAttribute("href", "#entradas");
    expect(screen.getByRole("link", { name: /Postula tu Charla/i })).toHaveAttribute("href", "#cfp");
    expect(screen.getByRole("link", { name: /Participa como Voluntario/i })).toHaveAttribute("href", "https://forms.gle/kfrbUgDVMSgYW9rs8");
  });

  it("contains location link to map", () => {
    renderWithRouter(<HeroSection />);

    const locationLink = screen.getByRole("link", {
      name: "Centro de Extensión UC, Santiago, Chile",
    });

    expect(locationLink).toHaveAttribute("href", "https://maps.app.goo.gl/sZCydBh2ycoQvyxH8");
    expect(locationLink).toHaveAttribute("target", "_blank");
  });
});
