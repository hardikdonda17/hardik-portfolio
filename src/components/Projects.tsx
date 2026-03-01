"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
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
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col group hover:border-blue-500/20 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 flex-1 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    <FiGithub className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    <FiExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
