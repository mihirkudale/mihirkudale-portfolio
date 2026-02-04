import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { aboutMeData } from "../../constants/aboutme";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#706eff] mb-12 tracking-tight">
              {aboutMeData.heading}
            </h2>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              I'm{" "}
              <span className="font-semibold text-[#706eff] dark:text-[#22d3ee]">
                {aboutMeData.intro.name}
              </span>
              , a {aboutMeData.intro.location}{" "}
              <span className="font-medium">
                {aboutMeData.intro.title}
              </span>{" "}
              with a strong focus on{" "}
              <span className="font-medium">
                {aboutMeData.intro.focus}
              </span>
              . {aboutMeData.intro.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            {aboutMeData.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-2xl font-semibold text-[#706eff] dark:text-[#22d3ee]">
                  {section.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default AboutMe;