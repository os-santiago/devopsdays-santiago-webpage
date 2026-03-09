import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import CFPSection from "@/components/CFPSection";
import { renderWithRouter } from "@/test/test-utils";

describe("CFPSection", () => {
  it("renders themes, format and deadline blocks", () => {
    renderWithRouter(<CFPSection />);

    expect(screen.getByText("Temas")).toBeInTheDocument();
    expect(screen.getByText("Formato")).toBeInTheDocument();
    expect(screen.getByText("Deadline")).toBeInTheDocument();
    expect(screen.getByText("07 de Junio, 2026")).toBeInTheDocument();
  });

  it("renders external CFP link", () => {
    renderWithRouter(<CFPSection />);

    const cfpLink = screen.getByRole("link", { name: /Postula tu Charla/i });
    expect(cfpLink).toHaveAttribute(
      "href",
      "https://homedir.opensourcesantiago.io/event/devopsdays-santiago-2026/cfp",
    );
    expect(cfpLink).toHaveAttribute("target", "_blank");
    expect(cfpLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
