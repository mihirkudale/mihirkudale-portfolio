import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";

const experiences = [
  {
    company: "Integrated Consultancy Services",
    location: "Pune, India",
    roles: [
      {
        role: "Software Developer",
        duration: "Aug 2024 – Present",
      },
      {
        role: "Software Developer Intern",
        duration: "Feb 2024 – Jul 2024",
      },
    ],
  },
  {
    company: "Amazon",
    location: "Bangalore, India",
    roles: [
      {
        role: "Data Analyst",
        duration: "Aug 2023 – Jan 2024",
      },
    ],
  },
   {
    company: "iNeuron",
    location: "Bangalore, India",
    roles: [
      {
        role: "Data Scientist Intern",
        duration: "Nov 2022 – Feb 2023",
      },
    ],
  },
   {
    company: "The Sparks Foundation",
    location: "Singapore (Remote from Pune, India)",
    roles: [
      {
        role: "Data Science & Business Analytics Intern",
        duration: "Oct 2021 – Nov 2021",
      },
    ],
  },
  {
    company: "LetsGrowMore",
    location: "Pune, India",
    roles: [
      {
        role: "Data Science Intern",
        duration: "Sep 2021 – Oct 2021",
      },
    ],
  },
  {
    company: "KPMG Data Analytics Consualting Virtual Internship",
    location: "Pune, India",
    roles: [
      {
        role: "Data Analyst Intern",
        duration: "Sep 2021 – Oct 2021",
      },
    ],
  },
  {
    company: "SMC Infrastructures Pvt Ltd",
    location: "Mumbai, India",
    roles: [
      {
        role: "Engineering Project Co-ordinator Trainee",
        duration: "Apr 2018 – Mar 2019",
      },
    ],
  },
  {
    company: "P.M Kudale & Associates",
    location: "Pune, India",
    roles: [
      {
        role: "Engineering Project Manager (Self Employed)",
        duration: "Apr 2015 – July 2017",
      },
    ],
  },
];

const WorkExperience = () => {
  return (
    <section
      id="experience"
      className="py-24 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-14 tracking-tight">
            Work Experience
          </h2>

          <div className="flex flex-col gap-10">
            {experiences.map((exp, index) => (  
              <div
                key={index}
                className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-xl shadow-lg p-8 w-full md:w-[100%] lg:w-[100%] mx-auto hover:scale-[1.01] transition-all"
              >
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 italic mb-4">
                  {exp.location}
                </p>

                <div className="space-y-4">
                  {exp.roles.map((role, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-blue-600 dark:border-blue-400 pl-4"
                    >
                      <p className="text-md font-medium text-gray-900 dark:text-white">
                        {role.role}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        {role.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default WorkExperience;
