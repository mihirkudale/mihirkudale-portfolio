import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { BsPatchCheckFill } from "react-icons/bs";

const certifications = [
  {
    title: "Power BI Data Analyst",
    issuer: "Microsoft",
    img: "https://images.seeklogo.com/logo-png/16/2/microsoft-logo-png_seeklogo-168319.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/mihirkudale-8632/4797406F2E129071?sharingId=1A510CD64EFC3B52",
  },
  {
    title: "Azure Data Scientist Associate",
    issuer: "Microsoft",
    img: "https://images.seeklogo.com/logo-png/16/2/microsoft-logo-png_seeklogo-168319.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/mihirkudale-8632/E11B6AD618E0D70F?sharingId=1A510CD64EFC3B52",
  },
  {
    title: "Azure AI Engineer Associate",
    issuer: "Microsoft",
    img: "https://images.seeklogo.com/logo-png/16/2/microsoft-logo-png_seeklogo-168319.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/mihirkudale-8632/C18AD2464AE0C911?sharingId=1A510CD64EFC3B52",
  },
  {
    title: "Data Science Professional Certificate",
    issuer: "IBM (Coursera)",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/VMVWAH6B7T7P",
  },
  {
    title: "Masters in Full Stack Data Science Certificate",
    issuer: "iNeuron",
    img: "data:image/png;base64,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",
    link: "https://learn.ineuron.ai/certificate/52243652-96a1-4cf7-bf15-0ae30b082bca",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google (Coursera)",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/ZTCEP3F9YFJC",
  },
    {
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google (Coursera)",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/NVDLHSKAWQWX",
  },
    {
    title: "Google Project Management Professional Certificate",
    issuer: "Google (Coursera)",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/ROOPN97OZK0A",
  },
  {
    title: "Python Specialization",
    issuer: "University of Michigan (Coursera)",
    img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/70/de505d47be7d3a063b51b6f856a6e2/New-Block-M-Stacked-Blue-295C_600x600.png?auto=format%2Ccompress&dpr=2&w=80&h=80",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/S38GDYMQ6JLZ",
  },
    {
    title: "Machine Learning",
    issuer: "Stanford University (Coursera)",
    img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/e8/7cc3d09d3f11e698dfff46d35f2da1/Stanford_Coursera_Logo.png?auto=format%2Ccompress&dpr=2&w=80&h=80",
    link: "https://www.coursera.org/account/accomplishments/certificate/G8FSBV9MX5VP",
  },
    {
    title: "Generative AI",
    issuer: "DeepLearning.AI (Coursera)",
    img: "data:image/png;base64,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",
    link: "https://www.coursera.org/account/accomplishments/certificate/9HAM443P49UR",
  },
];

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
