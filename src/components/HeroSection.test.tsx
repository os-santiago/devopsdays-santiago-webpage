import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroSection from "@/components/HeroSection";
import { renderWithRouter } from "@/test/test-utils";

describe("HeroSection", () => {
  it("renders the 2027 event details and the free-ticket hook", () => {
    renderWithRouter(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1, name: /DevOpsDays Santiago 2027/ })).toBeInTheDocument();
    expect(screen.getByText("Viernes 3 de septiembre, 2027")).toBeInTheDocument();
    expect(screen.getByText("8:00 – 18:00")).toBeInTheDocument();
    expect(screen.getByText(/Entrada gratuita · 700 cupos por postulación/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Centro de Extensión UC" })).toHaveAttribute("target", "_blank");
  });

  it("offers notify, calendar and teaser actions", async () => {
    const user = userEvent.setup();
    renderWithRouter(<HeroSection />);

    expect(screen.getByRole("button", { name: /Avísame cuando abran las postulaciones/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Agregar a mi calendario/ })).toHaveAttribute(
      "href",
      "/devopsdays-santiago-2027.ics",
    );

    await user.click(screen.getByRole("button", { name: /Ver teaser/ }));
    const video = document.querySelector("video");
    expect(video).toHaveAttribute("poster", "/teaser-poster.jpg");
    expect(video?.querySelector("source")).toHaveAttribute("src", "/teaser-2027.mp4");
  });

  it("opens the directions dialog with the map", async () => {
    const user = userEvent.setup();
    renderWithRouter(<HeroSection />);

    await user.click(screen.getByRole("button", { name: "¿Cómo llegar?" }));

    expect(screen.getByRole("heading", { name: "¿Cómo llegar al evento?" })).toBeInTheDocument();
    expect(screen.getByText(/Av. Alameda Libertador Bernardo O'Higgins 390/)).toBeInTheDocument();
    expect(screen.getByTitle("Mapa del lugar del evento")).toBeInTheDocument();
  });
});
