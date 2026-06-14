import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";

const toastSpy = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: toastSpy }),
}));

vi.mock("@/lib/contact-api", () => ({
  sendContactForm: vi.fn(),
}));

import ContactPage from "@/pages/ContactPage";
import { submitContactForm } from "@/pages/contact-form";
import { sendContactForm } from "@/lib/contact-api";

const sendContactFormMock = vi.mocked(sendContactForm);

const baseForm = {
  name: "  Jane  ",
  email: "  jane@example.com  ",
  subject: "  Entradas  ",
  message: "  Necesito ayuda con entradas  ",
  website: "   ",
};

describe("ContactPage", () => {
  beforeEach(() => {
    toastSpy.mockReset();
    sendContactFormMock.mockReset();
  });

  it("renders content, contact fallback mail and honeypot", () => {
    const { container } = renderWithRouter(<ContactPage />, { route: "/contacto" });

    expect(screen.getByRole("heading", { name: /Comunícate con el/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "santiago@devopsdays.org" })).toHaveAttribute(
      "href",
      "mailto:santiago@devopsdays.org",
    );
    expect(container.querySelector('input[name="website"]')).toBeInTheDocument();
  });

  it("submits through UI with trimmed payload", async () => {
    sendContactFormMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    renderWithRouter(<ContactPage />, { route: "/contacto" });

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "  Jane  " } });
    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "  jane@example.com  " },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /Asunto/i }), {
      target: { value: "Entradas" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cuéntanos más..."), {
      target: { value: "  Necesito ayuda con entradas  " },
    });

    const submitButton = screen.getByRole("button", { name: /Enviar Mensaje/i });
    const form = submitButton.closest("form") as HTMLFormElement | null;
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => expect(sendContactFormMock).toHaveBeenCalledTimes(1));
    expect(sendContactFormMock).toHaveBeenCalledWith({
      name: "Jane",
      email: "jane@example.com",
      subject: "Entradas",
      message: "Necesito ayuda con entradas",
      website: "",
    });
  });

  it("does not send request and shows errors when required fields are missing", async () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    const submitButton = screen.getByRole("button", { name: /Enviar Mensaje/i });
    const form = submitButton.closest("form") as HTMLFormElement | null;
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    expect(sendContactFormMock).not.toHaveBeenCalled();
    expect(screen.getByText("Nombre es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Email es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Debes seleccionar un asunto")).toBeInTheDocument();
    expect(screen.getByText("Mensaje es obligatorio")).toBeInTheDocument();
  });

  it("blocks submit when name is out of range", async () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "Jo" } });
    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /Asunto/i }), {
      target: { value: "Entradas" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cuéntanos más..."), {
      target: { value: "Mensaje válido para pasar regla mínima" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    expect(sendContactFormMock).not.toHaveBeenCalled();
    expect(screen.getByText("Nombre debe tener entre 3 y 100 caracteres")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "A".repeat(101) } });
    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));
    expect(sendContactFormMock).not.toHaveBeenCalled();
    expect(screen.getByText("Nombre debe tener entre 3 y 100 caracteres")).toBeInTheDocument();
  });

  it("blocks submit when email is invalid", async () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /Asunto/i }), {
      target: { value: "Entradas" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cuéntanos más..."), {
      target: { value: "Mensaje válido para pasar regla mínima" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    expect(sendContactFormMock).not.toHaveBeenCalled();
    expect(screen.getByText("Email no es válido")).toBeInTheDocument();
  });

  it("blocks submit when subject is not selected", async () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cuéntanos más..."), {
      target: { value: "Mensaje válido para pasar regla mínima" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    expect(sendContactFormMock).not.toHaveBeenCalled();
    expect(screen.getByText("Debes seleccionar un asunto")).toBeInTheDocument();
  });

  it("blocks submit when message is too short", async () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /Asunto/i }), {
      target: { value: "Consulta General" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cuéntanos más..."), {
      target: { value: "Corto" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    expect(sendContactFormMock).not.toHaveBeenCalled();
    expect(screen.getByText("Mensaje debe tener entre 10 y 400 caracteres")).toBeInTheDocument();
  });

  it("enforces message max length and shows live counter", () => {
    renderWithRouter(<ContactPage />, { route: "/contacto" });

    const messageField = screen.getByPlaceholderText("Cuéntanos más...") as HTMLTextAreaElement;
    fireEvent.change(messageField, { target: { value: "A".repeat(450) } });

    expect(screen.getByDisplayValue("A".repeat(400))).toBeInTheDocument();
    expect(screen.getByText("400/400")).toBeInTheDocument();
  });

  it("returns early when already submitting", async () => {
    const setIsSubmitting = vi.fn();
    let called = false;
    const sendForm = async () => {
      called = true;
      return { ok: true, json: async () => ({ ok: true }) } as Response;
    };
    const resetForm = vi.fn();

    await submitContactForm({
      form: baseForm,
      isSubmitting: true,
      setIsSubmitting,
      sendForm,
      toast: toastSpy,
      resetForm,
    });

    expect(setIsSubmitting).not.toHaveBeenCalled();
    expect(called).toBe(false);
    expect(toastSpy).not.toHaveBeenCalled();
    expect(resetForm).not.toHaveBeenCalled();
  });

  it("sends trimmed payload and resets form on success", async () => {
    const setIsSubmitting = vi.fn();
    let receivedPayload: unknown = null;
    const sendForm = async (payload: unknown) => {
      receivedPayload = payload;
      return { ok: true, json: async () => ({ ok: true }) } as Response;
    };
    const resetForm = vi.fn();

    await submitContactForm({
      form: baseForm,
      isSubmitting: false,
      setIsSubmitting,
      sendForm,
      toast: toastSpy,
      resetForm,
    });

    expect(setIsSubmitting).toHaveBeenNthCalledWith(1, true);
    expect(receivedPayload).toEqual({
      name: "Jane",
      email: "jane@example.com",
      subject: "Entradas",
      message: "Necesito ayuda con entradas",
      website: "",
    });
    expect(toastSpy).toHaveBeenCalledWith({
      title: "Mensaje enviado 🚀",
      description: "Te responderemos pronto. ¡Gracias!",
    });
    expect(resetForm).toHaveBeenCalledTimes(1);
    expect(setIsSubmitting).toHaveBeenLastCalledWith(false);
  });

  it("shows rate-limited toast", async () => {
    const setIsSubmitting = vi.fn();
    const sendForm = async () =>
      ({ ok: false, json: async () => ({ ok: false, error: "rate_limited" }) }) as Response;

    await submitContactForm({
      form: baseForm,
      isSubmitting: false,
      setIsSubmitting,
      sendForm,
      toast: toastSpy,
      resetForm: vi.fn(),
    });

    expect(toastSpy).toHaveBeenCalledWith({
      title: "Demasiados intentos",
      description: "Espera unos minutos antes de volver a enviar tu mensaje.",
    });
    expect(setIsSubmitting).toHaveBeenLastCalledWith(false);
  });

  it("shows invalid-input toast", async () => {
    const setIsSubmitting = vi.fn();
    const sendForm = async () =>
      ({ ok: false, json: async () => ({ ok: false, error: "invalid_input" }) }) as Response;

    await submitContactForm({
      form: baseForm,
      isSubmitting: false,
      setIsSubmitting,
      sendForm,
      toast: toastSpy,
      resetForm: vi.fn(),
    });

    expect(toastSpy).toHaveBeenCalledWith({
      title: "Revisa el formulario",
      description: "Verifica los datos ingresados e inténtalo nuevamente.",
    });
    expect(setIsSubmitting).toHaveBeenLastCalledWith(false);
  });

  it("shows generic error toast when backend response is unknown", async () => {
    const setIsSubmitting = vi.fn();
    const sendForm = async () => ({ ok: false, json: async () => ({ ok: false }) }) as Response;

    await submitContactForm({
      form: baseForm,
      isSubmitting: false,
      setIsSubmitting,
      sendForm,
      toast: toastSpy,
      resetForm: vi.fn(),
    });

    expect(toastSpy).toHaveBeenCalledWith({
      title: "No se pudo enviar",
      description: "Hubo un problema al enviar el mensaje. Inténtalo nuevamente.",
    });
    expect(setIsSubmitting).toHaveBeenLastCalledWith(false);
  });

  it("shows network error toast when request throws", async () => {
    const setIsSubmitting = vi.fn();
    const sendForm = async () => {
      throw new Error("network down");
    };

    await submitContactForm({
      form: baseForm,
      isSubmitting: false,
      setIsSubmitting,
      sendForm,
      toast: toastSpy,
      resetForm: vi.fn(),
    });

    expect(toastSpy).toHaveBeenCalledWith({
      title: "Error de conexión",
      description: "No fue posible conectar con el servidor. Inténtalo nuevamente.",
    });
    expect(setIsSubmitting).toHaveBeenLastCalledWith(false);
  });
});
