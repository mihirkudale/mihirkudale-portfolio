import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { aboutMeData } from "../../constants/aboutme";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="relative py-28 px-6 bg-white text-slate-900 overflow-hidden"
    >
      {/* Subtle background blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-100 blur-[100px] pointer-events-none"
      />

      <RevealOnScroll>
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          {/* Heading */}
          <div className="text-center space-y-4">
            <p className="text-sm font-bold text-blue-600 tracking-widest uppercase">
              Get to know me
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {aboutMeData.heading}
            </h2>

            <p className="text-lg md:text-xl leading-[1.85] text-slate-600 max-w-3xl mx-auto font-medium">
              I'm{" "}
              <span className="font-bold text-blue-600 animated-underline cursor-default">
                {aboutMeData.intro.name}
              </span>
              , a {aboutMeData.intro.location}{" "}
              <span className="font-bold text-slate-900 animated-underline cursor-default">
                {aboutMeData.intro.title}
              </span>{" "}
              with a strong focus on{" "}
              <span className="font-bold text-violet-600 animated-underline cursor-default">
                {aboutMeData.intro.focus}
              </span>
              . {aboutMeData.intro.description}
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {aboutMeData.sections.map((section, index) => (
              <div
                key={index}
                className="glass-card p-8 space-y-4 border border-slate-100 bg-slate-50/50 group"
              >
                {/* Accent bar */}
                <div className="h-1 w-12 rounded-full bg-blue-600 mb-2 group-hover:w-20 transition-all duration-500" />
                <h3 className="text-2xl font-bold text-slate-900">
                  {section.title}
                </h3>
                <p className="text-base leading-[1.8] text-slate-600 font-medium">
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