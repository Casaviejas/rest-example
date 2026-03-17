import { motion, AnimatePresence } from "motion/react";
import { Edit3 } from "lucide-react";
import { WiiAvatar } from "../../components/WiiAvatar";

import type { ProfileHeaderProps } from "./schemas";

export function ProfileHeader({ name, email, isEditing }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center mb-8"
    >
      <WiiAvatar size="lg" name={name} />

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white mt-4 mb-2"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "32px",
          fontWeight: 700,
        }}
      >
        {name || "Usuario"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[#B0B8C1]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {email}
      </motion.p>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-4 flex items-center gap-2 bg-[#FF6B35]/20 border border-[#FF6B35] rounded-full px-4 py-2"
          >
            <Edit3 size={16} className="text-[#FF6B35]" />
            <span
              className="text-sm text-white font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Modo edición
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
