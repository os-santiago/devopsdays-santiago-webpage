import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type ContactApiResponse = {
  ok?: boolean;
  message?: string;
  error?: "invalid_input" | "rate_limited" | "send_failed";
};

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

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "", message: "", website: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload: ContactForm = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let payload: ContactApiResponse | null = null;
      try {
        payload = (await response.json()) as ContactApiResponse;
      } catch {
        payload = null;
      }

      if (response.ok && payload?.ok) {
        toast({ title: "Mensaje enviado 🚀", description: "Te responderemos pronto. ¡Gracias!" });
        resetForm();
        return;
      }

      if (payload?.error === "rate_limited") {
        toast({
          title: "Demasiados intentos",
          description: "Espera unos minutos antes de volver a enviar tu mensaje.",
        });
      } else if (payload?.error === "invalid_input") {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/30">
              Contacto
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mt-4 mb-4">
              Comunícate con el <span className="text-gradient-space">Centro de Mando</span>
            </h1>
            <p className="text-muted-foreground text-lg">¿Preguntas? ¿Ideas? ¡Estamos para ayudarte!</p>
          </motion.div>

          <p className="max-w-2xl mx-auto mb-6 text-center text-sm text-muted-foreground">
            Si tienes algún problema con el formulario, puedes escribirnos a{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href="mailto:contacto@devopsdayschile.cl"
            >
              contacto@devopsdayschile.cl
            </a>
            .
          </p>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User className="inline w-4 h-4 mr-1" /> Nombre
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="inline w-4 h-4 mr-1" /> Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MessageSquare className="inline w-4 h-4 mr-1" /> Asunto
              </label>
              <input
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mensaje</label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Cuéntanos más..."
              />
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
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold glow-red transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
