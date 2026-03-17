import { motion } from "motion/react";

export const ProfileFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="bottom-4 left-0 right-0 text-center text-[#B0B8C1] text-sm"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      © 2026 Wii U Inspired App. Todos los derechos reservados.
    </motion.footer>
  );
};
