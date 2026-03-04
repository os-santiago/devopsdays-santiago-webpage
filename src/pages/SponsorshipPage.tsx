import { motion } from "framer-motion";
import { Check, Rocket, Star, Gem, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const levels = [
  {
    icon: Rocket,
    name: "Platinium 🪐",
    price: "$8.000.000 CLP (~$10.000 USD)",
    color: "border-accent",
    highlight: true,
    benefits: [
      "Stand 4x2 mtrs tipo isla",
      "Mucha más visibilidad",
      "20 mins de charla en escenario principal",
      "Participación en Panel de Expertos",
      "Publicidad especial en redes sociales y página web",
      "10 Entradas normales",
      "5 Entradas VIP",
      "8 Entradas al After Office",
      "2 Estacionamientos",
    ],
  },
  {
    icon: Star,
    name: "Gold 🌎",
    price: "$5.000.000 CLP (~$6.250 USD)",
    color: "border-muted-foreground",
    benefits: [
      "Stand 3x2 mtrs",
      "Mayor visibilidad",
      "5 mins en escenario principal",
      "Publicidad en redes sociales y página web",
      "10 Entradas normales",
      "4 Entradas al After Office",
      "1 Estacionamiento",
    ],
  },
  {
    icon: Gem,
    name: "Silver 🌙",
    price: "$3.000.000 CLP (~$3.750 USD)",
    color: "border-border",
    benefits: [
      "Stand 2x2 mtrs",
      "Publicidad en redes sociales y página web",
      "5 Entradas normales",
      "2 Entradas al After Office",
      "1 Estacionamiento",
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

        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {levels.map((level, i) => (
            <motion.div
              key={level.name}
              className={`w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-sm rounded-2xl p-6 border flex flex-col ${level.color} ${
                level.highlight ? "bg-accent/5 glow-sky" : "bg-card/60"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <level.icon className={`w-10 h-10 mb-4 ${level.highlight ? "text-accent" : "text-muted-foreground"}`} />
              <p className="text-3xl font-black text-foreground mb-1">{level.name}</p>
              <h3 className="text-xl font-bold text-foreground mb-6">{level.price}</h3>
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
