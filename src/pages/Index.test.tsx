import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Index from "@/pages/Index";
import { renderWithRouter } from "@/test/test-utils";

describe("Index", () => {
  it("renders the home sections in promotional order", () => {
    renderWithRouter(<Index />);

    const order = [
      /DevOpsDays Santiago 2027/,
      /Mundo Santiago/,
      /Revive la Misión 2026/,
      /Cómo se juega/,
      /Desbloquea tu entrada gratis/,
      /Inserta tu charla/,
      /Sé aliado de DevOpsDays Land/,
      /Preguntas frecuentes/,
    ].map((name) => screen.getByRole("heading", { name }));

    order.slice(1).forEach((heading, i) =>
      expect(order[i].compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy(),
    );
  });

  it("embeds the 2026 recap without tracking cookies and links to the channel", () => {
    renderWithRouter(<Index />);

    const video = screen.getByTitle("Video resumen DevOpsDays Santiago 2026");
    expect(video).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/a69mWcLuZEs");
    expect(video).toHaveAttribute("loading", "lazy");
    expect(screen.getByRole("link", { name: /Ver más videos en YouTube/ })).toHaveAttribute(
      "href",
      "https://www.youtube.com/@DevOpsDaysSantiago",
    );
    expect(screen.getByRole("link", { name: "Visita el sitio 2026" })).toHaveAttribute("href", "/2026/");
  });

  it("answers FAQs without inventing unconfirmed details", () => {
    renderWithRouter(<Index />);

    expect(screen.getByText("¿La entrada es realmente gratis?")).toBeInTheDocument();
    expect(screen.getAllByText("Pronto lo confirmaremos.").length).toBeGreaterThanOrEqual(4);
    expect(screen.getByRole("link", { name: "niveles de patrocinio" })).toHaveAttribute("href", "/patrocinio");
  });
});
