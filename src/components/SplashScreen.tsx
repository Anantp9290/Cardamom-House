"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const DURATION_MS = 2600;
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.2, 0.7, 0.2, 1] as const;

const WORDS = ["Cardamom", "House"] as const;

/**
 * The inline script in layout.tsx decides before first paint whether
 * `html[data-splash]` is "playing" or "done", respecting reduced motion.
 *
 *   playing  overlay visible, hero entrance paused
 *   exiting  overlay lifting, hero entrance running
 *   done     overlay gone
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    document.documentElement.dataset.splash = "exiting";
    setVisible(false);
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.splash !== "playing") {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(finish, DURATION_MS);
    window.addEventListener("keydown", finish);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", finish);
    };
  }, [finish]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.dataset.splash = "done";
      }}
    >
      {visible && (
        <motion.div
          key="splash"
          aria-hidden="true"
          onClick={finish}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: EASE_CURTAIN } }}
          className="splash fixed inset-0 z-100 flex flex-col items-center justify-center gap-7 bg-paper px-6 print:hidden"
        >
          <svg viewBox="0 0 120 250" fill="none" className="w-16 text-brand sm:w-20">
            <motion.path
              d="M60 14C98 64 106 156 60 236C14 156 22 64 60 14Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="currentColor"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 0.16 }}
              transition={{
                pathLength: { duration: 1.2, ease: "easeInOut" },
                fillOpacity: { duration: 0.6, delay: 1, ease: "easeOut" },
              }}
            />
            <motion.path
              d="M60 14C60 90 60 160 60 236M60 14C82 72 84 160 60 236M60 14C38 72 36 160 60 236M60 14V3M53 237h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease: "easeInOut" }}
            />
          </svg>

          <p className="text-center font-display font-soft text-[clamp(2.6rem,11vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            {WORDS.map((word, wordIndex) => (
              <span key={word} className="block overflow-hidden pb-[0.08em]">
                {Array.from(word).map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: EASE_OUT,
                      delay: 0.55 + (wordIndex * 8 + letterIndex) * 0.04,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </p>

          <motion.p
            className="font-display text-xl text-ink-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            Lisbon, since 2021
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
