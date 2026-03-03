import { motion } from "framer-motion";

const sponsorTiers = [
  {
    tier: "Platino 🪐",
    logos: ["Sponsor Platino 1", "Sponsor Platino 2"],
  },
  {
    tier: "Oro ⭐",
    logos: ["Sponsor Oro 1", "Sponsor Oro 2", "Sponsor Oro 3"],
  },
  {
    tier: "Plata 🌙",
    logos: ["Sponsor Plata 1", "Sponsor Plata 2", "Sponsor Plata 3", "Sponsor Plata 4"],
  },
];

const SponsorsSection = () => (
  <section className="py-20 bg-secondary relative">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold uppercase tracking-widest border border-accent/30">
          Patrocinadores
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mt-4 mb-4">
          Aliados de la <span className="text-gradient-space">Misión</span>
        </h2>
      </motion.div>

      <div className="space-y-12 max-w-4xl mx-auto">
        {sponsorTiers.map((tier) => (
          <div key={tier.tier} className="text-center">
            <h3 className="text-lg font-bold text-muted-foreground mb-6">{tier.tier}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {tier.logos.map((name) => (
                <div
                  key={name}
                  className="w-40 h-20 rounded-xl bg-card/60 border border-border flex items-center justify-center text-sm text-muted-foreground font-medium"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/patrocinio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
        >
          Conviértete en Patrocinador →
        </a>
      </div>
    </div>
  </section>
);

export default SponsorsSection;
