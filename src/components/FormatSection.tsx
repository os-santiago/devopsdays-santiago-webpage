import braces from "@/assets/2027/svg/block-braces.svg";
import gear from "@/assets/2027/svg/block-gear.svg";
import coin from "@/assets/2027/svg/coin.svg";

const formats = [
  {
    icon: braces,
    title: "Charlas",
    desc: "Historias reales de equipos que construyen, operan y aseguran software. Aprendizajes, errores y lo que funcionó.",
  },
  {
    icon: gear,
    title: "Open Spaces",
    desc: "La agenda la arma la comunidad. Propones un tema, se forma un grupo y conversamos sin diapositivas.",
  },
  {
    icon: coin,
    title: "Ignites",
    desc: "Charlas relámpago de 5 minutos con 20 láminas que avanzan solas. Rápidas, intensas y muy entretenidas.",
  },
];

const FormatSection = () => (
  <section aria-labelledby="format-title" className="bg-background py-20">
    <div className="container mx-auto px-4">
      <div className="reveal mx-auto mb-12 max-w-2xl text-center">
        <p className="eyebrow mb-4">El formato DevOpsDays</p>
        <h2 id="format-title" className="mb-4 text-4xl font-extrabold md:text-5xl">
          Cómo se juega
        </h2>
        <p className="text-lg text-muted-foreground">
          Para devs, SRE, platform engineers, seguridad, líderes técnicos y estudiantes. Si te importa cómo se construye
          y opera el software, este es tu mundo.
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {formats.map((f, i) => (
          <li key={f.title} className="reveal toy bg-card p-6">
            <img
              src={f.icon}
              alt=""
              width={64}
              height={64}
              className="bob mb-4"
              style={{ "--delay": `${-i * 1.2}s`, "--tilt": i % 2 ? "4deg" : "-4deg" } as React.CSSProperties}
            />
            <h3 className="mb-2 text-2xl font-extrabold">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default FormatSection;
