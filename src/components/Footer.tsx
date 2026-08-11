import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import logo from "@/assets/logo-devopsdays.png";

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.5 8.5h-4v13h4v-13Zm.3-4a2.3 2.3 0 1 0-4.6 0 2.3 2.3 0 0 0 4.6 0ZM21.8 14.1c0-3.9-2.1-5.8-4.9-5.8-2.3 0-3.3 1.3-3.8 2.1V8.5h-4v13h4v-6.4c0-1.7.3-3.4 2.5-3.4 2.2 0 2.2 2 2.2 3.5v6.3h4v-7.4Z" />
  </svg>
);

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Youtube = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/devopsdayschile", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/devopsdayssantiago", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@DevOpsDaysSantiago", label: "YouTube" },
  { icon: Globe, href: "https://devopsdayschile.cl", label: "Website" },
];

const Footer = () => (
  <footer className="bg-secondary border-t border-border">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="DevOpsDays Santiago" className="h-12 w-12 rounded-full" />
            <div>
              <h3 className="font-bold text-lg text-foreground">DevOpsDays Santiago</h3>
              <p className="text-sm text-muted-foreground">2026 — Misión Espacial DevOps</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm max-w-md">
            DevOpsDays es una experiencia única que combina aprendizaje, innovación y conexión en torno a la cultura DevOps.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Navegación</h4>
          <ul className="space-y-2">
            {[
              { label: "Inicio", path: "/" },
              { label: "Agenda", path: "/agenda" },
              { label: "Patrocinio", path: "/patrocinio" },
              { label: "Contacto", path: "/contacto" },
            ].map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Redes Sociales</h4>
          <div className="flex gap-3 flex-wrap">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
        © 2026 DevOpsDays Santiago. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
