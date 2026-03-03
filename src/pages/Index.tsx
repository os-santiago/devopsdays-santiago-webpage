import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventInfoSection from "@/components/EventInfoSection";
import CFPSection from "@/components/CFPSection";
import TicketsSection from "@/components/TicketsSection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <EventInfoSection />
    <CFPSection />
    <TicketsSection />
    <SponsorsSection />
    <Footer />
  </div>
);

export default Index;
