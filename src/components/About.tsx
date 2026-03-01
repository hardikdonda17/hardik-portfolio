"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <Card className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-zinc-300 leading-relaxed text-lg">
              I&apos;m a Full Stack Developer with{" "}
              <span className="text-blue-400 font-semibold">3.5+ years</span> of
              experience building enterprise-grade applications. Currently
              working at{" "}
              <span className="text-white font-medium">
                Tata Consultancy Services (TCS)
              </span>
              , I specialize in delivering robust, scalable solutions that drive
              business value.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              My technical expertise spans the full stack—from crafting responsive
              frontends with React and Next.js to architecting resilient
              backends with Java, Spring Boot, and Node.js. I have hands-on
              experience with PostgreSQL and am an{" "}
              <span className="text-amber-400 font-medium">
                AWS Certified Developer
              </span>
              , enabling me to design and deploy cloud-native solutions.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {[
                "Java",
                "Spring Boot",
                "Node.js",
                "React",
                "Next.js",
                "PostgreSQL",
                "AWS",
              ].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/[0.06] text-zinc-300 text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
