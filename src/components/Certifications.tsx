"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";
import { FiAward } from "react-icons/fi";

const certifications = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
  },
  {
    name: "Google Professional Cloud Architect",
    issuer: "Google Cloud",
    year: "2024",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Certifications" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col hover:border-amber-500/20 transition-colors group">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <FiAward className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-2">
                        {cert.name}
                      </h3>
                      <p className="text-zinc-500 text-xs sm:text-sm">{cert.issuer}</p>
                      <p className="text-zinc-600 text-xs mt-1">{cert.year}</p>
                    </div>
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
