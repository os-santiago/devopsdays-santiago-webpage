import { motion } from "framer-motion";
import { Check, Rocket, Star, Gem, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const levels = [
  {
    icon: Rocket,
    name: "Bronce 🌍",
    price: "$500 USD",
    color: "border-border",
    benefits: [
      "Logo en sitio web",
      "Mención en redes sociales",
      "2 entradas al evento",
    ],
  },
  {
    icon: Star,
    name: "Plata 🌙",
    price: "$1.500 USD",
    color: "border-muted-foreground",
    benefits: [
      "Todo lo de Bronce",
      "Logo en material impreso",
      "5 entradas al evento",
      "Stand pequeño",
      "Mención en keynote",
    ],
  },
  {
    icon: Gem,
    name: "Oro ⭐",
    price: "$3.000 USD",
    color: "border-accent",
    highlight: true,
    benefits: [
      "Todo lo de Plata",
      "Stand grande",
      "10 entradas al evento",
      "Logo en camisetas",
      "Charla de 5 min",
      "Publicidad en pantallas",
    ],
  },
  {
    icon: Crown,
    name: "Platino 🪐",
    price: "$5.000 USD",
    color: "border-primary",
    benefits: [
      "Todo lo de Oro",
      "Naming de track",
      "15 entradas al evento",
      "Charla de 15 min",
      "Logo principal en todo el material",
      "Acceso VIP completo",
      "Cena con organizadores",
    ],
  },
];

const SponsorshipPage = () => (
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
            Patrocinio
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mt-4 mb-4">
            Niveles de <span className="text-gradient-space">Patrocinio</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Impulsa tu marca junto a la comunidad DevOps más grande de Chile. Elige el nivel que mejor se adapte a tu organización.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {levels.map((level, i) => (
            <motion.div
              key={level.name}
              className={`rounded-2xl p-6 border flex flex-col ${level.color} ${
                level.highlight ? "bg-accent/5 glow-sky" : "bg-card/60"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <level.icon className={`w-10 h-10 mb-4 ${level.highlight ? "text-accent" : "text-muted-foreground"}`} />
              <h3 className="text-xl font-bold text-foreground mb-1">{level.name}</h3>
              <p className="text-3xl font-black text-foreground mb-6">{level.price}</p>
              <ul className="space-y-3 flex-1 mb-6">
                {level.benefits.map((b) => (
                  <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="/contacto"
                className="block text-center py-3 rounded-xl font-bold bg-muted text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Contactar
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default SponsorshipPage;
