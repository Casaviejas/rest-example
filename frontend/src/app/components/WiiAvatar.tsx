import { motion } from "motion/react";
import { User } from "lucide-react";

interface WiiAvatarProps {
  size?: "sm" | "md" | "lg";
  name?: string;
}

export function WiiAvatar({ size = "md", name }: WiiAvatarProps) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const iconSizes = {
    sm: 24,
    md: 40,
    lg: 64,
  };

  return (
    <motion.div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-[#1F88E8] to-[#00D9FF] flex items-center justify-center shadow-[0_8px_32px_rgba(0,217,255,0.3)] border-2 border-[#00D9FF]`}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {name ? (
        <span className="text-white font-bold" style={{ fontFamily: "Montserrat, sans-serif", fontSize: size === "lg" ? "32px" : size === "md" ? "20px" : "16px" }}>
          {name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <User size={iconSizes[size]} className="text-white" />
      )}
    </motion.div>
  );
}
