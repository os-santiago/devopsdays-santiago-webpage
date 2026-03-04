import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";

const toastSpy = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: toastSpy }),
}));

import ContactPage from "@/pages/ContactPage";

describe("ContactPage", () => {
  it("renders contact content and form fields", () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    expect(screen.getByRole("heading", { name: /Comunícate con el/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tu nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("tu@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("¿En qué podemos ayudarte?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cuéntanos más...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  it("includes hidden honeypot field", () => {
    const { container } = renderWithRouter(<ContactPage />, { route: "/contacto" });

    const honeypot = container.querySelector('input[name="website"]') as HTMLInputElement | null;
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("type", "text");
    expect(honeypot).toHaveValue("");
  });

  it("disables native form validation", () => {
    const { container } = renderWithRouter(<ContactPage />, { route: "/contacto" });

    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    expect(form).toHaveAttribute("novalidate");
  });
});
