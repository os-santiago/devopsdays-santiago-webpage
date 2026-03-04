import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";

const toastSpy = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: toastSpy }),
}));

import ContactPage from "@/pages/ContactPage";

describe("ContactPage", () => {
  beforeEach(() => {
    toastSpy.mockClear();
  });

  it("submits form, triggers toast and resets fields", async () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    const nameInput = screen.getByPlaceholderText("Tu nombre");
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    const subjectInput = screen.getByPlaceholderText("¿En qué podemos ayudarte?");
    const messageInput = screen.getByPlaceholderText("Cuéntanos más...");

    fireEvent.change(nameInput, { target: { value: "Caique" } });
    fireEvent.change(emailInput, { target: { value: "caique@example.com" } });
    fireEvent.change(subjectInput, { target: { value: "Consulta" } });
    fireEvent.change(messageInput, { target: { value: "Necesito información del evento" } });

    const submitButton = screen.getByRole("button", { name: /Enviar Mensaje/i });
    const form = submitButton.closest("form");

    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith({
        title: "Mensaje enviado 🚀",
        description: "Te responderemos pronto. ¡Gracias!",
      });
    });

    expect(nameInput).toHaveValue("Caique");
    expect(emailInput).toHaveValue("caique@example.com");
    expect(subjectInput).toHaveValue("Consulta");
    expect(messageInput).toHaveValue("Necesito información del evento");
  });
});
