import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Coffee, Mic2, Users, Rocket } from "lucide-react";

const day1 = [
  // { time: "08:30", title: "Registro y Café ☕", speaker: "", type: "break" },
  // { time: "09:00", title: "Keynote: El Futuro del DevOps en la Era Espacial", speaker: "Por confirmar", type: "keynote" },
  // { time: "10:00", title: "Platform Engineering: Construyendo la Estación Espacial", speaker: "Por confirmar", type: "talk" },
  // { time: "10:45", title: "Coffee Break 🚀", speaker: "", type: "break" },
  // { time: "11:15", title: "SRE: Manteniendo Satélites en Órbita", speaker: "Por confirmar", type: "talk" },
  // { time: "12:00", title: "Ignite Talks (5 min c/u)", speaker: "Múltiples speakers", type: "ignite" },
  // { time: "12:30", title: "Almuerzo 🍽️", speaker: "", type: "break" },
  // { time: "14:00", title: "Open Spaces", speaker: "Toda la comunidad", type: "workshop" },
  // { time: "16:00", title: "Cierre Día 1 + Networking", speaker: "", type: "break" },
];

const day2 = [
  // { time: "08:30", title: "Registro y Café ☕", speaker: "", type: "break" },
  // { time: "09:00", title: "Keynote: Seguridad en la Frontera Final", speaker: "Por confirmar", type: "keynote" },
  // { time: "10:00", title: "Cloud Native: Navegando las Nebulosas", speaker: "Por confirmar", type: "talk" },
  // { time: "10:45", title: "Coffee Break 🛸", speaker: "", type: "break" },
  // { time: "11:15", title: "CI/CD: Lanzamientos a la Velocidad de la Luz", speaker: "Por confirmar", type: "talk" },
  // { time: "12:00", title: "Panel: DevSecOps en Latinoamérica", speaker: "Panel", type: "talk" },
  // { time: "12:30", title: "Almuerzo 🍽️", speaker: "", type: "break" },
  // { time: "14:00", title: "Open Spaces", speaker: "Toda la comunidad", type: "workshop" },
  // { time: "16:00", title: "Keynote de Cierre + Sorteos 🎁", speaker: "Por confirmar", type: "keynote" },
  // { time: "17:00", title: "After Party 🎉", speaker: "", type: "break" },
];

const typeStyles: Record<string, string> = {
  keynote: "border-primary bg-primary/10",
  talk: "border-accent bg-accent/10",
  ignite: "border-space-star bg-space-star/10",
  workshop: "border-accent bg-accent/5",
  break: "border-border bg-muted/30",
};

const typeIcons: Record<string, React.ElementType> = {
  keynote: Rocket,
  talk: Mic2,
  ignite: Mic2,
  workshop: Users,
  break: Coffee,
};

export type AgendaItem = {
  time: string;
  title: string;
  speaker: string;
  type: string;
};

export const AgendaDay = ({ title, items }: { title: string; items: AgendaItem[] }) => (
  <div>
    <h3 className="text-2xl font-bold text-foreground mb-6">{title}</h3>
    <div className="space-y-3">
      {items.map((item, i) => {
        const Icon = typeIcons[item.type] || Clock;
        return (
          <motion.div
            key={i}
            className={`flex items-start gap-4 p-4 rounded-xl border ${typeStyles[item.type]}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-sm font-mono font-bold text-muted-foreground min-w-[50px]">{item.time}</span>
            <Icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-foreground">{item.title}</p>
              {item.speaker && <p className="text-sm text-muted-foreground">{item.speaker}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const AgendaPage = () => (
  <div className="min-h-screen bg-background">
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
          <p className="text-muted-foreground text-lg">8 y 9 de Septiembre, 2026 — Centro de Extensión UC, Santiago, Chile</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <AgendaDay title="🛸 Día 1 — 8 de Septiembre" items={day1} />
          <AgendaDay title="🚀 Día 2 — 9 de Septiembre" items={day2} />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default AgendaPage;
