// src/components/sections/Projects.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { allProjects, techFilters, techDescriptions } from "../../constants/projects";

const MAX_VISIBLE_TAGS = 4;
const DEMO_SUPPORTED_TECHS = ["Power BI", "Tableau"];

const FallbackReveal = ({ children }) => <>{children}</>;
FallbackReveal.propTypes = { children: PropTypes.node.isRequired };

export const Projects = () => {
  const [activeTech, setActiveTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = allProjects.filter((project) => {
    const stack = project.stack ?? [];
    const matchesTech = activeTech === "All" || stack.includes(activeTech);
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query);
    return matchesTech && matchesSearch;
  });

  const shouldShowLiveDemo = (stack, demoUrl) =>
    Boolean(demoUrl) && stack.some((tech) => DEMO_SUPPORTED_TECHS.includes(tech));

  return (
    <section
      id="projects"
      className="relative py-28 bg-white text-slate-900 overflow-hidden"
    >
      {/* Soft Light Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-50 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-slate-100 blur-[100px] pointer-events-none"
      />

      <FallbackReveal>
        <div className="mx-auto w-full px-5 sm:px-6 lg:px-8 max-w-screen-xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <p className="text-sm font-bold text-blue-600 tracking-widest uppercase">
              Portfolio
            </p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Projects
            </h2>
          </div>

          {/* Search Bar */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full md:w-[600px] group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 shadow-sm transition-all duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 font-bold transition-all"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Tech Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border-2 ${activeTech === tech
                    ? "bg-blue-600 text-white border-blue-600 shadow-[0_8px_16px_rgba(37,99,235,0.25)] -translate-y-0.5"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-700 hover:bg-blue-50"
                  }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-center font-medium text-slate-500 mb-10">
            Showing <span className="text-slate-900 font-bold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? "s" : ""}
            {activeTech !== "All" && ` matching `}<span className="text-blue-600">{activeTech !== "All" ? activeTech : ""}</span>
          </p>

          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const stack = project.stack ?? [];
              const showLive = shouldShowLiveDemo(stack, project.demo);

              return (
                <div
                  key={`${project.title}-${index}`}
                  className="group relative glass-card gradient-border flex flex-col overflow-hidden bg-slate-50/50 hover:bg-white"
                >
                  {/* Colorful subtle top bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Card body */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-extrabold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-base font-medium text-slate-600 mb-6 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {stack.slice(0, MAX_VISIBLE_TAGS).map((tech, i) => (
                        <span
                          key={`${project.title}-tag-${tech}-${i}`}
                          title={techDescriptions?.[tech] ?? tech}
                          className="bg-blue-50 text-blue-700 border border-blue-100 py-1 px-3 rounded-lg text-xs font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                      {stack.length > MAX_VISIBLE_TAGS && (
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 py-1 px-2.5 rounded-lg border border-slate-200">
                          +{stack.length - MAX_VISIBLE_TAGS} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-5 items-center text-sm font-bold mt-auto pt-5 border-t-2 border-slate-100">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          <FaGithub className="text-lg" />
                          View Code
                        </a>
                      )}
                      {showLive && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <FaExternalLinkAlt className="text-sm" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GitHub CTA */}
          <div className="mt-16 text-center">
            <a
              href="https://github.com/mihirkudale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-700 bg-white hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 hover:shadow-md transition-all duration-300 font-bold text-base group"
            >
              <FaGithub className="text-xl" />
              View all projects on GitHub
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </FallbackReveal>
    </section>
  );
};