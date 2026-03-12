import { motion } from "motion/react";
import type { ReactNode } from "react";

interface WiiCardProps {
  children: ReactNode;
  className?: string;
}

export function WiiCard({ children, className = "" }: WiiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative backdrop-blur-[20px] bg-white/15 border border-[#00D9FF]/40 rounded-2xl shadow-[0_8px_32px_rgba(0,217,255,0.15)] ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
      }}
    >
      {children}
    </motion.div>
  );
}