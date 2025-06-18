"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: "indigo" | "blue" | "purple" | "green" | "red" | "yellow" | "pink"
}

const colorVariants = {
  indigo: {
    gradient: "from-indigo-500/10 to-purple-500/10",
    iconBg: "from-indigo-500/20 to-purple-500/20",
    hoverGlow: "hover:shadow-indigo-500/10",
  },
  blue: {
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconBg: "from-blue-500/20 to-cyan-500/20",
    hoverGlow: "hover:shadow-blue-500/10",
  },
  purple: {
    gradient: "from-purple-500/10 to-pink-500/10",
    iconBg: "from-purple-500/20 to-pink-500/20",
    hoverGlow: "hover:shadow-purple-500/10",
  },
  green: {
    gradient: "from-green-500/10 to-emerald-500/10",
    iconBg: "from-green-500/20 to-emerald-500/20",
    hoverGlow: "hover:shadow-green-500/10",
  },
  red: {
    gradient: "from-red-500/10 to-pink-500/10",
    iconBg: "from-red-500/20 to-pink-500/20",
    hoverGlow: "hover:shadow-red-500/10",
  },
  yellow: {
    gradient: "from-yellow-500/10 to-orange-500/10",
    iconBg: "from-yellow-500/20 to-orange-500/20",
    hoverGlow: "hover:shadow-yellow-500/10",
  },
  pink: {
    gradient: "from-pink-500/10 to-rose-500/10",
    iconBg: "from-pink-500/20 to-rose-500/20",
    hoverGlow: "hover:shadow-pink-500/10",
  },
}

export function ServiceCard({ title, description, icon, color }: ServiceCardProps) {
  const colors = colorVariants[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card
        className={`bg-gradient-to-br from-gray-900 to-gray-950 border-0 p-8 h-full hover:shadow-lg ${colors.hoverGlow} transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        ></div>
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
        ></div>

        <div className="relative z-10">
          <div className={`bg-gradient-to-r ${colors.iconBg} rounded-xl p-3 inline-block mb-4`}>{icon}</div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
      </Card>
    </motion.div>
  )
}
