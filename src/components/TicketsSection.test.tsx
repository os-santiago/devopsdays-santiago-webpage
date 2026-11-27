import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TicketsSection from "@/components/TicketsSection";
import TicketCta from "@/components/TicketCta";
import { event2027 } from "@/data/event";

// The real URLs are set in event2027 when the application process opens.
beforeAll(() => {
  event2027.ticketsApplyUrl = "https://forms.example/postular";
  event2027.ticketsRulesUrl = "https://forms.example/bases";
});

describe("TicketsSection", () => {
  it("explains the free, application-based tickets", () => {
    render(<TicketsSection />);

    expect(screen.getByRole("heading", { name: "Desbloquea tu entrada gratis" })).toBeInTheDocument();
    expect(screen.getByText("GRATIS · 700 cupos")).toBeInTheDocument();
    ["Postula", "El equipo revisa", "Recibe tu entrada"].forEach((step) =>
      expect(screen.getByRole("heading", { name: step })).toBeInTheDocument(),
    );
  });

  it("asks to be notified while applications are not open yet", () => {
    render(<TicketsSection status="soon" />);

    expect(screen.getByText(/Muy pronto abriremos el proceso de postulación y publicaremos las bases/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Avísame cuando abran las postulaciones/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Ver bases" })).not.toBeInTheDocument();
  });

  it("links to the application and the rules when open", () => {
    render(<TicketsSection status="open" />);

    expect(screen.getByRole("link", { name: /Postular a mi entrada/ })).toHaveAttribute("href", "https://forms.example/postular");
    expect(screen.getByRole("link", { name: "Ver bases" })).toHaveAttribute("href", "https://forms.example/bases");
  });

  it("shows applications as closed", () => {
    render(<TicketsSection status="closed" />);

    expect(screen.getByRole("button", { name: "Postulaciones cerradas" })).toBeDisabled();
  });
});

describe("TicketCta", () => {
  it("has a compact variant for the navbar", () => {
    const { rerender } = render(<TicketCta compact status="soon" />);
    expect(screen.getByRole("button", { name: "Avísame · Entrada gratis" })).toBeInTheDocument();

    rerender(<TicketCta compact status="open" />);
    expect(screen.getByRole("link", { name: /Postular · Gratis/ })).toBeInTheDocument();
  });
});
