import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import mascot from "@/assets/2027/mascot-480.webp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-land-sky px-4">
      <div className="toy max-w-lg bg-card p-8 text-center">
        <img src={mascot} alt="" width={480} height={541} className="bob mx-auto mb-4 w-40" />
        <h1 className="mb-2 font-display text-6xl font-extrabold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">¡Ups! Te caíste del mapa.</p>
        <Link to="/" className="btn-block">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
