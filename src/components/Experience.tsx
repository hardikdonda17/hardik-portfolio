"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { FiBriefcase } from "react-icons/fi";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-[#0d0d12]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-3xl mx-auto">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <FiBriefcase className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    System Engineer
                  </h3>
                  <span className="text-zinc-500 text-sm">
                    June 2022 – Present
                  </span>
                </div>
                <p className="text-blue-400 font-medium mb-3">
                  Tata Consultancy Services (TCS)
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Delivering full-stack solutions for enterprise clients. Leading
                  development of scalable web applications using Java, Spring
                  Boot, and modern frontend frameworks. Collaborating with
                  cross-functional teams to architect cloud-native solutions on
                  AWS. Mentoring junior developers and contributing to technical
                  design decisions.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
