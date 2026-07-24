import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpeakersContent } from "@/pages/SpeakersPage";
import type { AgendaItem, Speaker } from "@/data/event";

const sessions: AgendaItem[] = [
  { id: "keynote-session", day: "day-1", time: "09:00", title: "El futuro de DevOps", speakerIds: ["ada"], type: "keynote", room: "main", description: "Una mirada al futuro.", topics: ["Cultura"] },
  { id: "sponsor-session", day: "day-1", time: "10:30", title: "DevOps a escala", speakerIds: ["grace"], type: "talk", room: "main", description: "Experiencias a escala.", topics: ["Plataforma"] },
  { id: "accepted-session", day: "day-2", time: "12:00", title: "Operaciones simples", speakerIds: ["linus", "grace"], type: "talk", room: "room-a", description: "Menos complejidad.", topics: ["SRE"] },
  { id: "second-session", day: "day-2", time: "15:00", title: "Sistemas mantenibles", speakerIds: ["linus"], type: "talk", room: "main", description: "Cómo mantener sistemas.", topics: ["Diseño"] },
];

const speakerList: Speaker[] = [
  { id: "ada", category: "keynote", name: "Ada", role: "Referente DevOps", photo: "/ada.jpg", banner: "/ada-banner.jpg", socials: [{ label: "LinkedIn", url: "https://example.com/ada" }] },
  { id: "grace", category: "sponsor", name: "Grace", role: "Platform Lead", photo: "/grace.jpg", company: "Acme", companyLogo: "/acme.svg", socials: [{ label: "LinkedIn", url: "https://example.com/grace" }] },
  { id: "linus", category: "accepted", name: "Linus", role: "SRE", photo: "/linus.jpg", socials: [{ label: "GitHub", url: "https://example.com/linus" }] },
];

describe("SpeakersContent", () => {
  it("renders the three categories in order with their distinct card content", () => {
    render(<SpeakersContent speakerList={speakerList} sessions={sessions} />);

    const headings = ["Keynotes", "Patrocinadores", "Postulantes Aceptados"].map((name) => screen.getByRole("heading", { name }));
    expect(headings[0].compareDocumentPosition(headings[1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(headings[1].compareDocumentPosition(headings[2]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByAltText("Gráfica promocional de Ada")).toHaveAttribute("src", "/ada-banner.jpg");
    expect(screen.getByAltText("Logo de Acme")).toHaveAttribute("src", "/acme.svg");
    expect(screen.getByRole("button", { name: /Ada/ })).not.toHaveClass("max-w-sm", "max-w-xs");
    expect(screen.getByRole("button", { name: /Grace/ })).toHaveClass("max-w-sm");
    expect(screen.getByRole("button", { name: /Linus/ })).toHaveClass("max-w-xs");
    expect(screen.getByRole("button", { name: /Linus/ })).not.toHaveTextContent("Acme");
  });

  it.each([
    ["Ada", ["El futuro de DevOps"], "8 de Septiembre · 09:00", "Cultura"],
    ["Grace", ["DevOps a escala", "Operaciones simples"], "8 de Septiembre · 10:30", "Plataforma"],
    ["Linus", ["Operaciones simples", "Sistemas mantenibles"], "9 de Septiembre · 12:00", "SRE"],
  ])("opens %s details", async (name, titles, schedule, topic) => {
    const user = userEvent.setup();
    render(<SpeakersContent speakerList={speakerList} sessions={sessions} />);

    await user.click(screen.getByRole("button", { name: new RegExp(name) }));
    const dialog = within(screen.getByRole("dialog"));

    expect(dialog.getByRole("heading", { name })).toBeInTheDocument();
    titles.forEach((title) => expect(dialog.getByText(title)).toBeInTheDocument());
    expect(dialog.getByText(schedule)).toBeInTheDocument();
    expect(dialog.getAllByText(topic).length).toBeGreaterThan(0);
    expect(dialog.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("falls back when an external speaker photo fails", () => {
    render(<SpeakersContent speakerList={speakerList} sessions={sessions} />);

    const photo = screen.getByAltText("Foto de Linus");
    fireEvent.error(photo);

    expect(photo).toHaveAttribute("src", "/placeholder.svg");
  });

  it("uses placeholders for undeclared speaker images", () => {
    const speakersWithoutImages = speakerList.map((speaker) => ({
      ...speaker,
      photo: "",
      banner: undefined,
      companyLogo: undefined,
    }));

    render(<SpeakersContent speakerList={speakersWithoutImages} sessions={sessions} />);

    expect(screen.getByAltText("Gráfica promocional de Ada")).toHaveAttribute("src", "/placeholder.svg");
    expect(screen.getByAltText("Foto de Grace")).toHaveAttribute("src", "/placeholder.svg");
    expect(screen.getByAltText("Logo de Acme")).toHaveAttribute("src", "/placeholder.svg");
  });
});
