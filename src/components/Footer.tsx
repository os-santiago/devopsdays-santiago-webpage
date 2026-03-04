import { Link } from "react-router-dom";
import { Linkedin, Instagram, Youtube, Globe } from "lucide-react";
import logo from "@/assets/logo-devopsdays.png";

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
