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

const items: AgendaItem[] = [
  { time: "08:00", title: "Registro y Café", type: "break", room: "all" },
  { id: "keynote-ada", time: "09:00", title: "Keynote de apertura", type: "keynote", room: "main", speakerIds: ["ada"], description: "Bienvenida al mundo.", topics: ["Cultura"] },
  { time: "10:00", title: "Charla en sala A", type: "talk", room: "room-a", speakerIds: ["grace"] },
  { time: "10:00", title: "Taller en sala B", type: "workshop", room: "room-b", host: "Comunidad", durationSlots: 2 },
  { time: "11:00", title: "Panel principal", type: "panel", room: "main", speakerIds: ["ada", "grace"] },
];

describe("AgendaPage", () => {
  it("shows a locked level while the 2027 agenda is empty", () => {
    renderWithRouter(<AgendaPage items={[]} />, { route: "/agenda" });

    expect(screen.getByRole("heading", { level: 1, name: /Mapa de Niveles/ })).toBeInTheDocument();
    expect(screen.getByText(/Viernes 3 de septiembre, 2027 · 8:00 – 18:00 · Centro de Extensión UC/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "La agenda se está construyendo" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Salas" })).not.toBeInTheDocument();
  });

  it("renders a single-day grid with rooms, capacities and shared events", () => {
    renderWithRouter(<AgendaPage items={items} speakerList={speakerList} />, { route: "/agenda" });

    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    expect(screen.getAllByText("Auditorio Principal").length).toBeGreaterThan(0);
    expect(screen.getAllByText("700+ personas").length).toBeGreaterThan(0);
    expect(screen.getAllByText("100 personas").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Registro y Café").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Taller").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sala cerrada").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Salas" })).toBeInTheDocument();
  });

  it("opens a session details dialog from an agenda card", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AgendaPage items={items} speakerList={speakerList} />, { route: "/agenda" });

    await user.click(screen.getAllByRole("button", { name: /Keynote de apertura/ })[0]);

    const dialog = within(screen.getByRole("dialog"));
    expect(dialog.getByRole("heading", { name: "Keynote de apertura" })).toBeInTheDocument();
    expect(dialog.getByText("3 de septiembre · 09:00 · Auditorio Principal")).toBeInTheDocument();
    expect(dialog.getByText("Bienvenida al mundo.")).toBeInTheDocument();
    expect(dialog.getByText("Ada")).toBeInTheDocument();
  });

  it("opens a session directly from its URL id", () => {
    renderWithRouter(<AgendaPage items={items} speakerList={speakerList} />, { route: "/agenda?session=keynote-ada" });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keynote de apertura" })).toBeInTheDocument();
  });

  it.each([
    ["sin speaker", { host: "Comité Organizador" }, ["Comité Organizador"]],
    ["con un speaker", { speakerIds: ["ada"] }, ["Ada", "SRE"]],
    ["con varios speakers", { speakerIds: ["ada", "grace"] }, ["Ada", "Grace"]],
  ])("renders a session %s", (_, speakerData, expectedTexts) => {
    const item: AgendaItem = { id: "session", time: "09:00", title: "Sesión compartida", type: "talk", room: "main", ...speakerData };

    render(
      <Dialog open>
        <SessionDetailsDialog item={item} speakerList={speakerList} />
      </Dialog>,
    );

    expectedTexts.forEach((text) => expect(within(screen.getByRole("dialog")).getByText(text)).toBeInTheDocument());
  });

  it("does not render speaker details for breaks", () => {
    const item: AgendaItem = { time: "10:00", title: "Coffee Break", type: "break", room: "all" };

    render(
      <Dialog open>
        <SessionDetailsDialog item={item} speakerList={speakerList} />
      </Dialog>,
    );

    expect(within(screen.getByRole("dialog")).queryByText("Speaker")).not.toBeInTheDocument();
  });

  it("preserves line breaks in session descriptions", () => {
    const item: AgendaItem = { time: "09:00", title: "Keynote", description: "Primer párrafo.\nSegundo párrafo.", type: "keynote", room: "main" };

    render(
      <Dialog open>
        <SessionDetailsDialog item={item} speakerList={speakerList} />
      </Dialog>,
    );

    const description = screen.getByRole("dialog").querySelector(".whitespace-pre-line");
    expect(description?.textContent).toBe(item.description);
  });
});
