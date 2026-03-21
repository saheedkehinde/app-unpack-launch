import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import timakLogo from "@/assets/timak-logo.png";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 800);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(onFinish, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#ffee9a]/20 to-[#b88a2e]/20 blur-[100px]" />
        </div>

        {/* Logo */}
        <motion.img
          src={timakLogo}
          alt="TIMAK CENTRE"
          className="w-24 h-24 object-contain relative z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        />

        {/* Text */}
        <motion.div
          className="relative z-10 text-center mt-5"
          initial={{ opacity: 0, y: 15 }}
          animate={phase === "text" || phase === "exit" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl font-bold bg-gradient-to-r from-[#ffee9a] to-[#b88a2e] bg-clip-text text-transparent tracking-wider">
            TIMAK
          </h1>
          <p className="text-[10px] text-foreground/50 font-medium tracking-[0.3em] uppercase mt-1">
            Centre
          </p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="relative z-10 mt-8 w-32 h-0.5 rounded-full bg-muted overflow-hidden"
          initial={{ opacity: 0 }}
          animate={phase === "text" || phase === "exit" ? { opacity: 1 } : {}}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#ffee9a] to-[#b88a2e]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
