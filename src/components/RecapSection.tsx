import { Youtube } from "@/components/BrandIcons";
import { event2027 } from "@/data/event";

const RecapSection = () => (
  <section aria-labelledby="recap-title" className="bg-secondary py-20 text-secondary-foreground">
    <div className="container mx-auto px-4">
      <div className="reveal mx-auto mb-10 max-w-2xl text-center">
        <p className="eyebrow mb-4 bg-land-coin text-land-navy">Repetición</p>
        <h2 id="recap-title" className="mb-4 text-4xl font-extrabold md:text-5xl">
          Revive la Misión 2026
        </h2>
        <p className="text-lg text-white/85">
          Charlas, comunidad y mucha energía. Mira cómo se vivió la edición anterior.
        </p>
      </div>

      <div className="reveal mx-auto max-w-4xl overflow-hidden rounded-[1.25rem] border-[3px] border-white shadow-[0_6px_0_white]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${event2027.recapVideoId}`}
          title="Video resumen DevOpsDays Santiago 2026"
          loading="lazy"
          allow="accelerometer; encrypted-media; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="block aspect-video w-full border-0 bg-black"
        />
      </div>

      <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a href={event2027.youtubeChannel} target="_blank" rel="noopener noreferrer" className="btn-block btn-coin">
          <Youtube size={20} />
          Ver más videos en YouTube
        </a>
        <a href="/2026/" className="font-bold underline underline-offset-4 hover:text-land-coin">
          Visita el sitio 2026
        </a>
      </div>
    </div>
  </section>
);

export default RecapSection;
