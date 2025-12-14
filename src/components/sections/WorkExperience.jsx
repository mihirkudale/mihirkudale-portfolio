import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { LuBriefcase, LuMapPin, LuBuilding2 } from "react-icons/lu";
import { experiences } from "../../constants";

const WorkExperience = () => {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          <h2
            id="experience-heading"
            className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-14 tracking-tight"
          >
            Work Experience
          </h2>

          <ol className="relative border-s-2 border-blue-100/70 dark:border-white/10 ps-6 space-y-12">
            {experiences.map((exp, index) => (
              <li key={index} className="group relative">
                {/* Timeline Dot */}
                <span
                  aria-hidden="true"
                  className="absolute -start-[9px] top-6 h-4 w-4 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 ring-4 ring-white dark:ring-gray-900 shadow-[0_0_10px_rgba(37,99,235,0.4)] z-10"
                />

                <article className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-blue-100 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 md:p-8">
                  <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <LuBuilding2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                          {exp.company}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <LuMapPin className="h-3.5 w-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="space-y-6">
                    {exp.roles.map((role, rIndex) => (
                      <div key={rIndex} className={`relative ${rIndex !== exp.roles.length - 1 ? "pb-6 border-b border-gray-100 dark:border-gray-800" : ""}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                            <LuBriefcase className="h-4.5 w-4.5 opacity-80" />
                            {role.role}
                          </h4>
                          <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            {role.display}
                          </span>
                        </div>

                        {/* Tech Stack Chips */}
                        {role.tech && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {role.tech.map((tech, tIndex) => (
                              <span
                                key={tIndex}
                                className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-200 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default WorkExperience;
