import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { renderWithRouter } from "@/test/test-utils";

describe("Footer", () => {
  it("renders navigation, the 2026 archive and social links", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Agenda" })).toHaveAttribute("href", "/agenda");
    expect(screen.getByRole("link", { name: "Speakers" })).toHaveAttribute("href", "/speakers");
    expect(screen.getByRole("link", { name: "Patrocinio" })).toHaveAttribute("href", "/patrocinio");
    expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "/contacto");
    expect(screen.getByRole("link", { name: "Ediciones anteriores: 2026" })).toHaveAttribute("href", "/2026/");

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/devopsdayschile",
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/devopsdayssantiago",
    );
    expect(screen.getByRole("link", { name: "YouTube" })).toHaveAttribute(
      "href",
      "https://www.youtube.com/@DevOpsDaysSantiago",
    );
    expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute("href", "https://devopsdayschile.cl");
    expect(screen.getByText(/© 2027 DevOpsDays Santiago/)).toBeInTheDocument();
  });
});
