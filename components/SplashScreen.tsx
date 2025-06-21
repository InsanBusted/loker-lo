"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [showText, setShowText] = useState(false);

  const fullText = "Halo, selamat datang di Lokerlo";
  const typingSpeed = 50;

  const logoControls = useAnimation();

  // Efek animasi berurutan
  useEffect(() => {
    async function runAnimation() {
      // Logo muncul besar
      await logoControls.start({
        opacity: 1,
        scale: 1.5,
        transition: { duration: 0.8 },
      });

      // Logo mengecil
      await logoControls.start({
        scale: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      // Baru mulai teks
      setShowText(true);
    }

    runAnimation();
  }, [logoControls]);

  // Efek mengetik teks
  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    let closeTimer: NodeJS.Timeout;

    if (showText && typedText.length < fullText.length) {
      typingTimer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
    }

    if (typedText === fullText) {
      closeTimer = setTimeout(() => {
        setShowSplash(false);
      }, 800);
    }

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(closeTimer);
    };
  }, [typedText, showText]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white text-2xl font-semibold overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Animated Logo */}
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={logoControls}>
            <Image
              src="/nav.png"
              alt="LokerLo Logo"
              width={150}
              height={60}
              priority
            />
          </motion.div>

          {/* Rocket Animation */}
          <motion.div
            initial={{ y: 200, opacity: 0, rotate: -20 }}
            animate={{ y: -150, opacity: 1, rotate: 0 }}
            transition={{
              delay: 3,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute bottom-10"
          >
            <Image
              src="/rocket.png"
              alt="Rocket Animation"
              width={60}
              height={60}
            />
          </motion.div>

          {/* Typing Text */}
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <span>
                {typedText}
                <motion.span
                  className="inline-block w-[2px] h-[1.2em] bg-white ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
