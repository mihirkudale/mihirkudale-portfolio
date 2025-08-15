// src/components/sections/Testimonials.jsx
import { RevealOnScroll } from "../RevealOnScroll";
import { FaLinkedin, FaQuoteLeft } from "react-icons/fa";

// Minimal, modern, avatar-less cards with initials, gradient accents, and cleaner typography.
const testimonials = [
  {
    name: "Krish Naik",
    role: "Co-founder at iNeuron.ai",
    quote:
      "Mihir has been an exceptional learner and has performed remarkably well in the field of data science. From an implementation perspective, he has developed impressive AI use cases using open-source MLOps tools. I look forward to seeing him excel in this domain. Best of luck!",
    linkedin: "https://www.linkedin.com/in/naikkrish/",
  },
  {
    name: "Harsh Sinha",
    role: "Data Analyst at Amazon",
    quote:
      "I would recommend Mihir in the field of AI, Machine learning and data analytics. He helped me in one of the projects that showed his dedication and knowledge in the field. He would be a valuable employee, possessing strong skills in automation and scripting.",
    linkedin: "https://www.linkedin.com/in/kumarharsh32/",
  },
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-12 tracking-tight">
            Testimonials
          </h2>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-blue-100/60 dark:border-blue-800/50 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                aria-label={`Testimonial by ${t.name}`}
              >
                {/* Gradient accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

                <div className="p-6">
                  {/* Subtle background quote icon */}
                  <FaQuoteLeft
                    aria-hidden="true"
                    className="absolute -right-3 -top-1 text-6xl opacity-10 dark:opacity-15 pointer-events-none"
                  />

                  <header className="mb-4 flex items-center gap-4">
                    {/* Initials circle replaces avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold shadow-sm">
                      {getInitials(t.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-lg text-gray-900 dark:text-white">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t.role}
                      </p>
                    </div>

                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full p-2 text-blue-600 transition-transform duration-200 hover:scale-110 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/60 dark:text-blue-300 dark:hover:text-blue-200"
                        title="View LinkedIn Profile"
                        aria-label={`Open ${t.name}'s LinkedIn profile`}
                      >
                        <FaLinkedin className="text-xl" />
                      </a>
                    )}
                  </header>

                  <p className="text-base leading-relaxed text-gray-800 dark:text-gray-300 italic">
                    “{t.quote}”
                  </p>
                </div>

                {/* Subtle gradient glow on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-20 bg-gradient-to-br from-blue-500/0 via-indigo-500/5 to-purple-500/0 blur-2xl" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default Testimonials;
