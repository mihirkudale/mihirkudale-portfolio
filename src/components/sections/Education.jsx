import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { educationList } from "../../constants/education";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto w-full space-y-12">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Education
          </h2>

          <div className="flex flex-col gap-6">
            {educationList.map((edu, index) => (
              <div
                key={index}
                className="w-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-2xl shadow-lg p-8 hover:scale-[1.01] transition-all duration-200"
              >
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">
                  {edu.degree}
                </h3>
                <p className="text-md text-gray-900 dark:text-white mb-1">
                  {edu.institution}
                  {edu.university && (
                    <>
                      <br />
                      <span className="text-sm text-gray-700 dark:text-gray-300 italic">
                        {edu.university}
                      </span>
                    </>
                  )}
                  <span className="block text-sm text-gray-600 dark:text-gray-400 italic">
                    {edu.location}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {edu.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default Education;