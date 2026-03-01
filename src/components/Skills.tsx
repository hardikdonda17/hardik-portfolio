"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["Java", "Spring Boot", "Node.js", "Express", "REST APIs"],
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    title: "Cloud",
    icon: "☁️",
    skills: ["AWS", "EC2", "S3", "Lambda", "RDS", "CloudFormation"],
  },
  {
    title: "Tools",
    icon: "🛠️",
    skills: ["Git", "Docker", "Jenkins", "Jira", "Postman"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d12] bg-grid-pattern">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Skills & Technologies" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span
                      className="text-2xl sm:text-3xl"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {category.icon}
                    </motion.span>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 + i * 0.03 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-xs sm:text-sm border border-white/[0.06] hover:border-white/10 hover:text-zinc-300 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
