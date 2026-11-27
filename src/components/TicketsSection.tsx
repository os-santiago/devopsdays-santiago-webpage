import TicketCta from "@/components/TicketCta";
import { event2027, type Status } from "@/data/event";

const steps = [
  { n: 1, title: "Postula", desc: "Completa el formulario de postulación." },
  { n: 2, title: "El equipo revisa", desc: "El equipo organizador revisa cada postulación." },
  { n: 3, title: "Recibe tu entrada", desc: "Las personas aceptadas reciben su entrada gratis." },
];

const notes: Record<Status, string> = {
  soon: "Muy pronto abriremos el proceso de postulación y publicaremos las bases.",
  open: "¡Las postulaciones están abiertas! Revisa las bases antes de postular.",
  closed: "El proceso de postulación ya cerró. ¡Gracias a todas las personas que postularon!",
};

const TicketsSection = ({ status = event2027.tickets }: { status?: Status }) => (
  <section id="entradas" aria-labelledby="tickets-title" className="bg-land-sky py-20">
    <div className="container mx-auto px-4">
      <div className="reveal toy mx-auto max-w-5xl bg-[#FFF6E5] p-6 sm:p-10">
        <div className="mb-8 text-center">
          <p className="toy mb-4 inline-block -rotate-2 bg-land-coin px-5 py-1 font-display text-2xl font-extrabold">
            GRATIS · {event2027.seats} cupos
          </p>
          <h2 id="tickets-title" className="mb-3 text-4xl font-extrabold md:text-5xl">
            Desbloquea tu entrada gratis
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Este año las entradas son gratuitas. Para asistir debes postular y el equipo organizador aprobará a quienes
            recibirán su entrada.
          </p>
        </div>

        <ol className="relative mb-10 grid gap-6 md:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-8 hidden border-t-4 border-dotted border-land-navy/40 md:block"
          />
          {steps.map((step) => (
            <li key={step.n} className="relative text-center">
              <span className="toy relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-land-grass font-display text-3xl font-extrabold text-white [text-shadow:0_2px_0_hsl(var(--land-navy))]">
                {step.n}
              </span>
              <h3 className="mb-1 text-2xl font-extrabold">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-semibold">{notes[status]}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <TicketCta status={status} />
            {status === "open" && (
              <a href={event2027.ticketsRulesUrl} target="_blank" rel="noopener noreferrer" className="btn-block btn-cloud">
                Ver bases
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TicketsSection;
