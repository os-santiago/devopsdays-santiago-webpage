import { CalendarDays, MapPin, Sun, Ticket } from "lucide-react";
import { event2027 } from "@/data/event";

const stats = [
  { icon: Sun, label: "Duración", value: "1 día" },
  { icon: CalendarDays, label: "Fecha", value: event2027.dateShort },
  { icon: MapPin, label: "Lugar", value: event2027.venue },
  { icon: Ticket, label: "Entradas", value: `${event2027.seats} cupos gratuitos` },
];

const EventInfoSection = () => (
  <section aria-labelledby="mundo-title" className="bg-background py-20">
    <div className="container mx-auto px-4">
      <h2 id="mundo-title" className="reveal mb-12 text-center text-4xl font-extrabold md:text-5xl">
        Mundo Santiago
      </h2>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="reveal toy overflow-hidden bg-card text-center"
          >
            <div aria-hidden="true" className="h-4 border-b-[3px] border-land-navy bg-land-grass" />
            <div className="p-5">
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-land-red" aria-hidden="true" />
              <p className="font-display text-xl font-extrabold leading-tight md:text-2xl">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{stat.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default EventInfoSection;
