import { motion } from "framer-motion";
import { Send, Lightbulb, Clock } from "lucide-react";

const CFPSection = () => (
  <section id="cfp" className="py-20 bg-secondary relative overflow-hidden">
    <div className="absolute inset-0 star-field opacity-20" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold uppercase tracking-widest border border-accent/30">
          Call for Papers
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mt-4 mb-4">
          Comparte tu <span className="text-gradient-space">Misión</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          ¿Tienes una historia DevOps que contar? Postula tu charla y sé parte del programa del evento más importante de la comunidad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: Lightbulb, title: "Temas", desc: "DevOps, SRE, Platform Engineering, Cloud Native, Seguridad, Cultura" },
            { icon: Clock, title: "Formato", desc: "Charlas de 30 min, Ignite Talks de 5 min, Talleres" },
            { icon: Send, title: "Deadline", desc: "30 de Junio, 2026" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-card/60 border border-border rounded-2xl p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <a
          href="https://www.papercall.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold glow-sky transition-transform hover:scale-105"
        >
          <Send className="w-5 h-5" />
          Postula tu Charla
        </a>
      </motion.div>
    </div>
  </section>
);

export default CFPSection;
