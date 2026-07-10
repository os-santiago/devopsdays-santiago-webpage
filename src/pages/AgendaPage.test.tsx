import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AgendaPage from "@/pages/AgendaPage";
import { renderWithRouter } from "@/test/test-utils";

describe("AgendaPage", () => {
  it("renders agenda tabs, room lanes, capacities, and shared events", () => {
    renderWithRouter(<AgendaPage />, { route: "/agenda" });

    expect(screen.getByRole("heading", { name: /Agenda de la Misión/i })).toBeInTheDocument();
    expect(screen.getByText(/8 y 9 de Septiembre, 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Día 1/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Día 2/i })).toBeInTheDocument();

    expect(screen.getAllByText("Auditorio Principal").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sala A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sala B").length).toBeGreaterThan(0);
    expect(screen.getAllByText("700+ personas").length).toBeGreaterThan(0);
    expect(screen.getAllByText("100 personas").length).toBeGreaterThanOrEqual(2);

    expect(screen.getAllByText("Panel de Mujeres 👩🏼‍💻: --").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Taller: --").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sala cerrada").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Registro y Café ☕ + Networking 🗣️").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Salas" })).toBeInTheDocument();
    expect(
      screen.getByText(/Sala principal donde tendremos las actividades principales para un público de 700\+ personas\./i),
    ).toBeInTheDocument();
  });

  it("opens a session details dialog from an agenda card", async () => {
    const user = userEvent.setup();

    renderWithRouter(<AgendaPage />, { route: "/agenda" });

    await user.click(screen.getAllByRole("button", { name: /Panel de Mujeres/i })[0]);

    const dialog = screen.getByRole("dialog");
    const dialogContent = within(dialog);

    expect(dialog).toBeInTheDocument();
    expect(dialogContent.getByRole("heading", { name: "Panel de Mujeres 👩🏼‍💻: --" })).toBeInTheDocument();
    expect(dialogContent.getByText("8 de Septiembre · 12:00 · Auditorio Principal")).toBeInTheDocument();
    expect(dialogContent.getByText("Pronto publicaremos más detalles de esta actividad.")).toBeInTheDocument();
    expect(dialogContent.getByText("Karen Quijada")).toBeInTheDocument();
    expect(dialogContent.getByText("Por confirmar")).toBeInTheDocument();
    expect(dialogContent.getByText("Actividad")).toBeInTheDocument();
    expect(dialogContent.getByAltText("Foto de Karen Quijada")).toHaveAttribute("src", "/placeholder.svg");
  });
});
