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
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

const SkillItem = ({ icon, name }) => (
  <div className="flex items-center gap-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
    {icon}
    <span>{name}</span>
  </div>
);

const categories = [
  {
    title: "Programming Languages & Databases",
    skills: [
      { name: "Python", icon: <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" className="w-5 h-5" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-500 text-lg" /> },
      { name: "Microsoft SQL Server", icon: <DiMsqlServer className="text-red-600 text-lg" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600 text-lg" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-700 text-lg" /> },
      { name: "Cassandra", icon: <SiApachecassandra className="text-cyan-700 text-lg" /> },
    ],
  },
  {
    title: "Data Visualization Tools",
    skills: [
      { name: "Power BI", icon: <img src="https://img.icons8.com/color/48/power-bi.png" alt="Power BI" className="w-5 h-5" /> },
      { name: "Tableau", icon: <img src="https://img.icons8.com/color/48/tableau-software.png" alt="Tableau" className="w-5 h-5" /> },
      { name: "Excel", icon: <img src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="Excel" className="w-5 h-5" /> },
      { name: "Amazon QuickSight", icon: <FaAws className="text-orange-500 text-lg" /> },
      { name: "Looker Studio", icon: <img src="data:image/png;base64,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" className="w-5 h-5" /> },

    ],
  },
  {
    title: "Web Technologies",
    skills: [

      { name: "Django", icon: <SiDjango className="text-green-800 text-lg" /> },
      { name: "Flask", icon: <SiFlask className="text-gray-800 text-lg" /> },
      { name: "Streamlit", icon: <img src="https://streamlit.io/images/brand/streamlit-logo-primary-colormark-darktext.svg" alt="Streamlit" className="w-5 h-5" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-green-500 text-lg" /> },
      { name: "REST API", icon: <span className="text-gray-700 text-sm font-semibold">REST</span> },
      { name: "HTML", icon: <SiHtml5 className="text-orange-600 text-lg" /> },
      { name: "CSS", icon: <SiCss3 className="text-blue-600 text-lg" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-500 text-lg" /> },
      { name: "React", icon: <FaReact className="text-blue-500 text-lg" /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-600 text-lg" /> },
      { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-500 text-lg" /> },
     
    ],
  },
  {
    title: "Cloud, Big Data & DevOps",
    skills: [
        { name: "AWS", icon: <FaAws className="text-yellow-600 text-lg" /> },
        { name: "Azure", icon: <img src="https://www.tigera.io/app/uploads/2023/07/MS-Azure-logo.svg" alt="Azure" className="w-5 h-5" /> },
        { name: "GCP", icon: <img src="data:image/png;base64,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" alt="GCP" className="w-5 h-5" /> },
        { name: "Apache Spark", icon: <SiApachespark className="text-orange-500 text-lg" /> },
        { name: "Apache Hive", icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5Nv59h4t2r0eMJiPVN3o3dhc8_DnJoqVwk-LjIajh3YXJ6UUWQnPdFKK9We4nXDCPfQ&usqp=CAU" alt="Apache Hive" className="w-6 h-6" /> },
        { name: "Apache Hadoop", icon: <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Hadoop_logo.svg" alt="Apache Hadoop" className="w-6 h-6"/>},
        { name: "Apache Kafka", icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDCsnH-LecjXUO0ujaEgMSALxOVGEf_7KSZA&s" alt="Apache Kafka" className="w-6 h-6" /> },
        { name: "Docker", icon: <FaDocker className="text-blue-500 text-lg" /> },
        { name: "Git", icon: <FaGitAlt className="text-orange-500 text-lg" /> },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="scroll-mt-24 py-24 px-6 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
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
                  <SkillItem key={i} icon={skill.icon} name={skill.name} />
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
