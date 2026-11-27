import { CalendarDays, CalendarPlus, Clock, MapPin, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TicketCta from "@/components/TicketCta";
import { event2027 } from "@/data/event";
import scene640 from "@/assets/2027/scene-640.webp";
import scene1024 from "@/assets/2027/scene-1024.webp";
import scene1600 from "@/assets/2027/scene-1600.webp";
import cloud from "@/assets/2027/svg/cloud.svg";
import coin from "@/assets/2027/svg/coin.svg";

const clouds = [
  { top: "8%", width: 140, duration: "70s", delay: "-10s" },
  { top: "22%", width: 90, duration: "95s", delay: "-50s" },
  { top: "4%", width: 110, duration: "120s", delay: "-85s" },
];

const HeroSection = () => (
  <section className="relative overflow-hidden bg-land-sky pt-16">
    {/* Title-screen artwork */}
    <div className="relative mx-auto max-w-[1600px] overflow-hidden">
      <img
        src={scene1600}
        srcSet={`${scene640} 640w, ${scene1024} 1024w, ${scene1600} 1600w`}
        sizes="100vw"
        width={1600}
        height={901}
        fetchPriority="high"
        alt="DevOpsDays Land: una mascota Shiba programa en su laptop sobre islas flotantes con la cordillera, el Costanera Center y el teleférico de Santiago de fondo"
        className="scroll-zoom block aspect-[16/9] w-full object-cover object-[50%_15%] lg:max-h-[64vh]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {clouds.map((c) => (
          <img
            key={c.top + c.delay}
            src={cloud}
            alt=""
            width={c.width}
            className="drift absolute left-0 opacity-90"
            style={{ top: c.top, "--duration": c.duration, "--delay": c.delay } as React.CSSProperties}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-land-sky"
      />
    </div>

    {/* Start panel */}
    <div className="container relative z-10 mx-auto -mt-10 px-4 pb-16 sm:-mt-20 lg:-mt-24">
      <div className="toy relative mx-auto grid max-w-6xl gap-8 bg-card p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <img
          src={coin}
          alt=""
          aria-hidden="true"
          width={44}
          height={44}
          className="bob absolute -left-5 -top-5 hidden sm:block"
          style={{ "--delay": "-1.5s" } as React.CSSProperties}
        />

        <div>
          <p className="eyebrow mb-4">Edición 2027 · DevOpsDays Land</p>
          <h1 className="mb-4 text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-5xl xl:text-6xl">
            DevOpsDays Santiago <span className="text-land-red">2027</span>
          </h1>
          <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
            Un día para aprender, compartir y conectar con la comunidad DevOps de Chile y Latinoamérica. Prepárate para
            entrar al mundo de DevOpsDays Land.
          </p>

          <ul className="flex flex-col gap-3 text-base font-semibold sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-land-red" aria-hidden="true" />
              {event2027.date}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-land-red" aria-hidden="true" />
              {event2027.hours}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-land-red" aria-hidden="true" />
              <a
                href={event2027.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {event2027.venue}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="toy mb-6 flex items-center gap-2 bg-land-coin px-4 py-2 font-display text-lg font-extrabold">
            🎟️ Entrada gratuita · {event2027.seats} cupos por postulación
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-col">
            <TicketCta />
            <a href="/devopsdays-santiago-2027.ics" download className="btn-block btn-cloud">
              <CalendarPlus className="h-5 w-5" aria-hidden="true" />
              Agregar a mi calendario
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="btn-block btn-cloud">
                  <Play className="h-5 w-5" aria-hidden="true" />
                  Ver teaser
                </button>
              </DialogTrigger>
              <DialogContent className="toy overflow-hidden p-0 sm:max-w-3xl">
                <DialogHeader className="sr-only">
                  <DialogTitle>Teaser DevOpsDays Santiago 2027</DialogTitle>
                  <DialogDescription>Video promocional de DevOpsDays Land.</DialogDescription>
                </DialogHeader>
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="none"
                  poster="/teaser-poster.jpg"
                  className="block w-full bg-black"
                >
                  <source src="/teaser-2027.mp4" type="video/mp4" />
                </video>
              </DialogContent>
            </Dialog>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="mt-6 text-sm font-bold text-land-navy underline underline-offset-4">
                ¿Cómo llegar?
              </button>
            </DialogTrigger>
            <DialogContent className="toy sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>¿Cómo llegar al evento?</DialogTitle>
                <DialogDescription>Entrar por {event2027.address}.</DialogDescription>
              </DialogHeader>
              <iframe
                title="Mapa del lugar del evento"
                src="https://www.google.com/maps?q=Av.%20Alameda%20Libertador%20Bernardo%20O%27Higgins%20390%2C%208331150%20Santiago%2C%20Regi%C3%B3n%20Metropolitana&output=embed"
                className="h-80 w-full rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
