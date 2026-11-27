import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { sponsorTiers } from "@/data/event";

const MORE_SOON = "✨ Pronto publicaremos más beneficios por nivel";

const SponsorshipPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pb-20 pt-28">
      <div className="container mx-auto px-4">
        <PageHeader eyebrow="Patrocinio" title={<>Niveles de <span className="text-land-red">Patrocinio</span></>}>
          Impulsa tu marca junto a la comunidad DevOps más grande de Chile. Elige el nivel que mejor se adapte a tu
          organización. {MORE_SOON}.
        </PageHeader>

        <ul className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorTiers.map((tier) => (
            <li
              key={tier.id}
              className={`reveal toy flex flex-col p-6 ${tier.id === "platinum" ? "bg-land-coin/25" : "bg-[#FFF6E5]"}`}
            >
              <p className="mb-1 text-4xl" aria-hidden="true">{tier.emoji}</p>
              <h2 className="text-3xl font-extrabold">{tier.name}</h2>
              <p className="mb-4 font-display text-lg font-bold text-land-red">{tier.slots} espacios</p>
              <p className="mb-5 rounded-xl border-2 border-dashed border-land-navy/30 px-3 py-2 text-sm font-semibold">
                Valor: pronto lo publicaremos
              </p>
              <ul className="mb-5 flex-1 space-y-3">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-land-grass" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mb-5 text-sm font-semibold text-muted-foreground">{MORE_SOON}</p>
              <Link to="/contacto" className="btn-block btn-sm w-full">
                Contactar
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
    <Footer />
  </div>
);

export default SponsorshipPage;
