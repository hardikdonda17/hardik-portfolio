"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { SectionTitle } from "./ui/SectionTitle";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "Enterprise E-commerce Portal",
    description:
      "Full-featured e-commerce platform with product catalog, cart, checkout, and admin dashboard. Built for B2B and B2C use cases with role-based access control.",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis"],
    github: "#",
    demo: "#",
  },
  {
    title: "Document Management System (AWS S3)",
    description:
      "Secure document storage and retrieval system leveraging AWS S3. Features include version control, access permissions, and full-text search.",
    tech: ["Node.js", "AWS S3", "Lambda", "React", "DynamoDB"],
    github: "#",
    demo: "#",
  },
  {
    title: "Server Monitoring Tool",
    description:
      "Real-time server health monitoring dashboard with alerts, metrics visualization, and log aggregation. Supports multiple server types and custom metrics.",
    tech: ["Node.js", "Express", "React", "WebSocket", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    title: "Restaurant Management System",
    description:
      "Complete POS and inventory management solution for restaurants. Includes order management, table reservations, and kitchen display system.",
    tech: ["Java", "Spring Boot", "React", "MySQL"],
    github: "#",
    demo: "#",
  },
  {
    title: "HMI Specification Tool",
    description:
      "Industrial HMI (Human-Machine Interface) specification and design tool. Enables engineers to define and validate HMI layouts and interactions.",
    tech: ["Java", "Spring Boot", "Angular", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Featured Projects" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col group hover:border-blue-500/30 transition-all duration-300 glow-on-hover">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 flex-1 mb-4 text-sm sm:text-base line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 sm:gap-6">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                      GitHub
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      Live Demo
                    </motion.a>
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
