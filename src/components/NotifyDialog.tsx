import { useState, type FormEvent, type ReactNode } from "react";
import { BellRing } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { sendContactForm } from "@/lib/contact-api";
import { submitContactForm } from "@/pages/contact-form";

const empty = { name: "", email: "", website: "" };

// ponytail: each sign-up lands as an email in the organizers' inbox, not a list.
// Swap sendContactForm for a Google Form / mailing-list endpoint if volume grows.
const NotifyDialog = ({ children, className = "btn-block" }: { children?: ReactNode; className?: string }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    return submitContactForm({
      form: {
        ...form,
        subject: "Avísame 2027 – Postulación entradas",
        message: "Quiero que me avisen cuando abran las postulaciones a entradas de DevOpsDays Santiago 2027.",
      },
      isSubmitting,
      setIsSubmitting,
      sendForm: sendContactForm,
      toast,
      resetForm: () => {
        setForm(empty);
        setOpen(false);
      },
      successToast: { title: "¡Listo! 🪙", description: "Te avisaremos apenas abramos las postulaciones." },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={className}>
          {children ?? (
            <>
              <BellRing className="h-5 w-5" aria-hidden="true" />
              Avísame cuando abran las postulaciones
            </>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="toy sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Avísame cuando abran 🔔</DialogTitle>
          <DialogDescription>
            Las entradas son gratuitas y por postulación. Déjanos tu correo y te avisamos apenas abramos el proceso.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm font-semibold">
            Nombre
            <input
              required
              minLength={3}
              maxLength={100}
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border-2 border-input bg-white px-4 py-3 focus:border-land-sky focus:outline-none"
            />
          </label>
          <label className="block text-sm font-semibold">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-xl border-2 border-input bg-white px-4 py-3 focus:border-land-sky focus:outline-none"
            />
          </label>
          {/* Honeypot: bots fill it, contact.php rejects it. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
          <button type="submit" disabled={isSubmitting} className="btn-block w-full">
            {isSubmitting ? "Enviando..." : "Quiero que me avisen"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyDialog;
