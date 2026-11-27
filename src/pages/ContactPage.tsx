import PageHeader from "@/components/PageHeader";
import { type FormEvent, useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { sendContactForm } from "@/lib/contact-api";
import {
  contactSubjectOptions,
  MAX_MESSAGE_LENGTH,
  submitContactForm,
  validateContactForm,
  type ContactField,
  type ContactForm,
  type ValidationErrors,
} from "@/pages/contact-form";

const contactFields: ContactField[] = ["name", "email", "subject", "message"];

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const computeVisibleErrors = (
    nextForm: ContactForm,
    nextTouched: Partial<Record<ContactField, boolean>>,
    nextSubmitted: boolean,
  ): ValidationErrors => {
    const allErrors = validateContactForm(nextForm);
    const visibleErrors: ValidationErrors = {};

    contactFields.forEach((field) => {
      if (allErrors[field] && (nextSubmitted || nextTouched[field])) {
        visibleErrors[field] = allErrors[field];
      }
    });

    return visibleErrors;
  };

  const isFieldErrorVisible = (field: ContactField) => Boolean(errors[field] && (isSubmitted || touched[field]));

  const getFieldDescribedBy = (field: ContactField) => (isFieldErrorVisible(field) ? `${field}-error` : undefined);

  const updateField = (field: ContactField, rawValue: string) => {
    const value = field === "message" ? rawValue.slice(0, MAX_MESSAGE_LENGTH) : rawValue;

    setForm((prev) => {
      const nextForm = { ...prev, [field]: value };
      if (isSubmitted || touched[field]) {
        setErrors(computeVisibleErrors(nextForm, touched, isSubmitted));
      }
      return nextForm;
    });
  };

  const handleFieldBlur = (field: ContactField) => {
    setTouched((prev) => {
      const nextTouched = { ...prev, [field]: true };
      setErrors(computeVisibleErrors(form, nextTouched, isSubmitted));
      return nextTouched;
    });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "", message: "", website: "" });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await submitContactForm({
      form,
      isSubmitting,
      setIsSubmitting,
      sendForm: sendContactForm,
      toast,
      resetForm,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <PageHeader eyebrow="Contacto" title={<>Habla con el <span className="text-land-red">Equipo</span></>}>
            ¿Preguntas? ¿Ideas? ¡Estamos para ayudarte!
          </PageHeader>

          <p className="max-w-2xl mx-auto mb-6 text-center text-sm text-muted-foreground">
            Si tienes algún problema con el formulario, puedes escribirnos a{" "}
            <a
              className="font-semibold text-land-red hover:underline"
              href="mailto:santiago@devopsdays.org"
            >
              santiago@devopsdays.org
            </a>
            .
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="toy max-w-2xl mx-auto space-y-6 bg-card p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  <User className="inline w-4 h-4 mr-1" /> Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onBlur={() => handleFieldBlur("name")}
                  aria-invalid={isFieldErrorVisible("name")}
                  aria-describedby={getFieldDescribedBy("name")}
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-land-sky"
                  placeholder="Tu nombre"
                />
                {isFieldErrorVisible("name") && (
                  <p id="name-error" className="mt-2 text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="inline w-4 h-4 mr-1" /> Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => handleFieldBlur("email")}
                  aria-invalid={isFieldErrorVisible("email")}
                  aria-describedby={getFieldDescribedBy("email")}
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-land-sky"
                  placeholder="tu@email.com"
                />
                {isFieldErrorVisible("email") && (
                  <p id="email-error" className="mt-2 text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                <MessageSquare className="inline w-4 h-4 mr-1" /> Asunto
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                onBlur={() => handleFieldBlur("subject")}
                aria-invalid={isFieldErrorVisible("subject")}
                aria-describedby={getFieldDescribedBy("subject")}
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-input text-foreground focus:outline-none focus:ring-2 focus:ring-land-sky"
              >
                <option value="" disabled>
                  Selecciona un asunto
                </option>
                {contactSubjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {isFieldErrorVisible("subject") && (
                <p id="subject-error" className="mt-2 text-sm text-destructive">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                onBlur={() => handleFieldBlur("message")}
                aria-invalid={isFieldErrorVisible("message")}
                aria-describedby={getFieldDescribedBy("message")}
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-land-sky resize-none"
                placeholder="Cuéntanos más..."
              />
              <div className="mt-2 flex items-center justify-between">
                {isFieldErrorVisible("message") ? (
                  <p id="message-error" className="text-sm text-destructive">
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <p
                  className={`text-xs ${form.message.length >= 360 ? "text-land-red" : "text-muted-foreground"}`}
                  aria-live="polite"
                >
                  {form.message.length}/{MAX_MESSAGE_LENGTH}
                </p>
              </div>
            </div>

            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                name="website"
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-block w-full"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
