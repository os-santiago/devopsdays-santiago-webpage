import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Lock, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TicketCta from "@/components/TicketCta";
import { agendaItems, speakers } from "@/data/event";
import badge from "@/assets/2027/badge-128.webp";
import mascot from "@/assets/2027/mascot-480.webp";

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Agenda", path: "/agenda", locked: agendaItems.length === 0 },
  { label: "Speakers", path: "/speakers", locked: speakers.length === 0 },
  { label: "Patrocinio", path: "/patrocinio" },
  { label: "Contacto", path: "/contacto" },
  { label: "Código de conducta", path: "/codigo-de-conducta" },
];

const linkClass = (active: boolean) =>
  `inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
    active ? "bg-primary text-primary-foreground" : "text-land-navy hover:bg-muted"
  }`;

const NavItem = ({ item, active, onClick }: { item: (typeof navItems)[number]; active: boolean; onClick?: () => void }) => (
  <Link to={item.path} onClick={onClick} className={linkClass(active)} title={item.locked ? "Pronto" : undefined}>
    {item.label}
    {item.locked && <Lock className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b-[3px] border-land-navy bg-white/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={badge} alt="DevOpsDays Santiago 2027" width={40} height={40} className="h-10 w-10" />
          <span className="hidden font-display text-xl font-extrabold text-land-navy sm:block">
            DevOpsDays <span className="text-land-red">Land</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} active={location.pathname === item.path} />
          ))}
          <div className="ml-3">
            <TicketCta compact />
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-land-navy xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Level progress: a CSS scroll-driven bar with the mascot walking along it (hidden where unsupported). */}
      <div aria-hidden="true" className="level-progress absolute inset-x-0 -bottom-[3px] h-[5px]">
        <div className="level-progress__fill h-full bg-land-coin" />
        <img src={mascot} alt="" width={22} height={25} className="level-progress__marker absolute -top-[22px] w-[22px]" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t-2 border-land-navy/10 bg-white xl:hidden"
          >
            <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  active={location.pathname === item.path}
                  onClick={() => setIsOpen(false)}
                />
              ))}
              <div className="pt-2">
                <TicketCta compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
