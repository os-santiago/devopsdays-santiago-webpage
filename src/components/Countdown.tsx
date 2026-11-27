import { useEffect, useState } from "react";
import { event2027 } from "@/data/event";

const MINUTE = 60_000;

export const timeLeft = (target: number, now: number) => {
  const minutes = Math.max(0, Math.floor((target - now) / MINUTE));
  return { days: Math.floor(minutes / 1440), hours: Math.floor((minutes % 1440) / 60), minutes: minutes % 60 };
};

const Countdown = ({ target = event2027.startsAt }: { target?: string }) => {
  const targetMs = new Date(target).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), MINUTE);
    return () => clearInterval(id);
  }, []);

  const started = now >= targetMs;
  const { days, hours, minutes } = timeLeft(targetMs, now);
  const cells = [
    { label: "Días", value: days },
    { label: "Horas", value: hours },
    { label: "Min", value: minutes },
  ];

  return (
    <section aria-label="Tiempo restante para el evento" className="bg-secondary py-10 text-secondary-foreground">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 md:flex-row md:justify-between">
        <p className="font-display text-2xl font-extrabold uppercase tracking-wider">
          {started ? "¡Estamos jugando! 🎮" : "⏱ Tiempo restante"}
        </p>
        {!started && (
          <ol className="flex gap-3 sm:gap-4">
            {cells.map((cell) => (
              <li key={cell.label} className="toy min-w-[5.5rem] bg-land-coin px-4 py-3 text-center text-land-navy">
                <span className="block font-display text-4xl font-extrabold tabular-nums leading-none sm:text-5xl">
                  {String(cell.value).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-widest">{cell.label}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default Countdown;
