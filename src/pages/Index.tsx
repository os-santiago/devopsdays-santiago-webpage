import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Countdown from "@/components/Countdown";
import EventInfoSection from "@/components/EventInfoSection";
import RecapSection from "@/components/RecapSection";
import FormatSection from "@/components/FormatSection";
import TicketsSection from "@/components/TicketsSection";
import CFPSection from "@/components/CFPSection";
import SponsorsSection from "@/components/SponsorsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <HeroSection />
      <Countdown />
      <EventInfoSection />
      <RecapSection />
      <FormatSection />
      <TicketsSection />
      <CFPSection />
      <SponsorsSection />
      <FaqSection />
    </main>
    <Footer />
  </div>
);

export default Index;
