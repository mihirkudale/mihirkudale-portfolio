import { RevealOnScroll } from "../RevealOnScroll";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { contactConfig } from "../../constants/contacts";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-slate-50 text-slate-900 py-28 px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Background Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-100/50 blur-[120px] pointer-events-none"
      />

      <RevealOnScroll>
        <div className="w-full max-w-5xl space-y-12 relative z-10">
          {/* Hire Me Hero Card */}
          <div className="relative glass-card gradient-border bg-white text-center p-12 md:p-16 space-y-8 overflow-hidden">
            <div className="relative z-10 space-y-4">
              <p className="text-sm font-bold text-blue-600 tracking-widest uppercase">
                Let's Connect
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {contactConfig.heading}
              </h2>
              <p className="text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {contactConfig.description}
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <a
                href={contactConfig.ctaLink}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                {contactConfig.ctaText}
                <span className="text-xl">☀️</span>
              </a>
            </div>
          </div>

          {/* Office + Map */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Office Info */}
            <div className="glass-card gradient-border bg-white p-10 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 rounded-full bg-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  {contactConfig.locationTitle}
                </h3>
              </div>
              <p className="text-slate-700 text-lg font-semibold">{contactConfig.locationText}</p>
              <p className="text-base text-slate-600 leading-relaxed font-medium">
                Available for{" "}
                <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md">on-site</span>,{" "}
                <span className="text-violet-700 font-bold bg-violet-50 px-2 py-0.5 rounded-md">remote</span>, and{" "}
                <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md">freelance</span>{" "}
                roles globally.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href={contactConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-slate-200 text-slate-700 hover:text-black hover:border-slate-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href={contactConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-slate-200 text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href={contactConfig.socials.email}
                  aria-label="Email"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-slate-200 text-rose-500 hover:text-rose-600 hover:border-rose-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <HiOutlineMail className="text-2xl" />
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-[300px] md:h-full rounded-[1.5rem] overflow-hidden border-2 border-white shadow-xl">
              <iframe
                title="Google Map - Kothrud, Pune"
                src={contactConfig.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-10 border-t-2 border-slate-200 text-center text-sm font-semibold text-slate-500">
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-slate-300" />
              {contactConfig.footer.text}{" "}
              <span className="font-bold text-slate-900">
                {contactConfig.footer.name}
              </span>
              <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-slate-300" />
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};