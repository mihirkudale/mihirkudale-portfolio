// App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import "./App.css";
import "./index.css";

import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { Projects } from "./components/sections/Projects";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import Certifications from "./components/sections/Certifications";
import WorkExperience from "./components/sections/WorkExperience";
import Education from "./components/sections/Education";
import Skills from "./components/sections/Skills";
import AboutMe from "./components/sections/AboutMe";
import { Chatbot } from "./components/Chatbot";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
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
            <>
              <Home />
              <AboutMe />
              <Skills />
              <WorkExperience />
              <Projects />
              <Education />
              <Certifications />
              <Testimonials />
              <Contact />
            </>
          }
        />

        {/* Individual routes for each section */}
        <Route path="/about" element={<AboutMe />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<WorkExperience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
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