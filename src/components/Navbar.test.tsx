import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { renderWithRouter } from "@/test/test-utils";

describe("Navbar", () => {
  it("renders expected navigation links and the free-ticket CTA", () => {
    renderWithRouter(<Navbar />, { route: "/" });

    ["Inicio", "Agenda", "Speakers", "Patrocinio", "Contacto"].forEach((name) =>
      expect(screen.getAllByRole("link", { name }).length).toBeGreaterThan(0),
    );
    expect(screen.getByRole("link", { name: "Código de conducta" })).toHaveAttribute("href", "/codigo-de-conducta");
    expect(screen.getByRole("button", { name: "Avísame · Entrada gratis" })).toBeInTheDocument();
  });

  it("shows Agenda and Speakers as locked while they have no content", () => {
    renderWithRouter(<Navbar />, { route: "/" });

    expect(screen.getByRole("link", { name: "Agenda" })).toHaveAttribute("title", "Pronto");
    expect(screen.getByRole("link", { name: "Speakers" })).toHaveAttribute("title", "Pronto");
    expect(screen.getByRole("link", { name: "Patrocinio" })).not.toHaveAttribute("title");
  });

  it("marks active route", () => {
    renderWithRouter(<Navbar />, { route: "/agenda" });

    expect(screen.getAllByRole("link", { name: "Agenda" })[0].className).toContain("bg-primary");
  });

  it("toggles mobile menu", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar />, { route: "/" });

    expect(screen.getAllByRole("link", { name: "Agenda" })).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(screen.getAllByRole("link", { name: "Agenda" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Avísame · Entrada gratis" })).toHaveLength(2);

    await user.click(screen.getAllByRole("link", { name: "Agenda" })[1]);
    expect(screen.getAllByRole("link", { name: "Agenda" })).toHaveLength(1);
  });
});
