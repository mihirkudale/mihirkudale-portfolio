// src/components/sections/Projects.jsx
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { allProjects, techFilters, techDescriptions } from "../../constants/projects";

// ---- Optional safe fallback for RevealOnScroll ----
// If you already have a RevealOnScroll component elsewhere and it's a *named* export,
// you can keep the import below. If it's a default export in your project,
// change to: `import RevealOnScroll from "../RevealOnScroll";`
let RevealOnScroll;
try {
  // Try named import dynamically to avoid build crashes if export type differs
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  RevealOnScroll = require("../RevealOnScroll")?.RevealOnScroll;
} catch (e) {
  RevealOnScroll = null;
}
// Simple fallback wrapper to prevent runtime errors if the import isn't found or mismatched
const FallbackReveal = ({ children }) => <>{children}</>;

export const Projects = () => {
  const [activeTech, setActiveTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = allProjects.filter((project) => {
    const stack = project.stack ?? [];
    const matchesTech = activeTech === "All" || stack.includes(activeTech);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q);
    return matchesTech && matchesSearch;
  });

  const Wrapper = RevealOnScroll ?? FallbackReveal;

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white"
    >
      <Wrapper>
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-12 tracking-tight">
            Featured Projects
          </h2>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full md:w-2/3">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 text-lg font-bold"
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Tech Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeTech === tech
                    ? "bg-blue-700 text-white border-blue-700 shadow"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-800"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const stack = project.stack ?? [];
              const showLive =
                Boolean(project.demo) &&
                (stack.includes("Power BI") || stack.includes("Tableau"));

              return (
                <div
                  key={`${project.title}-${index}`}
                  className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {stack.map((tech, i) => (
                      <span
                        // key uses local index to avoid duplicate-key warnings when tags repeat across cards
                        key={`${project.title}-tag-${tech}-${i}`}
                        title={techDescriptions?.[tech] ?? tech}
                        className="transition-all transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 hover:text-white bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 py-1 px-3 rounded-full text-xs font-medium ring-1 ring-inset ring-blue-300 dark:ring-blue-700 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 items-center text-blue-700 text-sm font-medium">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                      >
                        <FaGithub className="text-base" />
                        GitHub
                      </a>
                    )}
                    {showLive && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        Live Project
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* GitHub CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://github.com/mihirkudale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-700 dark:text-blue-400 hover:underline text-lg font-medium"
            >
              View all projects on GitHub →
            </a>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};