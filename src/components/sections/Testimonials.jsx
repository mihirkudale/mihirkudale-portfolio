import { RevealOnScroll } from "../RevealOnScroll";
import { FaLinkedin } from "react-icons/fa";

const testimonials = [
  {
    name: "Krish Naik",
    role: "Co-founder at iNeuron.ai",
    // isMentor: true,
    quote:
      "Mihir has been an exceptional learner and has performed remarkably well in the field of data science. From an implementation perspective, he has developed impressive AI use cases using open-source MLOps tools. I look forward to seeing him excel in this domain. Best of luck!",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFkECuBlXDr5A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1683913490740?e=1753920000&v=beta&t=qQ-f5j7JnW8X6cq4RgZ9fHuW1346Nxj49dodo6PCI8w",
    linkedin: "https://www.linkedin.com/in/naikkrish/"
  },
  {
    name: "Harsh Sinha",
    role: "Data Analyst at Amazon",
    quote:
      "I would recommend Mihir in the field of AI, Machine learning and data analytics. He helped me in one of the projects that showed his dedication and knowledge in the field. He would be a valuable employee, possess good knowledge about automation and scripting.",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHdZGANlOVkZA/profile-displayphoto-shrink_800_800/B4DZZuc.P4H4Ag-/0/1745609812054?e=1753920000&v=beta&t=U0m6lInUYKf-Nd6uYq9kd93gOQLz1L9rR29bht1NMJQ",
    linkedin: "https://www.linkedin.com/in/kumarharsh32/"
  },
  {
    name: "Tulika Tiwari",
    role: "Program Manager at Amazon",
    quote:
      "Mihir consistently delivers high-quality work with exceptional attention to detail. His contributions had a direct impact on the success of our project. He is an excellent team player and a proactive problem-solver. Mihir’s data pipelines and dashboards enabled us to unlock powerful, actionable insights.",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGyVMbeE1_0lw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1673671643844?e=1753920000&v=beta&t=ffl1UHV4jrJka8AcOkc8gdNTvZtyT1jcdFxDuQMbGMA",
  }
];

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

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                      {testimonial.isMentor && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium">
                          Mentor
                        </span>
                      )}
                    </p>
                  </div>
                  {testimonial.linkedin && (
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="View LinkedIn Profile"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-300 italic">“{testimonial.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
