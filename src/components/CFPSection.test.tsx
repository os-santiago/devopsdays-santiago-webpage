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

  it("shows that CFP submissions are closed", () => {
    renderWithRouter(<CFPSection />);

    expect(screen.getByText("El plazo para postular ya finalizó")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Postulaciones cerradas/i })).toBeDisabled();
  });
});
