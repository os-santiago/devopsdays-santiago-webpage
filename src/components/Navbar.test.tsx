import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { renderWithRouter } from "@/test/test-utils";

describe("Navbar", () => {
  it("renders expected navigation links", () => {
    renderWithRouter(<Navbar />, { route: "/" });

    expect(screen.getAllByRole("link", { name: "Inicio" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Agenda" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Patrocinio" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contacto" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Entradas/i }).length).toBeGreaterThan(0);
  });

  it("marks active route", () => {
    renderWithRouter(<Navbar />, { route: "/agenda" });

    const agendaLink = screen.getAllByRole("link", { name: "Agenda" })[0];
    expect(agendaLink.className).toContain("bg-primary");
  });

  it("toggles mobile menu", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar />, { route: "/" });

    expect(screen.getAllByRole("link", { name: "Agenda" })).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(screen.getAllByRole("link", { name: "Agenda" })).toHaveLength(2);

    const mobileAgendaLink = screen.getAllByRole("link", { name: "Agenda" })[1];
    await user.click(mobileAgendaLink);
    expect(screen.getAllByRole("link", { name: "Agenda" })).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    const mobileTicketsLink = screen.getAllByRole("link", { name: /Entradas/i })[1];
    mobileTicketsLink.addEventListener("click", (event) => event.preventDefault());
    await user.click(mobileTicketsLink);
    expect(screen.getAllByRole("link", { name: "Agenda" })).toHaveLength(1);
  });
});
