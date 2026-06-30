import { motion } from "framer-motion";
import { Rocket, CalendarDays, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-space-bg.jpg";
import mascot from "@/assets/mascot-astronaut.png";
import logo from "@/assets/logo-devopsdays.png";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 star-field opacity-40" />
    </div>

    <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="DevOpsDays" className="h-16 w-16 rounded-full glow-sky" />
            <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold uppercase tracking-widest border border-accent/30">
              Misión 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="text-foreground">DevOpsDays</span>
            <br />
            <span className="text-gradient-space">Santiago</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-8">
            🚀 Únete a la misión espacial DevOps más grande de Latinoamérica. 
            Explora nuevas fronteras en desarrollo, operaciones y seguridad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">8-9 Septiembre, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <a
                href="https://maps.app.goo.gl/sZCydBh2ycoQvyxH8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm font-medium">Centro de Extensión UC, Santiago, Chile</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#entradas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base glow-red transition-transform hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              Comprar Entradas
            </a>
            <a
              href="#cfp"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent/10 text-accent border border-accent/30 font-bold text-base transition-all hover:bg-accent/20"
            >
              Postula tu Charla
            </a>
            <a
              href="https://homedir.opensourcesantiago.io/event/devopsdays-santiago-2026/volunteers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent/10 text-accent border border-accent/30 font-bold text-base transition-all hover:bg-accent/20"
            >
              Participa como Voluntario
            </a>
          </div>
        </motion.div>

        {/* Right mascot */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.img
            src={mascot}
            alt="Mascota DevOpsDays astronauta"
            className="w-72 md:w-96 drop-shadow-2xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
