import { motion } from "motion/react";

export function WavesBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0F1419] to-[#1A2332]">
      {/* Animated wave layers */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F88E8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1F88E8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M0,160 Q320,100 640,160 T1280,160 L1280,0 L0,0 Z"
          fill="url(#waveGradient1)"
          animate={{
            d: [
              "M0,160 Q320,100 640,160 T1280,160 L1280,0 L0,0 Z",
              "M0,140 Q320,180 640,140 T1280,140 L1280,0 L0,0 Z",
              "M0,160 Q320,100 640,160 T1280,160 L1280,0 L0,0 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M0,900 Q320,850 640,900 T1280,900 L1280,1024 L0,1024 Z"
          fill="url(#waveGradient2)"
          animate={{
            d: [
              "M0,900 Q320,850 640,900 T1280,900 L1280,1024 L0,1024 Z",
              "M0,880 Q320,920 640,880 T1280,880 L1280,1024 L0,1024 Z",
              "M0,900 Q320,850 640,900 T1280,900 L1280,1024 L0,1024 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00D9FF] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1F88E8] to-transparent opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#00D9FF] to-transparent opacity-10 rounded-full blur-3xl" />
    </div>
  );
}
