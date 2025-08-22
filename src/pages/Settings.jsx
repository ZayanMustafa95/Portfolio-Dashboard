import React, { useState } from "react";
import { motion } from "framer-motion";

const skillsData = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "CSS", level: 80 },
  { name: "Digital Marketing", level: 75 },
];

const projectsData = [
  { title: "Portfolio Website", desc: "Interactive personal portfolio." },
  { title: "E-commerce Store", desc: "Online store with payment integration." },
  { title: "Marketing Campaign", desc: "Boosted brand awareness by 50%." },
];

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-8 transition-colors duration-500`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Settings & Skills</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="space-y-4">
          {skillsData.map((skill, index) => (
            <div key={index}>
              <p className="mb-1">{skill.name}</p>
              <div className="w-full bg-gray-700 rounded h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className="h-4 bg-indigo-500"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Projects & Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-5 bg-gray-800 dark:bg-gray-200 rounded shadow-lg cursor-pointer transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p>{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
