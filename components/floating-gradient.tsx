"use client"

import { motion } from "framer-motion"

export function FloatingGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 rounded-full filter blur-2xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Additional smaller floating elements */}
      <motion.div
        className="absolute top-3/4 left-1/3 w-32 h-32 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full filter blur-xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/6 right-1/6 w-40 h-40 bg-gradient-to-r from-cyan-600/15 to-blue-600/15 rounded-full filter blur-2xl"
        animate={{
          x: [0, -70, 0],
          y: [0, 40, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  )
}
