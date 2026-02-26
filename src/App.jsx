// App.jsx
import { useState, useEffect, lazy, Suspense, startTransition } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

import "./index.css";

import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { Chatbot } from "./components/Chatbot";
import ErrorBoundary from "./components/ErrorBoundary";
import { MagneticCursor } from "./components/ui/MagneticCursor";

// Lazy load below-the-fold sections for faster LCP
const Projects = lazy(() => import("./components/sections/Projects").then(m => ({ default: m.Projects })));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const Contact = lazy(() => import("./components/sections/Contact").then(m => ({ default: m.Contact })));
const Certifications = lazy(() => import("./components/sections/Certifications"));
const WorkExperience = lazy(() => import("./components/sections/WorkExperience"));
const Education = lazy(() => import("./components/sections/Education"));
const Skills = lazy(() => import("./components/sections/Skills"));
const AboutMe = lazy(() => import("./components/sections/AboutMe"));

// Loading fallback — clear, light-mode spinner
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[200px] bg-transparent">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
      <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
    </div>
  </div>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Passive listener + startTransition for non-urgent scroll state
  useEffect(() => {
    const handleScroll = () => {
      startTransition(() => {
        setShowScrollTop(window.scrollY > 600);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      <MagneticCursor />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Suspense fallback={<SectionLoader />}>
                  <Home />
                  <AboutMe />
                  <Skills />
                  <WorkExperience />
                  <Projects />
                  <Education />
                  <Certifications />
                  <Testimonials />
                  <Contact />
                </Suspense>
              </ErrorBoundary>
            }
          />

          {/* Individual routes for each section */}
          <Route path="/about" element={<Suspense fallback={<SectionLoader />}><AboutMe /></Suspense>} />
          <Route path="/skills" element={<Suspense fallback={<SectionLoader />}><Skills /></Suspense>} />
          <Route path="/experience" element={<Suspense fallback={<SectionLoader />}><WorkExperience /></Suspense>} />
          <Route path="/projects" element={<Suspense fallback={<SectionLoader />}><Projects /></Suspense>} />
          <Route path="/education" element={<Suspense fallback={<SectionLoader />}><Education /></Suspense>} />
          <Route path="/certifications" element={<Suspense fallback={<SectionLoader />}><Certifications /></Suspense>} />
          <Route path="/testimonials" element={<Suspense fallback={<SectionLoader />}><Testimonials /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<SectionLoader />}><Contact /></Suspense>} />
        </Routes>
      </AnimatePresence>

      <Chatbot />

      {/* Elegant scroll-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-base" />
        </button>
      )}

      {/* Subtle Premium Noise Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export default App;