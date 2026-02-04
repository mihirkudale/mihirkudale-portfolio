import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiApachecassandra,
  SiDjango,
  SiFlask,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiFastapi,
  SiApachespark,
  SiApachehive,
  SiApachehadoop,
  SiApachekafka,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { categories } from "../../constants/skills";

const iconMap = {
  python: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
      alt="Python"
      className="w-5 h-5"
    />
  ),
  mysql: <SiMysql className="text-blue-500 text-lg" />,
  mssql: <DiMsqlServer className="text-red-600 text-lg" />,
  postgresql: <SiPostgresql className="text-blue-600 text-lg" />,
  mongodb: <SiMongodb className="text-green-700 text-lg" />,
  cassandra: <SiApachecassandra className="text-cyan-700 text-lg" />,

  powerbi: (
    <img
      src="https://img.icons8.com/color/48/power-bi.png"
      alt="Power BI"
      className="w-5 h-5"
    />
  ),
  tableau: (
    <img
      src="https://img.icons8.com/color/48/tableau-software.png"
      alt="Tableau"
      className="w-5 h-5"
    />
  ),
  excel: (
    <img
      src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png"
      alt="Excel"
      className="w-5 h-5"
    />
  ),
  quicksight: <FaAws className="text-orange-500 text-lg" />,
  looker: (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMDAwMDAwIiBzdHlsZT0ib3BhY2l0eToxOyI+PHBhdGggIGQ9Ik0xMS45NDggMEEyLjEgMi4xIDAgMCAwIDkuODUgMi4xMDRhMi4xIDIuMSAwIDAgMCAuMzU2IDEuMTY2bC44OTUtLjg5NmEuODg0Ljg4NCAwIDEgMSAuNTY1LjU2NGwtLjg5NS44OTVBMi4wOTYgMi4wOTYgMCAwIDAgMTMuMTE5LjM1OUEyLjEgMi4xIDAgMCAwIDExLjk0OSAwbS0uODM2IDYuMTEzYTMuMjYgMy4yNiAwIDAgMC0uNjUyLTEuOTY1TDkuMjk1IDUuMzFhMS42NyAxLjY3IDAgMCAxLS4zMTcgMi4wMTJsLjYzMiAxLjU0NWEzLjI4IDMuMjggMCAwIDAgMS41MDMtMi43NTRtLTMuMjUgMS42NjZoLS4wM0ExLjY3IDEuNjcgMCAwIDEgNy44MyA0LjQ0YTEuNjcgMS42NyAwIDAgMSAuOTIuMjc1TDkuOSAzLjU2NGEzLjI4IDMuMjggMCAwIDAtNC4xMzMgNS4wOTRhMy4yOCAzLjI4IDAgMCAwIDIuNzI4LjY2NnptNC4xMjkgMS4zMzZjLS43MjggMC0xLjQ1Mi4xMDYtMi4xNS4zMTVsLjkyMiAyLjI1MmE1LjAyIDUuMDIgMCAxIDEtMS4xMjcuNDM1bC0uOTEtMi4yNDRhNy40NCA3LjQ0IDAgMCAwLTMuNDEgOS45NTZ2LjAwMWE3LjQ0IDcuNDQgMCAwIDAgOS45NTcgMy40MWguMDAxYTcuNDQgNy40NCAwIDAgMCAzLjQxMi05Ljk1N0E3LjQ0IDcuNDQgMCAwIDAgMTIgOS4xMTNoLS4wMDh6Ii8+PC9zdmc+"
      alt="Looker"
      className="w-5 h-5"
    />
  ),

  django: <SiDjango className="text-green-800 text-lg" />,
  flask: <SiFlask className="text-gray-800 text-lg" />,
  streamlit: (
    <img
      src="https://streamlit.io/images/brand/streamlit-logo-primary-colormark-darktext.svg"
      alt="Streamlit"
      className="w-5 h-5"
    />
  ),
  fastapi: <SiFastapi className="text-green-500 text-lg" />,
  rest: <span className="text-gray-700 text-sm font-semibold">REST</span>,
  html: <SiHtml5 className="text-orange-600 text-lg" />,
  css: <SiCss3 className="text-blue-600 text-lg" />,
  javascript: <SiJavascript className="text-yellow-500 text-lg" />,
  react: <FaReact className="text-blue-500 text-lg" />,
  node: <FaNodeJs className="text-green-600 text-lg" />,
  tailwind: <SiTailwindcss className="text-teal-500 text-lg" />,

  aws: <FaAws className="text-yellow-600 text-lg" />,
  azure: (
    <img
      src="https://www.tigera.io/app/uploads/2023/07/MS-Azure-logo.svg"
      alt="Azure"
      className="w-5 h-5"
    />
  ),
  gcp: (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiICBzdHlsZT0ib3BhY2l0eToxOyI+PHBhdGggZmlsbD0iI2Y0NDMzNiIgZD0iTTE4NC4zNTEgMTAzLjgxNmg3Ljc4NmwyMi4xOTEtMjIuMTkxbDEuMDktOS40MjFhOTkuNzQzIDk5Ljc0MyAwIDAgMC0xNjIuMjY2IDQ4LjY2NGExMi4wNyAxMi4wNyAwIDAgMSA3Ljc4Ni0uNDY3bDQ0LjM4Mi03LjMyczIuMjU4LTMuNzM3IDMuNDI2LTMuNTAzYTU1LjM2IDU1LjM2IDAgMCAxIDc1Ljc2LTUuNzYyeiIvPjxwYXRoIGZpbGw9IiM0NDhhZmYiIGQ9Ik0yNDUuOTQgMTIwLjg2OGExMDAgMTAwIDAgMCAwLTMwLjEzMi00OC41ODdsLTMxLjE0NiAzMS4xNDZhNTUuMzYgNTUuMzYgMCAwIDEgMjAuMzIzIDQzLjkxNHY1LjUyOWEyNy43MiAyNy43MiAwIDEgMSAwIDU1LjQzOGgtNTUuNDM5bC01LjUyOCA1LjYwNnYzMy4yNDhsNS41MjggNS41MjhoNTUuNDM5YTcyLjEwMSA3Mi4xMDEgMCAwIDAgNDAuOTU2LTEzMS44MjJ6Ii8+PHBhdGggZmlsbD0iIzQzYTA0NyIgZD0iTTk0LjAzIDI1Mi4zNzloNTUuNDM4di00NC4zODJIOTQuMDNhMjcuNiAyNy42IDAgMCAxLTExLjQ0Ni0yLjQ5MmwtNy43ODYgMi40MTRsLTIyLjM0NyAyMi4xOWwtMS45NDcgNy43ODdhNzEuNyA3MS43IDAgMCAwIDQzLjUyNiAxNC40ODMiLz48cGF0aCBmaWxsPSIjZmZjMTA3IiBkPSJNOTQuMDMgMTA4LjQxYTcyLjEwMSA3Mi4xMDEgMCAwIDAtNDMuNTI2IDEyOS4yNTJsMzIuMTU4LTMyLjE1N2EyNy43MiAyNy43MiAwIDEgMSAzNi42NzMtMzYuNjczbDMyLjE1OC0zMi4xNThBNzIuMDIgNzIuMDIgMCAwIDAgOTQuMDMgMTA4LjQxIi8+PC9zdmc+"
      alt="GCP"
      className="w-5 h-5"
    />
  ),
  spark: <SiApachespark className="text-orange-500 text-lg" />,
  hive: <SiApachehive className="text-yellow-700 text-lg" />,
  hadoop: <SiApachehadoop className="text-yellow-600 text-lg" />,
  kafka: <SiApachekafka className="text-black text-lg" />,
  docker: <FaDocker className="text-blue-500 text-lg" />,
  git: <FaGitAlt className="text-orange-500 text-lg" />,
};

const SkillItem = ({ iconKey, name }) => (
  <div className="flex items-center gap-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
    {iconMap[iconKey]}
    <span>{name}</span>
  </div>
);

const Skills = () => {
  return (
    <section
      id="skills"
      className="scroll-mt-24 py-24 px-6 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          My Tech Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-700 rounded-2xl shadow-lg p-6 transition hover:shadow-xl hover:scale-[1.01] duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <SkillItem
                    key={i}
                    iconKey={skill.icon}
                    name={skill.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;