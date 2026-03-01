"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const socialLinks = [
  { href: "mailto:dondahardik03@gmail.com", icon: FiMail, label: "Email" },
  {
    href: "https://www.linkedin.com/in/hardik-donda-45-developer",
    icon: FiLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/hardikdonda17",
    icon: FiGithub,
    label: "GitHub",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 md:px-8 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-sm text-center sm:text-left"
          >
            © {currentYear} Hardik Donda. All rights reserved.
          </motion.p>
          <div className="flex items-center gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-zinc-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label={link.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
