import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { renderWithRouter } from "@/test/test-utils";

describe("NavLink", () => {
  it("applies active class name when route matches", () => {
    renderWithRouter(
      <Routes>
        <Route
          path="/agenda"
          element={<NavLink to="/agenda" className="base" activeClassName="active">Agenda</NavLink>}
        />
      </Routes>,
      { route: "/agenda" },
    );

    const link = screen.getByRole("link", { name: "Agenda" });
    expect(link).toHaveClass("base");
    expect(link).toHaveClass("active");
  });

  it("does not apply active class when route does not match", () => {
    renderWithRouter(
      <Routes>
        <Route
          path="*"
          element={<NavLink to="/agenda" className="base" activeClassName="active">Agenda</NavLink>}
        />
      </Routes>,
      { route: "/contacto" },
    );

    const link = screen.getByRole("link", { name: "Agenda" });
    expect(link).toHaveClass("base");
    expect(link).not.toHaveClass("active");
  });
});
