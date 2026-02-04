import { RevealOnScroll } from "../RevealOnScroll";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { contactConfig } from "../../constants/contacts";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white py-24 px-6 flex items-center justify-center"
    >
      <RevealOnScroll>
        <div className="w-full max-w-7xl space-y-20">
          {/* Hire Me Section */}
          <div className="text-center bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-2xl p-10 shadow-lg space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {contactConfig.heading}
            </h2>
            <p className="text-md text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {contactConfig.description}
            </p>
            <a
              href={contactConfig.ctaLink}
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition"
            >
              {contactConfig.ctaText}
            </a>
          </div>

          {/* Office + Map Section */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Office Info */}
            <div className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-2xl p-8 shadow-md space-y-4">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                {contactConfig.locationTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {contactConfig.locationText}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Available for <strong>on-site</strong>,{" "}
                <strong>remote</strong>, and <strong>freelance</strong> roles
                globally.
              </p>
            </div>

            {/* Google Map */}
            <div className="h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <iframe
                title="Google Map - Kothrud, Pune"
                src={contactConfig.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connect with me
            </p>
            <div className="flex items-center gap-6 flex-wrap text-lg">
              <a
                href={contactConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-black dark:hover:text-blue-200 transition transform hover:scale-105"
              >
                <FaGithub />
              </a>
              <a
                href={contactConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition transform hover:scale-105"
              >
                <FaLinkedin />
              </a>
              <a
                href={contactConfig.socials.email}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition transform hover:scale-105"
              >
                <HiOutlineMail />
              </a>
            </div>
          </div>

          {/* Footer Text */}
          <div className="pt-10 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
            {contactConfig.footer.text}{" "}
            <span className="font-medium text-blue-600 dark:text-blue-300">
              {contactConfig.footer.name}
            </span>
            .
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};