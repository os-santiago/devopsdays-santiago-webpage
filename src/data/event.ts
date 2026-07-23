export type DayId = "day-1" | "day-2";
export type SessionRoomId = "main" | "room-a" | "room-b";
export type RoomId = SessionRoomId | "all";

export type SocialLink = {
  label: string;
  url: string;
};

export type SpeakerCategory = "keynote" | "sponsor" | "accepted";

export type Speaker = {
  id: string;
  category: SpeakerCategory;
  name: string;
  role: string;
  photo: string;
  socials: SocialLink[];
  sessionId: string;
  banner?: string;
  company?: string;
  companyLogo?: string;
};

export type AgendaItem = {
  id?: string;
  day: DayId;
  time: string;
  title: string;
  speaker: string;
  type: string;
  room: RoomId;
  description?: string;
  speakerRole?: string;
  speakerPhoto?: string;
  speakerSocialUrl?: string;
  topics?: string[];
  durationSlots?: number;
};

export const agendaItems: AgendaItem[] = [
  { day: "day-1", time: "08:00", title: "Registro y Café ☕ + Networking 🗣️", speaker: "", type: "break", room: "all" },
  { day: "day-1", time: "08:45", title: "Apertura oficial 🎊", speaker: "Comité Organizador", type: "ignite", room: "main" },
  { day: "day-1", time: "09:00", title: "DevOps ha muerto, larga vida al DevOps: de servir aplicaciones a servir modelos", speaker: "Matias Sonnleitner", type: "keynote", room: "main" },
  { day: "day-1", time: "09:30", title: "Panel Platinum - Trabajando con IA: Cómo cambiarán los equipos tecnológicos en los próximos 5 años", speaker: "Invitado de Mondini IT, Invitado de Dynatrace, Leonardo Ramirez, Christian Onetto", type: "talk", room: "main" },
  { day: "day-1", time: "10:00", title: "Coffee Break, Patrocinadores, y Comunidades 🚀", speaker: "", type: "break", room: "all" },
  { day: "day-1", time: "10:30", title: "Charla Platinum: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "11:00", title: "Conoce a nuestro Patrocinadores 🏆", speaker: "Mondini, Dynatrace, y TG Native", type: "ignite", room: "main" },
  { day: "day-1", time: "11:30", title: "Charla Platinum: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "12:00", title: "Panel de Mujeres 👩🏼‍💻: --", speaker: "Karen Quijada", type: "ignite", room: "main", durationSlots: 2 },
  { day: "day-1", time: "12:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "12:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-1", time: "12:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "12:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-1", time: "13:00", title: "Almuerzo 🍽️", speaker: "", type: "break", room: "all" },
  { day: "day-1", time: "15:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "15:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "15:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "15:00", title: "Taller: --", speaker: "Por confirmar", type: "workshop", room: "room-b", durationSlots: 2 },
  { day: "day-1", time: "15:30", title: "Charla Suse: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "16:00", title: "Cierre Día 1 + Anuncios + Llamado a Networking", speaker: "Comité Organizador", type: "ignite", room: "main" },
  { day: "day-2", time: "08:00", title: "Registro y Café ☕ + Networking 🗣️", speaker: "", type: "break", room: "all" },
  { day: "day-2", time: "08:45", title: "Apertura oficial 🎊", speaker: "Comité Organizador", type: "ignite", room: "main" },
  { day: "day-2", time: "09:00", title: "Keynote: --", speaker: "Por confirmar", type: "keynote", room: "main" },
  { day: "day-2", time: "09:30", title: "Charla Platinum: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "10:00", title: "Coffee Break, Patrocinadores, y Comunidades 🚀", speaker: "", type: "break", room: "all" },
  { day: "day-2", time: "10:30", title: "Keynote: --", speaker: "Por confirmar", type: "keynote", room: "main" },
  { day: "day-2", time: "11:00", title: "Conoce a nuestro Patrocinadores 🏆", speaker: "Axmos + Datadog, Red Hat, Technology Solutions, y Manage Engine", type: "ignite", room: "main" },
  { day: "day-2", time: "11:30", title: "Charla Platinum: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "12:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "12:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "12:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-2", time: "12:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "12:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-2", time: "12:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "13:00", title: "Almuerzo 🍽️", speaker: "", type: "break", room: "all" },
  { day: "day-2", time: "14:30", title: "Sorteos 🎁", speaker: "Comité Organizador", type: "ignite", room: "all" },
  { day: "day-2", time: "15:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "15:00", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "15:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "15:00", title: "Taller: --", speaker: "Por confirmar", type: "workshop", room: "room-b", durationSlots: 2 },
  { day: "day-2", time: "15:30", title: "Charla: --", speaker: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "16:00", title: "Cierre Día 2", speaker: "Comité Organizador", type: "break", room: "main" },
];

// Add speakers only after their final copy and assets have been confirmed.
export const speakers: Speaker[] = [];
