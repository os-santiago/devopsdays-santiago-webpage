import { ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LockedLevel from "@/components/LockedLevel";
import PageHeader from "@/components/PageHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { agendaItems, event2027, speakers, type AgendaItem, type Speaker, type SpeakerCategory } from "@/data/event";

const sections: { category: SpeakerCategory; title: string; description: string }[] = [
  {
    category: "keynote",
    title: "Keynotes",
    description: "Referentes de nuestra comunidad con mensajes capaces de inspirar y movilizar a quienes construyen el futuro de DevOps.",
  },
  {
    category: "sponsor",
    title: "Panelistas Platinum",
    description: "Representantes de las marcas que hacen posible el evento, compartiendo su visión y experiencia en DevOps.",
  },
  {
    category: "accepted",
    title: "Nuestros Speakers",
    description: "Propuestas seleccionadas por el comité por su mirada innovadora y su aporte a la comunidad.",
  },
];

const SpeakerDialog = ({ speaker, sessions }: { speaker: Speaker; sessions: AgendaItem[] }) => (
  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
    <DialogHeader>
      <DialogTitle className="pr-8 text-2xl leading-tight">{speaker.name}</DialogTitle>
      <DialogDescription>{speaker.role}</DialogDescription>
    </DialogHeader>

    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border-2 border-land-navy/15 bg-muted/40 p-4 sm:flex-row sm:items-center">
        <img
          src={speaker.photo || "/placeholder.svg"}
          alt={`Foto de ${speaker.name}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/placeholder.svg";
          }}
          className="h-24 w-24 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-bold">{speaker.name}</p>
          <p className="text-sm text-muted-foreground">{speaker.role}</p>
          {speaker.company && <p className="mt-1 text-sm font-semibold text-land-red">{speaker.company}</p>}
          <div className="mt-3 flex flex-wrap gap-3">
            {speaker.socials.map((social) => (
              <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-land-red hover:underline">
                {social.label}<ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {sessions.map((session) => (
        <div key={session.id ?? `${session.time}-${session.room}`} className="space-y-3">
          <div>
            <p className="text-lg font-bold">{session.title}</p>
            <p className="text-sm text-muted-foreground">{event2027.dayLabel} · {session.time}</p>
          </div>
          <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">{session.description}</p>
          <div className="flex flex-wrap gap-2">
            {session.topics?.map((topic) => (
              <span key={topic} className="rounded-full border border-land-navy/20 bg-land-coin/30 px-3 py-1 text-xs font-semibold text-land-red">{topic}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </DialogContent>
);

const SpeakerCard = ({ speaker, sessions }: { speaker: Speaker; sessions: AgendaItem[] }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        type="button"
        className={`reveal toy group overflow-hidden bg-card text-left transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          speaker.category === "keynote" ? "w-full" : speaker.category === "sponsor" ? "w-full max-w-sm" : "w-full max-w-xs"
        }`}
      >
        {speaker.category === "keynote" ? (
          <img src={speaker.banner || "/placeholder.svg"} alt={`Gráfica promocional de ${speaker.name}`} className="block h-auto w-full" />
        ) : (
          <div className="p-5">
            <div className="flex items-center gap-4">
              <img
                src={speaker.photo || "/placeholder.svg"}
                alt={`Foto de ${speaker.name}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/placeholder.svg";
                }}
                className={speaker.category === "sponsor" ? "h-28 w-28 rounded-xl object-cover" : "h-24 w-24 rounded-full object-cover"}
              />
              {speaker.category === "sponsor" && (
                <img src={speaker.companyLogo || "/placeholder.svg"} alt={`Logo de ${speaker.company}`} className="max-h-16 min-w-0 flex-1 object-contain" />
              )}
            </div>
            <p className={`mt-5 text-xl font-bold text-foreground`}>{speaker.name}</p>
            {/* <p className={`mt-1 text-sm ${speaker.category === "sponsor" ? "text-slate-600" : "text-muted-foreground"}`}>{speaker.role}</p> */}
            {speaker.role && (
              <p className={`mt-3 text-sm font-semibold text-land-red`}>{speaker.role}</p>
            )}
          </div>
        )}
      </button>
    </DialogTrigger>
    <SpeakerDialog speaker={speaker} sessions={sessions} />
  </Dialog>
);

export const SpeakersContent = ({ speakerList, sessions }: { speakerList: Speaker[]; sessions: AgendaItem[] }) => (
  <div className="space-y-20">
    {sections.map((section) => {
      const categorySpeakers = speakerList.filter(
        (speaker) => speaker.category === section.category && (speaker.category !== "keynote" || Boolean(speaker.banner)),
      );

      return (
        <section key={section.category} aria-labelledby={`${section.category}-title`}>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 id={`${section.category}-title`} className="text-3xl font-extrabold md:text-4xl">{section.title}</h2>
            <p className="mt-3 text-muted-foreground">{section.description}</p>
          </div>
          {categorySpeakers.length ? (
            <div className={section.category === "keynote" ? "mx-auto grid max-w-7xl grid-cols-1 gap-6 min-[900px]:grid-cols-2" : "flex flex-wrap justify-center gap-6"}>
              {categorySpeakers.map((speaker) => {
                const speakerSessions = sessions.filter((item) => item.speakerIds?.includes(speaker.id));
                return speakerSessions.length ? <SpeakerCard key={speaker.id} speaker={speaker} sessions={speakerSessions} /> : null;
              })}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">Próximamente anunciaremos a quienes participarán en esta categoría.</p>
          )}
        </section>
      );
    })}
  </div>
);

const SpeakersPage = ({ speakerList = speakers, sessions = agendaItems }: { speakerList?: Speaker[]; sessions?: AgendaItem[] }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 pb-20 pt-28">
      <PageHeader eyebrow="Speakers" title={<>Los <span className="text-land-red">Jugadores</span></>}>
        Conoce a las personas que compartirán ideas, experiencias y nuevas perspectivas en DevOpsDays Santiago 2027.
      </PageHeader>
      {speakerList.length === 0 ? (
        <LockedLevel title="Los jugadores aún no se revelan">
          Primero abriremos el Call for Papers y luego anunciaremos a keynotes y speakers. ¡Atento a este nivel!
        </LockedLevel>
      ) : (
        <SpeakersContent speakerList={speakerList} sessions={sessions} />
      )}
    </main>
    <Footer />
  </div>
);

export default SpeakersPage;
