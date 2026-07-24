import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AgendaPage, { SessionDetailsDialog } from "@/pages/AgendaPage";
import { Dialog } from "@/components/ui/dialog";
import { renderWithRouter } from "@/test/test-utils";
import type { AgendaItem, Speaker } from "@/data/event";

const speakerList: Speaker[] = [
  { id: "ada", category: "accepted", name: "Ada", role: "SRE", photo: "https://example.com/ada.jpg", socials: [{ label: "LinkedIn", url: "https://linkedin.com/in/ada" }] },
  { id: "grace", category: "accepted", name: "Grace", role: "Platform Lead", photo: "https://example.com/grace.jpg", socials: [] },
];

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

    expect(screen.getAllByText(/Organizadores - Más allá de la IA/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/El pod que tumbó la cadena/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Taller").length).toBeGreaterThan(0);
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

    await user.click(screen.getAllByRole("button", { name: /Organizadores - Más allá de la IA/i })[0]);

    const dialog = screen.getByRole("dialog");
    const dialogContent = within(dialog);

    expect(dialog).toBeInTheDocument();
    expect(dialogContent.getByRole("heading", { name: "Organizadores - Más allá de la IA: la evolución de las comunidades DevOps en LATAM en un mundo de IA" })).toBeInTheDocument();
    expect(dialogContent.getByText("8 de Septiembre · 12:00 · Auditorio Principal")).toBeInTheDocument();
    expect(dialogContent.getByText(/La Inteligencia Artificial está transformando/)).toBeInTheDocument();
    expect(dialogContent.getByText("Karen Quijada")).toBeInTheDocument();
    expect(dialogContent.getByText("Panel")).toBeInTheDocument();
  });

  it("opens a session directly from its URL id", () => {
    renderWithRouter(<AgendaPage />, { route: "/agenda?session=keynote-matias-sonnleitner" });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", {
      name: "DevOps ha muerto, larga vida al DevOps: de servir aplicaciones a servir modelos",
    })).toBeInTheDocument();
  });

  it.each([
    ["sin speaker", { host: "Comité Organizador" }, ["Comité Organizador"]],
    ["con un speaker", { speakerIds: ["ada"] }, ["Ada", "SRE"]],
    ["con varios speakers", { speakerIds: ["ada", "grace"] }, ["Ada", "Grace"]],
  ])("renders a session %s", (_, speakerData, expectedTexts) => {
    const item: AgendaItem = {
      id: "session",
      day: "day-1",
      time: "09:00",
      title: "Sesión compartida",
      type: "talk",
      room: "main",
      ...speakerData,
    };

    render(
      <Dialog open>
        <SessionDetailsDialog item={item} speakerList={speakerList} />
      </Dialog>,
    );

    expectedTexts.forEach((text) => expect(within(screen.getByRole("dialog")).getByText(text)).toBeInTheDocument());
  });

  it("does not render speaker details for breaks", () => {
    const item: AgendaItem = {
      day: "day-1",
      time: "10:00",
      title: "Coffee Break",
      type: "break",
      room: "all",
    };

    render(
      <Dialog open>
        <SessionDetailsDialog item={item} speakerList={speakerList} />
      </Dialog>,
    );

    expect(within(screen.getByRole("dialog")).queryByText("Speaker")).not.toBeInTheDocument();
  });

  it("preserves line breaks in session descriptions", () => {
    const item: AgendaItem = {
      day: "day-1",
      time: "09:00",
      title: "Keynote",
      description: "Primer párrafo.\nSegundo párrafo.",
      type: "keynote",
      room: "main",
    };

    render(
      <Dialog open>
        <SessionDetailsDialog item={item} speakerList={speakerList} />
      </Dialog>,
    );

    const description = screen.getByRole("dialog").querySelector(".whitespace-pre-line");
    expect(description?.textContent).toBe(item.description);
    expect(description).toHaveClass("whitespace-pre-line");
  });
});
