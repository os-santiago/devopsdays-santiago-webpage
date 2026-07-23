import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgendaPage from "./pages/AgendaPage";
import ContactPage from "./pages/ContactPage";
import SponsorshipPage from "./pages/SponsorshipPage";
import SpeakersPage from "./pages/SpeakersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/patrocinio" element={<SponsorshipPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
