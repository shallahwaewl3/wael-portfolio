import dynamic from "next/dynamic";
import Hero from "./components/Hero/Hero";
import TechStrip from "./components/TechStrip/TechStrip";
import Services from "./components/Services/Services";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";

const Courses = dynamic(() => import("./components/Courses/Courses"));
const Projects = dynamic(() => import("./components/Projects/Projects"));
const Contact = dynamic(() => import("./components/Contact/Contact"));
const Footer = dynamic(() => import("./components/Footer/Footer"));

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      {/* 1. HERO SECTION */}
      <div className="hero-page-section">
        <Hero />
      </div>

      <div className="about-services-stack">
        {/* 2. TECH STRIP (Continuous Repeating Staggered Reveal on Enter & Exit) */}
        <div className="tech-section">
          <TechStrip />
        </div>

        {/* 3. SERVICES (Smooth Fade-up) */}
        <ScrollReveal animation="fade-up" className="page-section">
          <Services />
        </ScrollReveal>
      </div>

      {/* 4. COURSES (Scale-in) */}
      <ScrollReveal animation="scale-in" className="page-section">
        <Courses />
      </ScrollReveal>

      {/* 5. PROJECTS (Directional / Slide-left entrance) */}
      <ScrollReveal animation="slide-left" className="page-section">
        <Projects />
      </ScrollReveal>

      {/* 6. CONTACT (Pop / Focus entrance) */}
      <ScrollReveal animation="pop" className="page-section">
        <Contact />
      </ScrollReveal>

      {/* 7. FOOTER */}
      <ScrollReveal animation="fade-up" delay={100} className="footer-page-section">
        <Footer />
      </ScrollReveal>
    </main>
  );
}
