import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactForm } from "@/lib/contact-api";

describe("contact-api", () => {
  const fetchMock = vi.fn();
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    globalThis.fetch = originalFetch;
  });

  it("posts the contact payload to contact endpoint", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));

    const payload = {
      name: "Jane",
      email: "jane@example.com",
      subject: "Duda",
      message: "Necesito ayuda",
      website: "",
    };

    await sendContactForm(payload);

    expect(fetchMock).toHaveBeenCalledWith("/api/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });
});
