import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { LuBriefcase, LuMapPin, LuBuilding2 } from "react-icons/lu";

// TIP: keep locations consistent (e.g., "Bengaluru" everywhere or "Bangalore" everywhere)
const experiences = [
  {
    company: "Integrated Consultancy Services",
    location: "Pune, India",
    roles: [
      { role: "Software Developer", start: "2024-08", end: null, display: "Aug 2024 – Present" },
      { role: "Software Developer Intern", start: "2024-02", end: "2024-07", display: "Feb 2024 – Jul 2024" },
    ],
  },
  {
    company: "Amazon",
    location: "Bengaluru, India",
    roles: [{ role: "Data Analyst", start: "2023-08", end: "2024-01", display: "Aug 2023 – Jan 2024" }],
  },
  {
    company: "iNeuron",
    location: "Bengaluru, India",
    roles: [{ role: "Data Scientist Intern", start: "2022-11", end: "2023-02", display: "Nov 2022 – Feb 2023" }],
  },
  {
    company: "The Sparks Foundation",
    location: "Singapore (Remote)",
    roles: [
      { role: "Data Science & Business Analytics Intern", start: "2021-10", end: "2021-11", display: "Oct 2021 – Nov 2021" },
    ],
  },
  {
    company: "LetsGrowMore",
    location: "Pune, India",
    roles: [{ role: "Data Science Intern", start: "2021-09", end: "2021-10", display: "Sep 2021 – Oct 2021" }],
  },
  {
    company: "KPMG Data Analytics Consulting (Virtual Internship)",
    location: "Pune, India",
    roles: [{ role: "Data Analyst Intern", start: "2021-09", end: "2021-10", display: "Sep 2021 – Oct 2021" }],
  },
  // Keep these if you want a longer timeline:
  {
    company: "SMC Infrastructures Pvt Ltd",
    location: "Mumbai, India",
    roles: [{ role: "Project Coordinator", start: "2018-04", end: "2019-03", display: "2018 – 2019" }],
  },
  {
    company: "Destylio Communication and Design LLP",
    location: "Pune, India",
    roles: [{ role: "Data Analyst", start: "2017-10", end: "2018-03", display: "2017 – 2018" }],
  },
  {
    company: "P.M Kudale & Associates",
    location: "Pune, India",
    roles: [{ role: "Project Co-ordinator", start: "2015-04", end: "2017-07", display: "2015 – 2017" }],
  },
];

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

          {/* Timeline container */}
          <ol className="relative border-s-2 border-blue-100/70 dark:border-white/10 ps-6 space-y-10">
            {experiences.map((exp) => (
              <li key={exp.company} className="group">
                {/* Node dot */}
                <span
                  aria-hidden="true"
                  className="absolute -start-[7px] mt-2 h-3 w-3 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 ring-4 ring-white dark:ring-gray-900"
                />

                <article className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-white/10 rounded-xl shadow-lg p-6 motion-safe:transition motion-safe:hover:shadow-xl">
                  <header className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 dark:bg-cyan-900/30 text-blue-700 dark:text-cyan-200">
                      <LuBuilding2 aria-hidden className="h-4 w-4" />
                    </span>
                    <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {exp.company}
                    </h3>
                    <div className="ms-auto flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                      <LuMapPin aria-hidden className="h-4 w-4" />
                      <span className="italic">{exp.location}</span>
                    </div>
                  </header>

                  <div className="mt-4 space-y-4">
                    {exp.roles.map((r) => (
                      <div key={`${exp.company}-${r.role}-${r.start}`} className="ps-3 border-s-4 border-blue-600/70 dark:border-blue-400/70">
                        <p className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white">
                          <LuBriefcase aria-hidden className="h-4 w-4" />
                          <span>{r.role}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          <time dateTime={r.start}>{r.display.split("–")[0].trim()}</time>
                          {" – "}
                          {r.end ? <time dateTime={r.end}>{r.display.split("–")[1].trim()}</time> : <span>Present</span>}
                        </p>
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