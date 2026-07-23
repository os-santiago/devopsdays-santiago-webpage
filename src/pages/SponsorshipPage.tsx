import { motion } from "framer-motion";
import { Check, Rocket, Star, Gem, HeartHandshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const levels = [
  {
    icon: Rocket,
    name: "Platinum 🪐",
    price: "$8.000.000 CLP (~$8.920 USD)",
    color: "border-border",
    soldOut: true,
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
    price: "$5.000.000 CLP (~$5.575 USD)",
    color: "border-accent",
    highlight: true,
    remaining: 1,
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
    price: "$3.000.000 CLP (~$3.345 USD)",
    color: "border-border",
    soldOut: true,
    benefits: [
      "Stand 2x2 mtrs",
      "Publicidad en redes sociales y página web",
      "5 Entradas normales",
      "2 Entradas al After Office",
      "1 Estacionamiento",
    ],
  },
  {
    icon: HeartHandshake,
    name: "Colaboraciones y Comunidades",
    price: "Convocatoria abierta",
    color: "border-border",
    highlight: true,
    benefits: [
      "Espacio para comunidades, media partners y colaboraciones",
      "Presencia en redes sociales y página web",
      "Articulación con la comunidad DevOpsDays Santiago",
    ],
    ctaLabel: "Participa en colaboraciones y comunidades",
    ctaHref: "https://forms.gle/PbDnyLSq1LdD8XPL6",
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
              className={`relative overflow-hidden w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-sm rounded-2xl p-6 border flex flex-col ${level.color} ${
                level.highlight ? "bg-accent/5 glow-sky" : "bg-card/60"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {"soldOut" in level && level.soldOut && (
                <span className="absolute top-6 -right-12 w-44 rotate-45 bg-destructive py-1 text-center text-sm font-black tracking-widest text-destructive-foreground shadow-lg">
                  SOLD OUT!
                </span>
              )}
              {"remaining" in level && (
                <span className="absolute top-4 right-4 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-xs font-black tracking-wide text-amber-300">
                  {level.remaining} CUPO DISPONIBLE
                </span>
              )}
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
              {"ctaLabel" in level && (
                <a
                  href={level.ctaHref}
                  className="inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold bg-muted text-foreground hover:bg-accent hover:text-accent-foreground transition-all text-sm text-center"
                >
                  {level.ctaLabel}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-16 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all"
          >
            Contactar
          </a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default SponsorshipPage;
