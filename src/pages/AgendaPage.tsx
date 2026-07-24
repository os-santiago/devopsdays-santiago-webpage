import { motion } from "framer-motion";
import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Coffee, ExternalLink, MapPin, Mic2, Rocket, Users } from "lucide-react";
import { agendaItems, speakers, type AgendaItem, type DayId, type SessionRoomId, type Speaker } from "@/data/event";

const days = [
  { id: "day-1", label: "Día 1", title: "8 de Septiembre", icon: "🛸" },
  { id: "day-2", label: "Día 2", title: "9 de Septiembre", icon: "🚀" },
] as const;

const rooms = [
  {
    id: "main",
    name: "Auditorio Principal",
    capacity: "700+ personas",
    description: "Sala principal donde tendremos las actividades principales para un público de 700+ personas.",
    laneClassName: "md:col-span-2",
    gridColumn: "2 / span 2",
  },
  {
    id: "room-a",
    name: "Sala A",
    capacity: "100 personas",
    description: "Sala para charlas o talleres para un público de 100 personas.",
    laneClassName: "md:col-span-1",
    gridColumn: "4 / span 1",
  },
  {
    id: "room-b",
    name: "Sala B",
    capacity: "100 personas",
    description: "Sala para charlas o talleres para un público de 100 personas.",
    laneClassName: "md:col-span-1",
    gridColumn: "5 / span 1",
  },
] as const;


const typeStyles: Record<string, string> = {
  keynote: "border-primary bg-primary/10",
  talk: "border-accent bg-accent/10",
  ignite: "border-space-star bg-space-star/10",
  panel: "border-space-star bg-space-star/10",
  workshop: "border-accent bg-accent/5",
  break: "border-border bg-muted/30",
};

const typeIcons: Record<string, React.ElementType> = {
  keynote: Rocket,
  talk: Mic2,
  ignite: Mic2,
  workshop: Users,
  break: Coffee,
  panel: Users,
};

const typeLabels: Record<string, string> = {
  keynote: "Keynote",
  talk: "Charla",
  ignite: "Actividad",
  workshop: "Taller",
  break: "Networking",
  panel: "Panel",
};

const getRoom = (roomId: SessionRoomId) => rooms.find((room) => room.id === roomId);

const getDay = (dayId: DayId) => days.find((day) => day.id === dayId);

const getDayTimes = (dayId: DayId) =>
  Array.from(new Set(agendaItems.filter((item) => item.day === dayId).map((item) => item.time)));

const getItemsForTime = (dayId: DayId, time: string) =>
  agendaItems.filter((item) => item.day === dayId && item.time === time);

const getDurationSlots = (item: AgendaItem) => item.durationSlots ?? 1;

const getSessionId = (item: AgendaItem) => item.id ?? `${item.day}-${item.time.replace(":", "")}-${item.room}`;

const isCoveredByEarlierItem = (dayId: DayId, timeIndex: number, times: string[], roomId?: SessionRoomId) =>
  agendaItems.some((item) => {
    if (item.day !== dayId || (roomId ? item.room !== roomId : item.room !== "all")) {
      return false;
    }

    const itemStartIndex = times.indexOf(item.time);
    return itemStartIndex >= 0 && itemStartIndex < timeIndex && itemStartIndex + getDurationSlots(item) > timeIndex;
  });

const getSpeakers = (item: AgendaItem, speakerList: Speaker[]) =>
  item.speakerIds?.map((id) => speakerList.find((speaker) => speaker.id === id)).filter((speaker): speaker is Speaker => Boolean(speaker)) ?? [];

export const SessionDetailsDialog = ({ item, speakerList }: { item: AgendaItem; speakerList: Speaker[] }) => {
  const day = getDay(item.day);
  const room = item.room !== "all" ? getRoom(item.room) : undefined;
  const description = item.description ?? "Pronto publicaremos más detalles de esta actividad.";
  const sessionSpeakers = getSpeakers(item, speakerList);
  const topics = item.topics?.length ? item.topics : [typeLabels[item.type] ?? item.type];

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <p className="pr-8 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {typeLabels[item.type] ?? item.type}
        </p>
        <DialogTitle className="pr-8 text-2xl leading-tight">{item.title}</DialogTitle>
        <DialogDescription>
          {day?.title} · {item.time} · {room?.name ?? "Plaza Principal"}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">{description}</p>

        {item.type !== "break" && <div className="space-y-4 rounded-xl border border-border bg-card/60 p-4">
          {sessionSpeakers.length ? sessionSpeakers.map((speaker) => (
            <div key={speaker.id} className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src={speaker.photo}
                alt={`Foto de ${speaker.name}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/placeholder.svg";
                }}
                className="h-24 w-24 shrink-0 rounded-full border border-border bg-muted object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">Speaker</p>
                <p className="text-lg font-bold text-foreground">{speaker.name}</p>
                <p className="text-sm text-muted-foreground">{speaker.role}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {speaker.socials.map((social) => (
                    <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80">
                      {social.label}<ExternalLink className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )) : (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">Speaker</p>
              <p className="text-lg font-bold text-foreground">{item.host || "Por confirmar"}</p>
            </div>
          )}
        </div>}

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Temáticas</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const AgendaCard = ({ item, index, onSelect, showRoom = false }: { item: AgendaItem; index: number; onSelect: (item: AgendaItem) => void; showRoom?: boolean }) => {
  const Icon = typeIcons[item.type] || Clock;
  const room = item.room !== "all" ? getRoom(item.room) : undefined;
  const sessionSpeakers = getSpeakers(item, speakers);
  const byline = sessionSpeakers.map((speaker) => speaker.name).join(", ") || item.host;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item)}
      className={`h-full w-full rounded-xl border p-4 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${typeStyles[item.type] ?? "border-border bg-card/60"}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          {showRoom && room && (
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent">
              {room.name} · {room.capacity}
            </p>
          )}
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {typeLabels[item.type] ?? item.type}
          </p>
          <p className="font-semibold text-foreground">{item.title}</p>
          {byline && <p className="mt-1 text-sm text-muted-foreground">{byline}</p>}
        </div>
      </div>
    </motion.button>
  );
};

export const AgendaDay = ({ dayId, onSelect = () => {} }: { dayId: DayId; onSelect?: (item: AgendaItem) => void }) => {
  const times = getDayTimes(dayId);

  if (times.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        Estamos trabajando para elaborar la mejor experiencia espacial.
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:block">
        <div
          className="grid grid-cols-[5rem_repeat(4,minmax(0,1fr))] gap-3"
          style={{ gridTemplateRows: `auto repeat(${times.length}, minmax(5.75rem, auto))` }}
        >
          <div aria-hidden="true" style={{ gridColumn: 1, gridRow: 1 }} />
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`rounded-xl border border-border bg-card/60 p-4 ${room.laneClassName} ${
                room.id === "main" ? "border-primary/50 bg-primary/5" : ""
              }`}
              style={{ gridColumn: room.gridColumn, gridRow: 1 }}
            >
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <h3 className="font-bold text-foreground">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.capacity}</p>
                </div>
              </div>
            </div>
          ))}

          {times.map((time, timeIndex) => {
            const items = getItemsForTime(dayId, time);
            const sharedItem = items.find((item) => item.room === "all");
            const gridRow = timeIndex + 2;

            return (
              <Fragment key={`${dayId}-${time}`}>
                <div
                  key={`${dayId}-${time}-label`}
                  className="py-4 text-sm font-mono font-bold text-muted-foreground"
                  style={{ gridColumn: 1, gridRow }}
                >
                  {time}
                </div>

                {sharedItem && !isCoveredByEarlierItem(dayId, timeIndex, times) && (
                  <div
                    key={`${dayId}-${time}-shared`}
                    style={{ gridColumn: "2 / span 4", gridRow: `${gridRow} / span ${getDurationSlots(sharedItem)}` }}
                  >
                    <AgendaCard item={sharedItem} index={timeIndex} onSelect={onSelect} />
                  </div>
                )}

                {!sharedItem &&
                  !isCoveredByEarlierItem(dayId, timeIndex, times) &&
                  rooms.map((room) => {
                    if (isCoveredByEarlierItem(dayId, timeIndex, times, room.id)) {
                      return null;
                    }

                    const roomItem = items.find((item) => item.room === room.id);

                    return (
                      <div
                        key={`${time}-${room.id}`}
                        style={{
                          gridColumn: room.gridColumn,
                          gridRow: roomItem ? `${gridRow} / span ${getDurationSlots(roomItem)}` : gridRow,
                        }}
                      >
                        {roomItem ? (
                          <AgendaCard item={roomItem} index={timeIndex} onSelect={onSelect} />
                        ) : (
                          <div className="h-full rounded-xl border border-dashed border-border/70 bg-muted/10 p-4 text-sm text-muted-foreground">
                            Sala cerrada
                          </div>
                        )}
                      </div>
                    );
                  })}
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {times.map((time, timeIndex) => {
          const items = getItemsForTime(dayId, time);

          return (
            <div key={`${dayId}-${time}-mobile`} className="rounded-xl border border-border bg-card/40 p-4">
              <p className="mb-3 text-sm font-mono font-bold text-muted-foreground">{time}</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <AgendaCard key={`${item.time}-${item.room}-${item.title}`} item={item} index={timeIndex} onSelect={onSelect} showRoom />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RoomsOverview = () => (
  <section className="mx-auto mt-14 max-w-6xl">
    <h2 className="mb-6 text-3xl font-black text-foreground">Salas</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`rounded-xl border p-5 ${room.laneClassName} ${
            room.id === "main" ? "border-primary/50 bg-primary/5" : "border-border bg-card/60"
          }`}
        >
          <div className="mb-3 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <div>
              <h3 className="text-xl font-bold text-foreground">{room.name}</h3>
              <p className="text-sm font-semibold text-accent">{room.capacity}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{room.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const AgendaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItem = agendaItems.find((item) => getSessionId(item) === searchParams.get("session"));
  const selectItem = (item: AgendaItem) => setSearchParams((current) => {
    const next = new URLSearchParams(current);
    next.set("session", getSessionId(item));
    return next;
  });
  const closeDialog = () => setSearchParams((current) => {
    const next = new URLSearchParams(current);
    next.delete("session");
    return next;
  });

  return <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold uppercase tracking-widest border border-accent/30">
            Programa
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mt-4 mb-4">
            Agenda de la <span className="text-gradient-space">Misión</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            8 y 9 de Septiembre, 2026 — Horario  — Centro de Extensión UC, Santiago, Chile
          </p>
        </motion.div>

        <Tabs defaultValue={selectedItem?.day ?? "day-1"} className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center">
            <TabsList className="h-auto flex-wrap">
              {days.map((day) => (
                <TabsTrigger key={day.id} value={day.id} className="px-5 py-2 text-2xl font-semibold">
                  {day.icon} {day.label} — {day.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {days.map((day) => (
            <TabsContent key={day.id} value={day.id} className="mt-0">
              <AgendaDay dayId={day.id} onSelect={selectItem} />
            </TabsContent>
          ))}
        </Tabs>

        <RoomsOverview />
      </div>
    </div>
    <Dialog open={Boolean(selectedItem)} onOpenChange={(open) => !open && closeDialog()}>
      {selectedItem && <SessionDetailsDialog item={selectedItem} speakerList={speakers} />}
    </Dialog>
    <Footer />
  </div>
};

export default AgendaPage;
