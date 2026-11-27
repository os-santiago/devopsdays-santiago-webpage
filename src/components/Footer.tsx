import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { Instagram, Linkedin, Youtube } from "@/components/BrandIcons";
import { event2027 } from "@/data/event";
import logoLand from "@/assets/2027/logo-land-640.webp";

const socialLinks = [
  { icon: Linkedin, href: event2027.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: event2027.instagram, label: "Instagram" },
  { icon: Youtube, href: event2027.youtubeChannel, label: "YouTube" },
  { icon: Globe, href: "https://devopsdayschile.cl", label: "Website" },
];

const navLinks = [
  { label: "Inicio", path: "/" },
  { label: "Agenda", path: "/agenda" },
  { label: "Speakers", path: "/speakers" },
  { label: "Patrocinio", path: "/patrocinio" },
  { label: "Contacto", path: "/contacto" },
  { label: "Código de conducta", path: "/codigo-de-conducta" },
];

const Footer = () => (
  <footer className="relative mt-8 bg-secondary text-secondary-foreground">
    <div aria-hidden="true" className="grass-edge absolute inset-x-0 -top-[27px]" />
    <div aria-hidden="true" className="h-3 bg-land-grass" />
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logoLand} alt="DevOpsDays Land 2027" width={640} height={377} className="mb-4 w-56" loading="lazy" />
          <p className="max-w-md text-sm text-white/80">
            DevOpsDays es una experiencia única que combina aprendizaje, innovación y conexión en torno a la cultura
            DevOps. {event2027.date} · {event2027.venue}.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-bold">Navegación</h4>
          <ul className="space-y-2">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-sm text-white/80 transition-colors hover:text-land-coin">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/2026/" className="text-sm text-white/80 transition-colors hover:text-land-coin">
                Ediciones anteriores: 2026
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-bold">Redes Sociales</h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-white/30 text-white transition-all hover:-translate-y-0.5 hover:border-land-coin hover:text-land-coin"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/15 pt-6 text-center text-sm text-white/70">
        © 2027 DevOpsDays Santiago. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
