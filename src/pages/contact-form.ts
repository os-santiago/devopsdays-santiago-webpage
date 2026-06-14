export type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

export type ContactField = "name" | "email" | "subject" | "message";
export type ValidationErrors = Partial<Record<ContactField, string>>;

export const contactSubjectOptions = [
  "Consulta General",
  "Entradas",
  "Patrocinio",
  "Call for Papers",
  "Prensa",
  "Voluntariado",
] as const;

export const MAX_MESSAGE_LENGTH = 400;

const MIN_MESSAGE_LENGTH = 10;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactApiResponse = {
  ok?: boolean;
  message?: string;
  error?: "invalid_input" | "rate_limited" | "send_failed";
};

type ContactToast = {
  title: string;
  description: string;
};

type SubmitContactDeps = {
  form: ContactForm;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  sendForm: (payload: ContactForm) => Promise<Response>;
  toast: (payload: ContactToast) => void;
  resetForm: () => void;
};

export const submitContactForm = async ({
  form,
  isSubmitting,
  setIsSubmitting,
  sendForm,
  toast,
  resetForm,
}: SubmitContactDeps) => {
  if (isSubmitting) {
    return;
  }

  setIsSubmitting(true);

  const payload: ContactForm = {
    name: form.name.trim(),
    email: form.email.trim(),
    subject: form.subject.trim(),
    message: form.message.trim(),
    website: form.website.trim(),
  };

  try {
    const response = await sendForm(payload);

    let parsedResponse: ContactApiResponse | null = null;
    try {
      parsedResponse = (await response.json()) as ContactApiResponse;
    } catch {
      parsedResponse = null;
    }

    if (response.ok && parsedResponse?.ok) {
      toast({ title: "Mensaje enviado 🚀", description: "Te responderemos pronto. ¡Gracias!" });
      resetForm();
      return;
    }

    if (parsedResponse?.error === "rate_limited") {
      toast({
        title: "Demasiados intentos",
        description: "Espera unos minutos antes de volver a enviar tu mensaje.",
      });
    } else if (parsedResponse?.error === "invalid_input") {
      toast({
        title: "Revisa el formulario",
        description: "Verifica los datos ingresados e inténtalo nuevamente.",
      });
    } else {
      toast({
        title: "No se pudo enviar",
        description: "Hubo un problema al enviar el mensaje. Inténtalo nuevamente.",
      });
    }
  } catch {
    toast({
      title: "Error de conexión",
      description: "No fue posible conectar con el servidor. Inténtalo nuevamente.",
    });
  } finally {
    setIsSubmitting(false);
  }
};

export const validateContactForm = (form: ContactForm): ValidationErrors => {
  const errors: ValidationErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const message = form.message.trim();

  if (name.length === 0) {
    errors.name = "Nombre es obligatorio";
  } else if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    errors.name = "Nombre debe tener entre 3 y 100 caracteres";
  }

  if (email.length === 0) {
    errors.email = "Email es obligatorio";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Email no es válido";
  }

  if (subject.length === 0) {
    errors.subject = "Debes seleccionar un asunto";
  }

  if (message.length === 0) {
    errors.message = "Mensaje es obligatorio";
  } else if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Mensaje debe tener entre 10 y 400 caracteres";
  }

  return errors;
};
