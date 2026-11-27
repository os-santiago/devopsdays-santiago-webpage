import { Ticket } from "lucide-react";
import NotifyDialog from "@/components/NotifyDialog";
import { event2027, type Status } from "@/data/event";

/** The one ticket call-to-action, driven by `event2027.tickets`. */
const TicketCta = ({
  status = event2027.tickets,
  compact = false,
}: {
  status?: Status;
  compact?: boolean;
}) => {
  const size = compact ? "btn-block btn-sm" : "btn-block";

  if (status === "open") {
    return (
      <a href={event2027.ticketsApplyUrl} target="_blank" rel="noopener noreferrer" className={size}>
        <Ticket className="h-5 w-5" aria-hidden="true" />
        {compact ? "Postular · Gratis" : "Postular a mi entrada"}
      </a>
    );
  }

  if (status === "closed") {
    return (
      <button type="button" disabled className={size}>
        Postulaciones cerradas
      </button>
    );
  }

  return compact ? <NotifyDialog className={size}>Avísame · Entrada gratis</NotifyDialog> : <NotifyDialog className={size} />;
};

export default TicketCta;
