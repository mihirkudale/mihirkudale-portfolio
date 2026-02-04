import { RevealOnScroll } from "../RevealOnScroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { homeData } from "../../constants/home";

export const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900 text-neutral-900 dark:text-white px-6 md:px-12 py-20 flex items-center justify-center"
    >
      {/* Background Shapes */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/10"
      />

      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-7xl gap-y-12 md:gap-x-24">
          {/* Left: Intro */}
          <div className="space-y-6 md:pl-10">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              {homeData.roles}
            </p>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
              Hi, I’m{" "}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-600 bg-clip-text text-transparent font-extrabold">
                {homeData.name}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl">
              {homeData.headline}
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-sm text-gray-600 dark:text-gray-300">
              {homeData.badges.map((badge, index) => (
                <span
                  key={index}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={homeData.cta.primary.href}
                className="inline-flex items-center justify-center rounded-lg bg-blue-800 px-6 py-3 text-white font-semibold shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
              >
                {homeData.cta.primary.label}
              </a>

              <a
                href={homeData.cta.secondary.href}
                className="inline-flex items-center justify-center rounded-lg border border-blue-800 px-6 py-3 text-blue-800 font-semibold shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500/10"
              >
                {homeData.cta.secondary.label}
              </a>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href={homeData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-700 shadow-sm transition hover:scale-[1.05] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-white/5"
              >
                <FaLinkedin className="text-xl" />
              </a>

              <a
                href={homeData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-neutral-900 shadow-sm transition hover:scale-[1.05] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-white/5"
              >
                <FaGithub className="text-xl" />
              </a>

              <a
                href={homeData.social.email}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#D14836] shadow-sm transition hover:scale-[1.05] hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-white/5"
              >
                <HiOutlineMail className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative flex justify-center md:justify-end md:pr-10">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-2xl"
            />

            <img
              src={homeData.image.src}
              alt={homeData.image.alt}
              width={homeData.image.width}
              height={homeData.image.height}
              className="relative w-[320px] md:w-[420px] h-auto object-cover rounded-2xl border border-gray-100 shadow-[0_14px_40px_rgba(0,0,0,0.16)] dark:border-gray-800"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};