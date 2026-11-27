import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { event2027 } from "@/data/event";

const SOON = "Pronto lo confirmaremos.";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "¿La entrada es realmente gratis?",
    a: `Sí. Este año las entradas son gratuitas, pero hay ${event2027.seats} cupos y se asignan por postulación.`,
  },
  { q: "¿Quién puede postular?", a: SOON },
  {
    q: "¿Cómo se eligen las personas aceptadas?",
    a: "El equipo organizador revisará cada postulación según las bases, que publicaremos muy pronto.",
  },
  { q: "¿Hay lista de espera?", a: SOON },
  { q: "¿En qué idioma son las charlas?", a: SOON },
  { q: "¿Habrá comida y café?", a: SOON },
  {
    q: "¿Se graban las charlas?",
    a: (
      <>
        Puedes ver las charlas de ediciones anteriores en nuestro{" "}
        <a href={event2027.youtubeChannel} target="_blank" rel="noopener noreferrer" className="font-bold underline">
          canal de YouTube
        </a>
        .
      </>
    ),
  },
  {
    q: "¿Cómo puedo dar una charla?",
    a: (
      <>
        A través del{" "}
        <a href="#cfp" className="font-bold underline">
          Call for Papers
        </a>
        . Muy pronto anunciaremos su apertura.
      </>
    ),
  },
  {
    q: "¿Cómo puedo patrocinar?",
    a: (
      <>
        Revisa los{" "}
        <Link to="/patrocinio" className="font-bold underline">
          niveles de patrocinio
        </Link>{" "}
        y escríbenos.
      </>
    ),
  },
];

const FaqSection = () => (
  <section aria-labelledby="faq-title" className="bg-background py-20">
    <div className="container mx-auto max-w-3xl px-4">
      <h2 id="faq-title" className="reveal mb-10 text-center text-4xl font-extrabold md:text-5xl">
        Preguntas frecuentes
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="reveal toy group bg-card px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold">
              {faq.q}
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-land-navy bg-land-coin transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pt-3 text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
