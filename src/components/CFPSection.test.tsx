import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CFPSection from "@/components/CFPSection";
import { event2027 } from "@/data/event";

beforeAll(() => {
  event2027.cfpUrl = "https://forms.example/cfp";
});

describe("CFPSection", () => {
  it("announces the CFP is coming soon with links to follow along", () => {
    render(<CFPSection />);

    expect(screen.getByRole("heading", { name: "Inserta tu charla" })).toBeInTheDocument();
    expect(screen.getByText(/Muy pronto anunciaremos la apertura del CFP/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Instagram/ })).toHaveAttribute("href", "https://www.instagram.com/devopsdayssantiago");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toBeInTheDocument();
  });

  it("links to the application when open", () => {
    render(<CFPSection status="open" />);

    expect(screen.getByRole("link", { name: /Postula tu charla/ })).toHaveAttribute("href", "https://forms.example/cfp");
  });

  it("thanks applicants when closed", () => {
    render(<CFPSection status="closed" />);

    expect(screen.getByText(/El CFP 2027 ya cerró/)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
