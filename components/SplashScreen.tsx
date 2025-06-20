'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true)
  const [typedText, setTypedText] = useState('')
  const fullText = 'Halo, selamat datang di Lokerlo'
  const typingSpeed = 50 // ms per karakter

  useEffect(() => {
    let typingTimer: NodeJS.Timeout
    let closeTimer: NodeJS.Timeout

    // Mulai efek mengetik
    if (typedText.length < fullText.length) {
      typingTimer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
    }

    if (typedText === fullText) {
      closeTimer = setTimeout(() => {
        setShowSplash(false)
      }, 500)
    }

    return () => {
      clearTimeout(typingTimer)
      clearTimeout(closeTimer)
    }
  }, [typedText])

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-2xl font-semibold"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
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
    </AnimatePresence>
  )
}
