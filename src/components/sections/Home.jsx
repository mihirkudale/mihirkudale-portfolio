import { RevealOnScroll } from "../RevealOnScroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-white px-6 md:px-12 py-20 flex items-center justify-center"
    >
      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between w-full max-w-7xl gap-y-10 md:gap-x-20">
          {/* Left: Intro */}
          <div className="space-y-6 pl-4 md:pl-20">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                Hello, I'm{" "}
                <span className="bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-600 bg-clip-text text-transparent font-extrabold">
                  Mihir Kudale
                </span>
              </h1>

              {/* Amazon Badge */}
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 bg-[#FFF7CC] text-[#A15C00] text-sm font-semibold px-4 py-1 rounded-full shadow-sm">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                    alt="Amazon"
                    className="h-5"
                  />
                  <span className="tracking-tight">Ex-Amazonian</span>
                </span>
              </div>

              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                Data Analyst | Data Scientist | Data Engineer | Ex-Amazon |
                Microsoft Certified (PL-300, DP-100, AI-102) | Driving Business
                Value through Data Science, AI, Cloud, and Analytics
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-md font-medium transition duration-200 shadow-sm"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border border-blue-800 text-blue-800 hover:bg-blue-50 py-3 px-6 rounded-md font-medium transition duration-200 shadow-sm"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links with Brand Colors */}
            <div className="flex gap-6 text-xl mt-2">
              <a
                href="https://www.linkedin.com/in/mihirkudale/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-blue-700 hover:opacity-80 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/mihirkudale"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-neutral-900 dark:text-white hover:opacity-80 transition"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:mihirkudale94@gmail.com"
                aria-label="Email Mihir Kudale"
                className="text-[#D14836] hover:opacity-80 transition"
              >
                <HiOutlineMail />
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="flex justify-center md:justify-end pr-6 md:pr-20">
            <img
              src="https://i.postimg.cc/Mpbr4dPL/Mihir-photo.jpg"
              alt="Portrait of Mihir Kudale"
              className="w-[320px] md:w-[400px] h-auto object-cover rounded-md bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              loading="lazy"
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
