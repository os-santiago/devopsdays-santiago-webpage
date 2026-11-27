import { Lock } from "lucide-react";
import NotifyDialog from "@/components/NotifyDialog";
import mascot480 from "@/assets/2027/mascot-480.webp";

const LockedLevel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="reveal toy mx-auto flex max-w-3xl flex-col items-center gap-8 bg-card p-8 text-center md:flex-row md:text-left">
    <img src={mascot480} alt="" width={480} height={541} className="bob w-40 shrink-0 md:w-44" />
    <div>
      <p className="eyebrow mb-3">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Nivel bloqueado
      </p>
      <h2 className="mb-3 text-3xl font-extrabold">{title}</h2>
      <p className="mb-6 text-muted-foreground">{children}</p>
      <NotifyDialog className="btn-block btn-coin">🔔 Avísame cuando se desbloquee</NotifyDialog>
    </div>
  </div>
);

export default LockedLevel;
