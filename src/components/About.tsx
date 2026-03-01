"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";

const techStack = [
  "Java",
  "Spring Boot",
  "Node.js",
  "React",
  "Next.js",
  "PostgreSQL",
  "AWS",
];

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="About Me" />

        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="space-y-5 sm:space-y-6">
              <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                I&apos;m a Full Stack Developer with{" "}
                <span className="text-blue-400 font-semibold">3.5+ years</span>{" "}
                of experience building enterprise-grade applications. Currently
                working at{" "}
                <span className="text-white font-medium">
                  Tata Consultancy Services (TCS)
                </span>
                , I specialize in delivering robust, scalable solutions that
                drive business value.
              </p>

              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                My technical expertise spans the full stack—from crafting
                responsive frontends with React and Next.js to architecting
                resilient backends with Java, Spring Boot, and Node.js. I have
                hands-on experience with PostgreSQL and am an{" "}
                <span className="text-amber-400 font-medium">
                  AWS Certified Developer
                </span>
                , enabling me to design and deploy cloud-native solutions.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/[0.06] text-zinc-300 text-xs sm:text-sm font-medium hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
