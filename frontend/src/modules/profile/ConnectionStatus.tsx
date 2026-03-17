import { Wifi } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function ConnectionStatus({ isOnline }: { isOnline: boolean }) {
  const [visible, setVisible] = useState(true);
  const duration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed top-6 right-6 z-[9999] flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#00D9FF]/30 rounded-full px-4 py-2"
        >
          <Wifi
            size={16}
            className={isOnline ? "text-[#00FF87]" : "text-[#FF6B35]"}
          />
          <span
            className="text-sm text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {isOnline ? "Conectado" : "Desconectado"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
