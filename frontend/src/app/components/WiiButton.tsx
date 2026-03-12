import { motion } from "motion/react";
import { forwardRef } from "react";

interface WiiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export const WiiButton = forwardRef<HTMLButtonElement, WiiButtonProps>(
  ({ variant = "primary", children, className = "", ...props }, ref) => {
    const variantStyles = {
      primary: "bg-[#1F88E8] hover:bg-[#1F88E8]/90 border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.3)]",
      secondary: "bg-[#B0B8C1] hover:bg-[#B0B8C1]/90 border-[#B0B8C1] shadow-[0_0_20px_rgba(176,184,193,0.3)]",
      danger: "bg-[#FF6B35] hover:bg-[#FF6B35]/90 border-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.3)]",
    };

    return (
      <motion.button
        ref={ref as any}
        className={`relative px-8 py-3 rounded-xl border-2 text-white font-semibold transition-all duration-300 overflow-hidden ${variantStyles[variant]} ${className}`}
        style={{ fontFamily: "Inter, sans-serif" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    );
  }
);

WiiButton.displayName = "WiiButton";
