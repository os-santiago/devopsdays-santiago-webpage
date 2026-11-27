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
import LockedLevel from "@/components/LockedLevel";
import PageHeader from "@/components/PageHeader";
import { Clock, Coffee, ExternalLink, MapPin, Mic2, Rocket, Users } from "lucide-react";
import { agendaItems, event2027, speakers, type AgendaItem, type SessionRoomId, type Speaker } from "@/data/event";

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
  keynote: "border-land-red bg-land-red/10",
  talk: "border-land-sky bg-land-sky/10",
  ignite: "border-land-coin bg-land-coin/20",
  panel: "border-land-coin bg-land-coin/20",
  workshop: "border-land-grass bg-land-grass/10",
  break: "border-border bg-muted/50",
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

const getTimes = (items: AgendaItem[]) => Array.from(new Set(items.map((item) => item.time)));

const getItemsForTime = (items: AgendaItem[], time: string) => items.filter((item) => item.time === time);

const getDurationSlots = (item: AgendaItem) => item.durationSlots ?? 1;

const getSessionId = (item: AgendaItem) => item.id ?? `${item.time.replace(":", "")}-${item.room}`;

const isCoveredByEarlierItem = (items: AgendaItem[], timeIndex: number, times: string[], roomId?: SessionRoomId) =>
  items.some((item) => {
    if (roomId ? item.room !== roomId : item.room !== "all") {
      return false;
    }

    const itemStartIndex = times.indexOf(item.time);
    return itemStartIndex >= 0 && itemStartIndex < timeIndex && itemStartIndex + getDurationSlots(item) > timeIndex;
  });

const getSpeakers = (item: AgendaItem, speakerList: Speaker[]) =>
  item.speakerIds?.map((id) => speakerList.find((speaker) => speaker.id === id)).filter((speaker): speaker is Speaker => Boolean(speaker)) ?? [];

export const SessionDetailsDialog = ({ item, speakerList }: { item: AgendaItem; speakerList: Speaker[] }) => {
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
          {event2027.dayLabel} · {item.time} · {room?.name ?? "Plaza Principal"}
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
                <p className="text-sm font-semibold uppercase tracking-wide text-land-red">Speaker</p>
                <p className="text-lg font-bold text-foreground">{speaker.name}</p>
                <p className="text-sm text-muted-foreground">{speaker.role}</p>
                <p className="text-sm text-muted-foreground font-semibold">{speaker.company}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {speaker.socials.map((social) => (
                    <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-land-red hover:underline">
                      {social.label}<ExternalLink className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )) : (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-land-red">Speaker</p>
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
                className="rounded-full border border-land-navy/20 bg-land-coin/30 px-3 py-1 text-xs font-semibold text-land-red"
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

const AgendaCard = ({ item, speakerList, onSelect, showRoom = false }: { item: AgendaItem; speakerList: Speaker[]; onSelect: (item: AgendaItem) => void; showRoom?: boolean }) => {
  const Icon = typeIcons[item.type] || Clock;
  const room = item.room !== "all" ? getRoom(item.room) : undefined;
  const sessionSpeakers = getSpeakers(item, speakerList);
  const byline = sessionSpeakers.map((speaker) => speaker.name).join(", ") || item.host;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`reveal h-full w-full rounded-xl border-2 p-4 text-left transition hover:-translate-y-0.5 hover:border-land-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${typeStyles[item.type] ?? "border-border bg-card/60"}`}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          {showRoom && room && (
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-land-red">
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
    </button>
  );
};

export const AgendaGrid = ({
  items,
  speakerList,
  onSelect = () => {},
}: {
  items: AgendaItem[];
  speakerList: Speaker[];
  onSelect?: (item: AgendaItem) => void;
}) => {
  const times = getTimes(items);

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
              className={`rounded-xl border-2 border-land-navy/15 bg-card p-4 ${room.laneClassName} ${
                room.id === "main" ? "border-primary/50 bg-primary/5" : ""
              }`}
              style={{ gridColumn: room.gridColumn, gridRow: 1 }}
            >
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-land-red" />
                <div>
                  <h3 className="font-bold text-foreground">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.capacity}</p>
                </div>
              </div>
            </div>
          ))}

          {times.map((time, timeIndex) => {
            const slotItems = getItemsForTime(items, time);
            const sharedItem = slotItems.find((item) => item.room === "all");
            const gridRow = timeIndex + 2;

            return (
              <Fragment key={`${time}`}>
                <div
                  key={`${time}-label`}
                  className="py-4 text-sm font-mono font-bold text-muted-foreground"
                  style={{ gridColumn: 1, gridRow }}
                >
                  {time}
                </div>

                {sharedItem && !isCoveredByEarlierItem(items, timeIndex, times) && (
                  <div
                    key={`${time}-shared`}
                    style={{ gridColumn: "2 / span 4", gridRow: `${gridRow} / span ${getDurationSlots(sharedItem)}` }}
                  >
                    <AgendaCard item={sharedItem} speakerList={speakerList} onSelect={onSelect} />
                  </div>
                )}

                {!sharedItem &&
                  !isCoveredByEarlierItem(items, timeIndex, times) &&
                  rooms.map((room) => {
                    if (isCoveredByEarlierItem(items, timeIndex, times, room.id)) {
                      return null;
                    }

                    const roomItem = slotItems.find((item) => item.room === room.id);

                    return (
                      <div
                        key={`${time}-${room.id}`}
                        style={{
                          gridColumn: room.gridColumn,
                          gridRow: roomItem ? `${gridRow} / span ${getDurationSlots(roomItem)}` : gridRow,
                        }}
                      >
                        {roomItem ? (
                          <AgendaCard item={roomItem} speakerList={speakerList} onSelect={onSelect} />
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
          const slotItems = getItemsForTime(items, time);

          return (
            <div key={`${time}-mobile`} className="rounded-xl border border-border bg-card/40 p-4">
              <p className="mb-3 text-sm font-mono font-bold text-muted-foreground">{time}</p>
              <div className="space-y-3">
                {slotItems.map((item) => (
                  <AgendaCard key={`${item.time}-${item.room}-${item.title}`} item={item} speakerList={speakerList} onSelect={onSelect} showRoom />
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
    <h2 className="mb-6 text-3xl font-extrabold">Salas</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`toy p-5 ${room.laneClassName} ${
            room.id === "main" ? "bg-land-coin/20" : "bg-card"
          }`}
        >
          <div className="mb-3 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-land-red" />
            <div>
              <h3 className="text-xl font-bold text-foreground">{room.name}</h3>
              <p className="text-sm font-semibold text-land-red">{room.capacity}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{room.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const AgendaPage = ({ items = agendaItems, speakerList = speakers }: { items?: AgendaItem[]; speakerList?: Speaker[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItem = items.find((item) => getSessionId(item) === searchParams.get("session"));
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
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <PageHeader eyebrow="Programa" title={<>Mapa de <span className="text-land-red">Niveles</span></>}>
          {event2027.date} · {event2027.hours} · {event2027.venue}
        </PageHeader>

        {items.length === 0 ? (
          <LockedLevel title="La agenda se está construyendo">
            Estamos armando un día lleno de charlas, Ignites y Open Spaces. Muy pronto publicaremos el mapa completo.
          </LockedLevel>
        ) : (
          <>
            <div className="mx-auto max-w-6xl">
              <AgendaGrid items={items} speakerList={speakerList} onSelect={selectItem} />
            </div>
            <RoomsOverview />
          </>
        )}
      </div>
    </main>
    <Dialog open={Boolean(selectedItem)} onOpenChange={(open) => !open && closeDialog()}>
      {selectedItem && <SessionDetailsDialog item={selectedItem} speakerList={speakerList} />}
    </Dialog>
    <Footer />
  </div>
};

export default AgendaPage;
