"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className = "", glass = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border ${
        glass
          ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
          : "bg-[#12121a] border-white/[0.08]"
      } p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
