interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 border border-white/[0.06] ${className}`}
    >
      {children}
    </span>
  );
}
