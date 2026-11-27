import { Link } from "react-router-dom";
import { sponsorTiers } from "@/data/event";

const slotSize: Record<string, string> = {
  platinum: "h-28 w-40 text-sm sm:h-32 sm:w-56",
  gold: "h-24 w-36 text-sm sm:w-44",
  silver: "h-20 w-24 text-xs sm:w-36 sm:text-sm",
  comunidad: "h-20 w-24 text-xs sm:w-36 sm:text-sm",
};

const SponsorsSection = () => {
  const total = sponsorTiers.reduce((sum, tier) => sum + tier.slots, 0);

  return (
    <section aria-labelledby="sponsors-title" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-4">Aliados</p>
          <h2 id="sponsors-title" className="mb-4 text-4xl font-extrabold md:text-5xl">
            Sé aliado de DevOpsDays Land
          </h2>
          <p className="text-lg text-muted-foreground">
            {total} espacios disponibles para marcas, comunidades y training que quieran ser parte del mundo 2027.
          </p>
        </div>

        <div className="space-y-12">
          {sponsorTiers.map((tier) => (
            <div key={tier.id} className="reveal">
              <h3 className="mb-5 text-center text-2xl font-extrabold">
                {tier.emoji} {tier.name} <span className="text-base font-semibold text-muted-foreground">· {tier.slots} espacios</span>
              </h3>
              <ul className="flex flex-wrap justify-center gap-4">
                {Array.from({ length: tier.slots }, (_, i) => (
                  <li key={i}>
                    <Link
                      to="/patrocinio"
                      className={`${slotSize[tier.id]} flex flex-col items-center justify-center gap-1 rounded-2xl px-2 text-center border-[3px] border-dashed border-land-navy/40 bg-card/70 font-bold text-muted-foreground transition hover:-translate-y-1 hover:border-land-navy hover:text-land-navy`}
                    >
                      <span aria-hidden="true" className="font-display text-2xl">{"{ }"}</span>
                      Espacio disponible
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/patrocinio" className="btn-block">
            Conviértete en Patrocinador
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
