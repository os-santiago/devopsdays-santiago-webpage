import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const toast = vi.fn();
const sendContactForm = vi.fn();

vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast }) }));
vi.mock("@/lib/contact-api", () => ({ sendContactForm: (payload: unknown) => sendContactForm(payload) }));

import NotifyDialog from "@/components/NotifyDialog";

describe("NotifyDialog", () => {
  beforeEach(() => {
    toast.mockReset();
    sendContactForm.mockReset();
  });

  it("sends a sign-up through the contact API and closes on success", async () => {
    sendContactForm.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    const user = userEvent.setup();
    render(<NotifyDialog />);

    await user.click(screen.getByRole("button", { name: /Avísame cuando abran las postulaciones/ }));
    await user.type(screen.getByLabelText("Nombre"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.click(screen.getByRole("button", { name: "Quiero que me avisen" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(sendContactForm).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      website: "",
      subject: "Avísame 2027 – Postulación entradas",
      message: expect.stringContaining("DevOpsDays Santiago 2027"),
    });
    expect(toast).toHaveBeenCalledWith({
      title: "¡Listo! 🪙",
      description: "Te avisaremos apenas abramos las postulaciones.",
    });
  });

  it("keeps the dialog open and reports server errors", async () => {
    sendContactForm.mockResolvedValue({ ok: false, json: async () => ({ error: "rate_limited" }) });
    const user = userEvent.setup();
    render(<NotifyDialog>Avísame</NotifyDialog>);

    await user.click(screen.getByRole("button", { name: "Avísame" }));
    await user.type(screen.getByLabelText("Nombre"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.click(screen.getByRole("button", { name: "Quiero que me avisen" }));

    await waitFor(() => expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: "Demasiados intentos" })));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
