import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EventInfoSection from "@/components/EventInfoSection";
import Countdown, { timeLeft } from "@/components/Countdown";

describe("EventInfoSection", () => {
  it("renders the 2027 stats", () => {
    render(<EventInfoSection />);

    expect(screen.getByRole("heading", { name: "Mundo Santiago" })).toBeInTheDocument();
    ["1 día", "3 Sept 2027", "Centro de Extensión UC", "700 cupos gratuitos"].forEach((value) =>
      expect(screen.getByText(value)).toBeInTheDocument(),
    );
  });
});

describe("Countdown", () => {
  it("computes days, hours and minutes left", () => {
    const target = Date.UTC(2027, 8, 3, 12);
    expect(timeLeft(target, target - ((2 * 24 + 3) * 60 + 4) * 60_000)).toEqual({ days: 2, hours: 3, minutes: 4 });
    expect(timeLeft(target, target + 1)).toEqual({ days: 0, hours: 0, minutes: 0 });
  });

  it("renders the scoreboard before the event and a message once it starts", () => {
    const { rerender } = render(<Countdown target="2999-01-01T00:00:00Z" />);
    expect(screen.getByText("Días")).toBeInTheDocument();
    expect(screen.getByText("Min")).toBeInTheDocument();

    rerender(<Countdown target="2000-01-01T00:00:00Z" />);
    expect(screen.getByText(/Estamos jugando/)).toBeInTheDocument();
    expect(screen.queryByText("Días")).not.toBeInTheDocument();
  });
});
