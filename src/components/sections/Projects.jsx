// src/components/sections/Projects.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { allProjects, techFilters, techDescriptions } from "../../constants/projects";

/** Maximum number of tech tags to display before showing "+N more" */
const MAX_VISIBLE_TAGS = 4;

/** Tech categories that support live demo links */
const DEMO_SUPPORTED_TECHS = ["Power BI", "Tableau"];

/**
 * Fallback wrapper component when RevealOnScroll is not available.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to render
 * @returns {React.ReactElement} Wrapped children
 */
const FallbackReveal = ({ children }) => <>{children}</>;

FallbackReveal.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Projects section component displaying filterable project cards.
 * Supports filtering by technology and search query.
 * @returns {React.ReactElement} Projects section
 */
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

  /**
   * Checks if a project supports live demo based on its tech stack.
   * @param {string[]} stack - Project's technology stack
   * @param {string} demoUrl - Demo URL if available
   * @returns {boolean} Whether to show live demo link
   */
  const shouldShowLiveDemo = (stack, demoUrl) => {
    return Boolean(demoUrl) && stack.some((tech) => DEMO_SUPPORTED_TECHS.includes(tech));
  };

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white"
    >
      <FallbackReveal>
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeTech === tech
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
              const showLive = shouldShowLiveDemo(stack, project.demo);

              return (
                <div
                  key={`${project.title}-${index}`}
                  className="group bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {stack.slice(0, MAX_VISIBLE_TAGS).map((tech, i) => (
                        <span
                          key={`${project.title}-tag-${tech}-${i}`}
                          title={techDescriptions?.[tech] ?? tech}
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 py-0.5 px-2 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {stack.length > MAX_VISIBLE_TAGS && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 py-0.5">
                          +{stack.length - MAX_VISIBLE_TAGS}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 items-center text-sm font-medium">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                        >
                          <FaGithub className="text-base" />
                          Code
                        </a>
                      )}
                      {showLive && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <FaExternalLinkAlt className="text-xs" />
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
      </FallbackReveal>
    </section>
  );
};