import { motion } from "framer-motion";
import dynatraceLogo from "@/assets/logo-dynatrace.svg";
import tgNativeLogo from "@/assets/logo-tgnative.png";
import redHatLogo from "@/assets/logo-redhat.svg";
import technologySolutionsLogo from "@/assets/logo-techlatam.svg";
import fluidAttacksLogo from "@/assets/logo-fluid-attack.svg";
import mondiniLogo from "@/assets/logo-mondini.svg";
import manageEngineLogo from "@/assets/logo-manageengine.svg";
import unykoLogo from "@/assets/logo-unykotalent.png";
import axmosLogo from "@/assets/logo-axmos.png";
import certJoinLogo from "@/assets/logo-certjoin.png";
import avattarLogo from "@/assets/logo-avattar.png";
import actiLogo from "@/assets/logo-acti.png";
import invokeLogo from "@/assets/logo-invoke.png";
import tsoftLogo from "@/assets/logo-tsoft.svg";
import suseLogo from "@/assets/logo-suse.jpg";

type Sponsor = {
  name: string;
  website: string;
  logoSrc?: string;
  cardTheme?: "light" | "dark";
};

type SponsorTier = {
  tier: string;
  capacity: number;
  sponsors: Sponsor[];
};

type SponsorSlot = {
  name: string;
  website?: string;
  logoSrc?: string;
  cardTheme?: Sponsor["cardTheme"];
  available: boolean;
};

const sponsorTiers = [
  {
    tier: "Platinum 🪐",
    capacity: 4,
    sponsors: [
      { name: "Mondini IT", website: "https://mondini-it.com/", logoSrc: mondiniLogo },
      { name: "Dynatrace", website: "https://www.dynatrace.com", logoSrc: dynatraceLogo },
      { name: "TG Native", website: "https://tgcorp.tech/", logoSrc: tgNativeLogo },
      { name: "Axmos", website: "https://www.axmos.tech/es", logoSrc: axmosLogo, cardTheme: "dark" },
    ],
  },
  {
    tier: "Oro ⭐",
    capacity: 6,
    sponsors: [
      { name: "Red Hat", website: "https://www.redhat.com", logoSrc: redHatLogo },
      { name: "Technology Solutions", website: "https://technologylatam.com/", logoSrc: technologySolutionsLogo },
      { name: "Manage Engine", website: "https://www.manageengine.com/", logoSrc: manageEngineLogo },
      { name: "TSoft", website: "https://www.tsoftglobal.com/", logoSrc: tsoftLogo },
    ],
  },
  {
    tier: "Plata 🌙",
    capacity: 5,
    sponsors: [
      { name: "Fluid Attacks", website: "https://fluidattacks.com/", logoSrc: fluidAttacksLogo },
      { name: "Unyko Talent", website: "https://unyko.cl/", logoSrc: unykoLogo },
      { name: "Suse", website: "https://www.suse.com/es-es/", logoSrc: suseLogo },
      { name: "Invoke", website: "https://www.invoke.cl/", logoSrc: invokeLogo },
    ],
  },
  {
    tier: "Colaboraciones / Comunidades 🚀",
    capacity: 6,
    sponsors: [
      { name: "CertJoin", website: "https://certjoin.com/es/", logoSrc: certJoinLogo },
      { name: "Avattar", website: "https://avattar.com/", logoSrc: avattarLogo },
      { name: "ACTI", website: "https://acti.cl/", logoSrc: actiLogo },
    ],
  },
] satisfies SponsorTier[];

const toSlots = (tier: SponsorTier): SponsorSlot[] => {
  const filledSlots = tier.sponsors.slice(0, tier.capacity).map((sponsor) => ({
    name: sponsor.name,
    website: sponsor.website,
    logoSrc: sponsor.logoSrc,
    cardTheme: sponsor.cardTheme,
    available: false,
  }));

  const availableSlots = Array.from({ length: Math.max(tier.capacity - filledSlots.length, 0) }, (_, index) => ({
    name: `Espacio disponible ${index + 1}`,
    available: true,
  }));

  return [...filledSlots, ...availableSlots];
};

const getTierSizing = (tierName: string) => {
  if (tierName === "Platinum 🪐") {
    return {
      cardClassName: "w-56 h-32",
      logoClassName: "max-h-[5.75rem]",
    };
  }

  if (tierName === "Oro ⭐") {
    return {
      cardClassName: "w-44 h-24",
      logoClassName: "max-h-[4.25rem]",
    };
  }

  return {
    cardClassName: "w-40 h-[5.5rem]",
    logoClassName: "max-h-16",
  };
};

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
        {sponsorTiers.map((tier) => {
          const { cardClassName, logoClassName } = getTierSizing(tier.tier);

          return (
            <div key={tier.tier} className="text-center">
              <h3 className="text-3xl font-bold text-muted-foreground mb-6">{tier.tier}</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {toSlots(tier).map((slot) =>
                  slot.available ? (
                    <div
                      key={`${tier.tier}-${slot.name}`}
                      className={`${cardClassName} rounded-xl bg-card/60 border border-border flex items-center justify-center px-3 text-xs text-muted-foreground font-semibold uppercase tracking-wide`}
                    >
                      Espacio disponible
                    </div>
                  ) : (
                    <a
                      key={`${tier.tier}-${slot.name}`}
                      href={slot.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cardClassName} rounded-xl border shadow-sm hover:shadow-md transition-all flex items-center justify-center p-3 ${
                        slot.cardTheme === "dark"
                          ? "bg-slate-950 border-slate-700"
                          : "bg-white border-border/60"
                      }`}
                      aria-label={`Sitio web de ${slot.name}`}
                    >
                      {slot.logoSrc ? (
                        <img
                          src={slot.logoSrc}
                          alt={`Logo ${slot.name}`}
                          className={`${logoClassName} max-w-full object-contain`}
                        />
                      ) : (
                        <span className="text-sm text-slate-800 font-semibold text-center">{slot.name}</span>
                      )}
                    </a>
                  ),
                )}
              </div>
            </div>
          );
        })}
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
