// 2026 agenda and speakers are frozen in git tag `v2026-final` and served at /2026.

export type SessionRoomId = "main" | "room-a" | "room-b";
export type RoomId = SessionRoomId | "all";

export type SocialLink = {
  label: string;
  url: string;
};

export type SpeakerCategory = "comite" | "keynote" | "sponsor" | "accepted";

export type Speaker = {
  id: string;
  category: SpeakerCategory;
  name: string;
  role: string;
  photo: string;
  socials: SocialLink[];
  banner?: string;
  company?: string;
  companyLogo?: string;
};

export type AgendaItem = {
  id?: string;
  time: string;
  title: string;
  speakerIds?: string[];
  host?: string;
  type: string;
  room: RoomId;
  description?: string;
  topics?: string[];
  durationSlots?: number;
};

export type Status = "soon" | "open" | "closed";

/** Single source for everything about the 2027 edition. Flip a status here and every section follows. */
export const event2027 = {
  date: "Viernes 3 de septiembre, 2027",
  dayLabel: "3 de septiembre",
  dateShort: "3 Sept 2027",
  hours: "8:00 – 18:00",
  startsAt: "2027-09-03T08:00:00-04:00",
  venue: "Centro de Extensión UC",
  address: "Av. Alameda Libertador Bernardo O'Higgins 390, 8331150 Santiago, Región Metropolitana",
  mapsUrl: "https://maps.app.goo.gl/sZCydBh2ycoQvyxH8",
  seats: 700,
  tickets: "soon" as Status,
  ticketsApplyUrl: "",
  ticketsRulesUrl: "",
  cfp: "soon" as Status,
  cfpUrl: "",
  recapVideoId: "a69mWcLuZEs",
  youtubeChannel: "https://www.youtube.com/@DevOpsDaysSantiago",
  instagram: "https://www.instagram.com/devopsdayssantiago",
  linkedin: "https://www.linkedin.com/company/devopsdayschile",
};

export type SponsorTier = {
  id: "platinum" | "gold" | "silver" | "comunidad";
  name: string;
  emoji: string;
  slots: number;
  benefits: string[];
};

export const sponsorTiers: SponsorTier[] = [
  {
    id: "platinum",
    name: "Platinum",
    emoji: "💎",
    slots: 3,
    benefits: ["Stand 4x2 mtrs tipo isla", "Mucha más visibilidad", "Publicidad especial en redes sociales y página web"],
  },
  {
    id: "gold",
    name: "Gold",
    emoji: "🥇",
    slots: 6,
    benefits: ["Stand 3x2 mtrs", "Mayor visibilidad", "Publicidad en redes sociales y página web"],
  },
  {
    id: "silver",
    name: "Silver",
    emoji: "🥈",
    slots: 4,
    benefits: ["Stand 2x2 mtrs", "Publicidad en redes sociales y página web"],
  },
  {
    id: "comunidad",
    name: "Comunidades y Training",
    emoji: "🤝",
    slots: 6,
    benefits: ["Presencia en redes sociales y página web"],
  },
];

export const agendaItems: AgendaItem[] = [];

export const speakers: Speaker[] = [];
