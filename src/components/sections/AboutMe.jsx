import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";

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
              About Me
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              I'm <span className="font-semibold text-[#706eff] dark:text-[#22d3ee]">Mihir Kudale</span>, a Pune-based <span className="font-medium">Software Developer</span> with a strong focus on <span className="font-medium">Data Analytics, Data Science, and AI Engineering</span>. I specialize in building scalable analytics platforms, automating BI workflows, and developing intelligent applications that transform raw data into actionable business intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-[#706eff] dark:text-[#22d3ee]">What I Do</h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                With hands-on experience in Python, SQL, Power BI, Tableau, and cloud platforms like AWS and Azure, I bring a full-stack approach to the data lifecycle—from ETL pipelines and big data processing to real-time dashboards and machine learning solutions. I’ve worked across diverse domains, including e-commerce and enterprise software.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-[#706eff] dark:text-[#22d3ee]">Credentials & Experience</h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Former <span className="font-medium">Amazon Data Analyst</span> and <span className="font-medium">3× Microsoft Certified</span> professional. I’ve helped teams unlock business value at scale through advanced analytics, clean code, and collaborative data storytelling.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-[#706eff] dark:text-[#22d3ee]">Outside the Code</h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Before diving into software development and the data field, I began my career as an Engineering Project Manager and Project Coordinator Trainee, where I learned the value of planning, collaboration, and delivery. Today, I enjoy mentoring junior developers, contributing to open-source data tools, and exploring the intersection of AI and human-centered design—always blending precision with purpose.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default AboutMe;
