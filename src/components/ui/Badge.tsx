"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center rounded-lg bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1 text-xs font-medium text-zinc-300 border border-white/[0.06] ${className}`}
    >
      {children}
    </motion.span>
  );
}
