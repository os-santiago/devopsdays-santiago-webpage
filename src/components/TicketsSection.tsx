import { motion } from "framer-motion";
import { Rocket, Star, Gem } from "lucide-react";

const tickets = [
  {
    icon: Rocket,
    name: "Early Bird 🛸",
    price: "$30.000 CLP",
    features: ["Acceso completo 2 días", "Almuerzo incluido", "Kit de bienvenida", "Networking"],
    highlight: false,
  },
  {
    icon: Star,
    name: "Comandante ⭐",
    price: "$50.000 CLP",
    features: ["Todo Early Bird", "Asiento preferencial", "Camiseta exclusiva", "After party", "Certificado digital"],
    highlight: true,
  },
  {
    icon: Gem,
    name: "Almirante 💎",
    price: "$80.000 CLP",
    features: ["Todo Comandante", "Acceso VIP", "Sesión de fotos con speakers", "Merchandising premium", "Cena con organizadores"],
    highlight: false,
  },
];

const TicketsSection = () => (
  <section id="entradas" className="py-20 bg-space-gradient relative">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/30">
          Entradas
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mt-4 mb-4">
          Reserva tu <span className="text-gradient-space">Asiento</span>
        </h2>
        <p className="text-muted-foreground text-lg">Elige tu nivel de tripulación para la misión DevOps 2026</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tickets.map((ticket, i) => (
          <motion.div
            key={ticket.name}
            className={`rounded-2xl p-8 border flex flex-col ${
              ticket.highlight
                ? "bg-primary/10 border-primary glow-red scale-105"
                : "bg-card/60 border-border"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <ticket.icon className={`w-10 h-10 mb-4 ${ticket.highlight ? "text-primary" : "text-accent"}`} />
            <h3 className="text-xl font-bold text-foreground mb-1">{ticket.name}</h3>
            <p className="text-3xl font-black text-foreground mb-6">{ticket.price}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {ticket.features.map((f) => (
                <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`block text-center py-3 rounded-xl font-bold transition-transform hover:scale-105 ${
                ticket.highlight
                  ? "bg-primary text-primary-foreground glow-red"
                  : "bg-muted text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              Comprar
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TicketsSection;
