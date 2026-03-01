"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";
import { FiBriefcase } from "react-icons/fi";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d12] bg-grid-pattern">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Experience" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <Card className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/20">
                    <FiBriefcase className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                  </div>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      System Engineer
                    </h3>
                    <span className="text-zinc-500 text-sm font-medium">
                      June 2022 – Present
                    </span>
                  </div>
                  <p className="text-blue-400 font-medium mb-3 text-sm sm:text-base">
                    Tata Consultancy Services (TCS)
                  </p>
                  <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                    Delivering full-stack solutions for enterprise clients.
                    Leading development of scalable web applications using Java,
                    Spring Boot, and modern frontend frameworks. Collaborating
                    with cross-functional teams to architect cloud-native
                    solutions on AWS. Mentoring junior developers and
                    contributing to technical design decisions.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
