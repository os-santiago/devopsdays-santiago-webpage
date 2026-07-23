export type DayId = "day-1" | "day-2";
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
  day: DayId;
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

export const agendaItems: AgendaItem[] = [
  { day: "day-1", time: "08:00", title: "Registro y Café ☕ + Networking 🗣️", type: "break", room: "all", description: "¡Comencemos el día conectando con la comunidad!\n\Apartir de las 08:00 de la mañana abriremos las puertas para dar inicio a DevOpsDays Santiago 2026. Te invitamos a llegar con anticipación para realizar tu acreditación, retirar tu credencial y comenzar la experiencia sin apuros antes de las charlas del auditorio principal.\n\nMientras completas tu registro, podrás disfrutar del desayuno que hemos preparado especialmente para todos los asistentes y aprovechar este primer espacio para conocer a otros profesionales de la comunidad, intercambiar ideas y comenzar nuevas conversaciones.\n\nAdemás, nuestros patrocinadores ya estarán esperándote en sus stands con demostraciones, conocimiento, sorpresas y regalos exclusivos. Es el momento perfecto para descubrir nuevas tecnologías, conversar con expertos y sacar el máximo provecho desde el primer minuto del evento.\n\n¡Llega temprano, disfruta el desayuno y comienza a vivir la experiencia DevOpsDays junto a toda la comunidad!" },
  { day: "day-1", time: "08:45", title: "Apertura oficial 🎊", host: "Comité Organizador", type: "ignite", room: "main", speakerIds: ["caio-mede", "karen-quijada", "sergio-canales", "jorge-valenzuela", "caco"], description: "¡La misión comienza!\n\nAcompáñanos en la bienvenida oficial de DevOpsDays Santiago 2026, donde el comité organizador dará inicio a dos días dedicados a compartir conocimiento, fortalecer la comunidad y explorar las tendencias que están transformando la industria tecnológica.\n\nConoce qué hemos preparado para esta edición y prepárate para una agenda llena de charlas, experiencias y conversaciones sobre DevOps, Inteligencia Artificial, Platform Engineering, Cloud Native y muchas otras prácticas que están definiendo el futuro del desarrollo y las operaciones.\n\nEs el momento de dar el puntapié inicial a una experiencia diseñada para aprender, conectar y volver a casa con nuevas ideas para impulsar tus próximos desafíos." },
  { day: "day-1", time: "09:00", title: "DevOps ha muerto, larga vida al DevOps: de servir aplicaciones a servir modelos", type: "keynote", room: "main", speakerIds: ["matias-sonnleitner"], description: "Durante más de una década, DevOps nos enseñó a desplegar aplicaciones más rápido, más seguras y más resilientes. Pero la infraestructura que construimos para servir código ya no alcanza para servir inteligencia. Los modelos de IA no se despliegan, se entrenan, se versionan, se monitorean por drift y se sirven a escala — y eso exige una reconversión real, no solo un rebranding.\n\nEn este keynote exploraremos por qué el DevOps tradicional está llegando a su límite natural, qué se lleva consigo MLOps que no existía antes (datos, GPUs, pipelines de entrenamiento, observabilidad de modelos), y qué sobrevive intacto de la cultura DevOps que ya conocemos: colaboración, automatización y mejora continua.\n\nNo es el fin de una disciplina. Es su siguiente capítulo — y quienes lideran equipos de infraestructura hoy tienen la oportunidad de escribirlo.", topics: ["MLOps", "DevOps", "Inteligencia Artificial"] },
  { day: "day-1", time: "09:30", title: "Panel Platinum - Trabajando con IA: Cómo cambiarán los equipos tecnológicos en los próximos 5 años", type: "talk", room: "main" },
  { day: "day-1", time: "10:00", title: "Coffee Break, Patrocinadores, y Comunidades 🚀", type: "break", room: "all" },
  { day: "day-1", time: "10:30", title: "Charla Platinum: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "11:00", title: "Conoce a nuestro Patrocinadores 🏆", host: "Mondini, Dynatrace, y TG Native", type: "ignite", room: "main" },
  { day: "day-1", time: "11:30", title: "Charla Platinum: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "12:00", title: "Panel de Mujeres 👩🏼‍💻: --", host: "Karen Quijada", type: "ignite", room: "main", durationSlots: 2 },
  { day: "day-1", time: "12:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "12:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-1", time: "12:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "12:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-1", time: "13:00", title: "Almuerzo 🍽️", type: "break", room: "all" },
  { day: "day-1", time: "15:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "15:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "15:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-1", time: "15:00", title: "Taller: --", host: "Por confirmar", type: "workshop", room: "room-b", durationSlots: 2 },
  { day: "day-1", time: "15:30", title: "Charla Suse: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-1", time: "16:00", title: "Cierre Día 1 + Anuncios + Llamado a Networking", host: "Comité Organizador", type: "ignite", room: "main" },
  { day: "day-2", time: "08:00", title: "Registro y Café ☕ + Networking 🗣️", type: "break", room: "all" },
  { day: "day-2", time: "08:45", title: "Apertura oficial 🎊", host: "Comité Organizador", type: "ignite", room: "main" },
  { day: "day-2", time: "09:00", title: "Keynote: --", host: "Por confirmar", type: "keynote", room: "main" },
  { day: "day-2", time: "09:30", title: "Charla Platinum: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "10:00", title: "Coffee Break, Patrocinadores, y Comunidades 🚀", type: "break", room: "all" },
  { day: "day-2", time: "10:30", title: "Keynote: --", host: "Por confirmar", type: "keynote", room: "main" },
  { day: "day-2", time: "11:00", title: "Conoce a nuestro Patrocinadores 🏆", host: "Axmos + Datadog, Red Hat, Technology Solutions, y Manage Engine", type: "ignite", room: "main" },
  { day: "day-2", time: "11:30", title: "Charla Platinum: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "12:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "12:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "12:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-2", time: "12:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "12:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-b" },
  { day: "day-2", time: "12:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "13:00", title: "Almuerzo 🍽️", type: "break", room: "all" },
  { day: "day-2", time: "14:30", title: "Sorteos 🎁", host: "Comité Organizador", type: "ignite", room: "all" },
  { day: "day-2", time: "15:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "15:00", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "15:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "room-a" },
  { day: "day-2", time: "15:00", title: "Taller: --", host: "Por confirmar", type: "workshop", room: "room-b", durationSlots: 2 },
  { day: "day-2", time: "15:30", title: "Charla: --", host: "Por confirmar", type: "talk", room: "main" },
  { day: "day-2", time: "16:00", title: "Cierre Día 2", host: "Comité Organizador", type: "break", room: "main" },
];

// Add speakers only after their final copy and assets have been confirmed.
export const speakers: Speaker[] = [
  { id: "karen-quijada", category: "comite", name: "Karen Quijada", role: "Solution Architect en Optima LATAM", photo: "/src/assets/speakers/karen-quijada.png", socials: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/karenquijadazuniga/" }] },
  { id: "caio-mede", category: "comite", name: "Caio Medeiros Pinto", role: "DevOps & Support Lead en Testkube", photo: "/src/assets/speakers/caio-mede.jpeg", socials: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/caiodona" }] },
  { id: "sergio-canales", category: "comite", name: "Sergio Canales", role: "Associate Principal Architect en Red Hat", photo: "/src/assets/speakers/sergio-canales.jpeg", socials: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/sergio-canales-espinoza/" }] },
  { id: "jorge-valenzuela", category: "comite", name: "Jorge Valenzuela", role: "Ingeniero DevOps en Depósito Central de Valores", photo: "/src/assets/speakers/jorge-valenzuela.png", socials: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/jorgevalenzueladiaz/" }] },
  { id: "caco", category: "comite", name: "Juan José Mendez", role: "Marketing Specialist en Red Hat", photo: "/src/assets/speakers/caco.png", socials: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/juan-jos%C3%A9-mendez-r/" }] },
  { id: "matias-sonnleitner", category: "keynote", name: "Matías Sonnleitner", role: "Cloud & DevOps Cluster Lead en SoftServe", photo: "/src/assets/speakers/matias-sonnleitner.jpeg", socials: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/msonnlef/" }] },
];
