import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { BsPatchCheckFill } from "react-icons/bs";
import { certifications } from "../../constants/certifications";

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="scroll-mt-24 py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white flex items-center justify-center"
    >
      <RevealOnScroll>
        <div className="max-w-6xl w-full px-6">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-12 tracking-tight">
            Certifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${cert.title} by ${cert.issuer}`}
                className="flex items-center gap-5 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-xl p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={cert.img}
                  alt={`${cert.issuer} logo`}
                  className="w-14 h-14 object-contain bg-white dark:bg-gray-800 rounded-full p-1 shadow"
                  loading="lazy"
                />
                <div>
                  <p className="text-base font-semibold text-blue-700 dark:text-blue-400">
                    {cert.title}
                  </p>
                  <p className="text-xs mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white rounded-full">
                    <BsPatchCheckFill className="text-blue-600 dark:text-blue-300 text-sm" />
                    {cert.issuer}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default Certifications;