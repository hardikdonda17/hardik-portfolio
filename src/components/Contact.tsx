"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate form submission - replace with actual API/email service
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("sent");
    setFormState({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactLinks = [
    {
      href: "mailto:dondahardik03@gmail.com",
      icon: FiMail,
      label: "dondahardik03@gmail.com",
    },
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

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d12] bg-grid-pattern">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Get In Touch"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-zinc-400 text-base sm:text-lg">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-white/5 border border-white/[0.06] text-zinc-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/[0.06] group-hover:border-blue-500/30 transition-colors flex-shrink-0">
                    <link.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-sm sm:text-base truncate">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Card>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3 px-6 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "idle" && "Send Message"}
                    {status === "sending" && "Sending..."}
                    {status === "sent" && "Message Sent!"}
                  </motion.button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
