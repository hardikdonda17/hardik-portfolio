"use client";

import { motion } from "framer-motion";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-blue-500 hover:bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/25",
  secondary:
    "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700/50",
  outline:
    "bg-transparent hover:bg-white/5 text-zinc-300 border-white/20 hover:border-white/40",
  ghost: "bg-transparent hover:bg-white/5 text-zinc-300 border-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <a
        className={`inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </a>
    </motion.div>
  );
}
