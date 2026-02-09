// App.jsx
import { useState, useEffect, lazy, Suspense, startTransition } from "react";
import { Routes, Route } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import "./App.css";
import "./index.css";

import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { Chatbot } from "./components/Chatbot";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load below-the-fold sections for faster LCP (2026 optimization)
// Components with named exports use .then() to convert to default
const Projects = lazy(() => import("./components/sections/Projects").then(m => ({ default: m.Projects })));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const Contact = lazy(() => import("./components/sections/Contact").then(m => ({ default: m.Contact })));
const Certifications = lazy(() => import("./components/sections/Certifications"));
const WorkExperience = lazy(() => import("./components/sections/WorkExperience"));
const Education = lazy(() => import("./components/sections/Education"));
const Skills = lazy(() => import("./components/sections/Skills"));
const AboutMe = lazy(() => import("./components/sections/AboutMe"));

// Loading fallback component - extracted outside App to prevent re-creation (React Compiler optimization)
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 2026 optimization: Passive listener + startTransition for non-urgent scroll state
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
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Routes>
        {/* Home page (you can keep sections here if you want a long landing page) */}
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

      <Chatbot />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </div>
  );
}

export default App;