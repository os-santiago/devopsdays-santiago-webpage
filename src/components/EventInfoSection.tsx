import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Mic2 } from "lucide-react";

const stats = [
  { icon: CalendarDays, label: "Fecha", value: "8-9 Sept 2026" },
  { icon: MapPin, label: "Lugar", value: "Centro de Extensión UC" },
  { icon: Users, label: "Asistentes", value: "700+" },
  { icon: Mic2, label: "Charlas", value: "20+" },
];

const EventInfoSection = () => (
  <section className="py-20 bg-space-gradient relative">
    <div className="container mx-auto px-4">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default EventInfoSection;
