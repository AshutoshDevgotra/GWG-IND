"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link: string
  badge?: string
  color: "indigo" | "blue" | "purple" | "green" | "red" | "yellow" | "pink"
}

const colorVariants = {
  indigo: {
    gradient: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/20",
    iconBg: "from-indigo-500/20 to-purple-500/20",
    badgeBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  },
  blue: {
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    iconBg: "from-blue-500/20 to-cyan-500/20",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  purple: {
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/20",
    iconBg: "from-purple-500/20 to-pink-500/20",
    badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  },
  green: {
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20",
    iconBg: "from-green-500/20 to-emerald-500/20",
    badgeBg: "bg-green-500/10 border-green-500/20 text-green-400",
  },
  red: {
    gradient: "from-red-500/20 to-pink-500/20",
    border: "border-red-500/20",
    iconBg: "from-red-500/20 to-pink-500/20",
    badgeBg: "bg-red-500/10 border-red-500/20 text-red-400",
  },
  yellow: {
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/20",
    iconBg: "from-yellow-500/20 to-orange-500/20",
    badgeBg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  },
  pink: {
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    iconBg: "from-pink-500/20 to-rose-500/20",
    badgeBg: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  },
}

export function ProductCard({ title, description, icon, link, badge, color }: ProductCardProps) {
  const colors = colorVariants[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradient} rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      <Card
        className={`relative bg-gray-900/80 backdrop-blur-sm border-0 ${colors.border} p-8 h-full hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative z-10">
          {badge && (
            <div className={`inline-block mb-4 px-3 py-1 rounded-full ${colors.badgeBg} border text-sm font-medium`}>
              {badge}
            </div>
          )}

          <div className={`bg-gradient-to-r ${colors.iconBg} rounded-xl p-3 inline-block mb-6`}>{icon}</div>

          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className={`${colors.border} text-white hover:bg-white/5 transition-all duration-300 group/btn`}
            >
              Learn More
              <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}
