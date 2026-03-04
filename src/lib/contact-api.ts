export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

export const sendContactForm = (payload: ContactFormPayload) => {
  return fetch("/api/contact.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
