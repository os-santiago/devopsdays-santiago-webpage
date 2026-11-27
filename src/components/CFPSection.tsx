import { Lock, Send } from "lucide-react";
import { Instagram, Linkedin } from "@/components/BrandIcons";
import { event2027, type Status } from "@/data/event";
import braces from "@/assets/2027/svg/block-braces.svg";

const copy: Record<Status, string> = {
  soon: "Muy pronto anunciaremos la apertura del CFP. Síguenos en redes para enterarte primero.",
  open: "¡El CFP está abierto! Postula tu charla, Ignite o taller y sé parte del programa.",
  closed: "El CFP 2027 ya cerró. ¡Gracias a todas las personas que postularon!",
};

const CFPSection = ({ status = event2027.cfp }: { status?: Status }) => (
  <section id="cfp" aria-labelledby="cfp-title" className="bg-background py-20">
    <div className="container mx-auto px-4">
      <div className="reveal toy mx-auto flex max-w-4xl flex-col items-center gap-8 bg-card p-8 md:flex-row">
        <img
          src={braces}
          alt=""
          width={120}
          height={120}
          className="bob shrink-0"
          style={{ "--tilt": "-6deg" } as React.CSSProperties}
        />
        <div className="text-center md:text-left">
          <p className="eyebrow mb-3">
            {status === "soon" && <Lock className="h-3.5 w-3.5" aria-hidden="true" />}
            Call for Papers
          </p>
          <h2 id="cfp-title" className="mb-3 text-4xl font-extrabold">
            Inserta tu charla
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">{copy[status]}</p>
          {status === "open" && (
            <a href={event2027.cfpUrl} target="_blank" rel="noopener noreferrer" className="btn-block">
              <Send className="h-5 w-5" aria-hidden="true" />
              Postula tu charla
            </a>
          )}
          {status === "soon" && (
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <a href={event2027.instagram} target="_blank" rel="noopener noreferrer" className="btn-block btn-cloud btn-sm">
                <Instagram size={16} /> Instagram
              </a>
              <a href={event2027.linkedin} target="_blank" rel="noopener noreferrer" className="btn-block btn-cloud btn-sm">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default CFPSection;
