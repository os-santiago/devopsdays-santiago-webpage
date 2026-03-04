import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import EventInfoSection from "@/components/EventInfoSection";
import { renderWithRouter } from "@/test/test-utils";

describe("EventInfoSection", () => {
  it("renders key stats", () => {
    renderWithRouter(<EventInfoSection />);

    expect(screen.getByText("8-9 Sept 2026")).toBeInTheDocument();
    expect(screen.getByText("Centro de Extensión UC")).toBeInTheDocument();
    expect(screen.getByText("700+")).toBeInTheDocument();
    expect(screen.getByText("20+")).toBeInTheDocument();
  });
});
