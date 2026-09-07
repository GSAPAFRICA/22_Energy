import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { About } from "@/components/sections/About";
import { Solutions } from "@/components/sections/Solutions";
import { Pricing } from "@/components/sections/Pricing";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { QuoteModalProvider } from "@/components/forms/QuoteModalContext";
import { QuoteModal } from "@/components/forms/QuoteModal";

export default function Home() {
  return (
    <QuoteModalProvider>
      <Navbar />
      <main>
        <Hero />
        <ValueStrip />
        <About />
        <Solutions />
        <Pricing />
        <WhyUs />
        <HowItWorks />
        <Projects />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <QuoteModal />
    </QuoteModalProvider>
  );
}
