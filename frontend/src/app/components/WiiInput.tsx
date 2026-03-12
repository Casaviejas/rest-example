import { motion } from "motion/react";
import { forwardRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface WiiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  showValidation?: boolean;
  isValid?: boolean;
}

export const WiiInput = forwardRef<HTMLInputElement, WiiInputProps>(
  ({ label, icon: Icon, error, showValidation, isValid, className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className={`relative ${className}`}>
        <motion.div
          className={`relative flex items-center bg-[rgba(3,2,19,0.6)] rounded-xl border transition-all duration-300 ${
            error
              ? "border-[#FF6B35]"
              : isFocused
              ? "border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.2)]"
              : "border-[#00D9FF]/30"
          }`}
          animate={{
            borderWidth: isFocused ? "2px" : "1px",
          }}
        >
          {Icon && (
            <div className="pl-4 text-[#B0B8C1]">
              <Icon size={20} />
            </div>
          )}
          <input
            ref={ref}
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-[#B0B8C1] outline-none"
            style={{ fontFamily: "Inter, sans-serif" }}
            placeholder={label}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {showValidation && (
            <div className="pr-4">
              {isValid ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              ) : (
                props.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-[#FF6B35] flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                )
              )}
            </div>
          )}
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-[#FF6B35] ml-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

WiiInput.displayName = "WiiInput";
