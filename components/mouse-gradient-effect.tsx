"use client"

import { useEffect, useState } from "react"

export function MouseGradientEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Main mouse gradient */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, 
            rgba(99, 102, 241, 0.3) 0%, 
            rgba(168, 85, 247, 0.2) 25%, 
            rgba(59, 130, 246, 0.1) 50%, 
            transparent 70%
          )`,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          filter: "blur(40px)",
        }}
      />

      {/* Secondary gradient with delay */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-15 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle, 
            rgba(168, 85, 247, 0.4) 0%, 
            rgba(236, 72, 153, 0.3) 30%, 
            rgba(59, 130, 246, 0.2) 60%, 
            transparent 80%
          )`,
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          filter: "blur(30px)",
        }}
      />

      {/* Tertiary small gradient */}
      <div
        className="absolute w-32 h-32 rounded-full opacity-25 transition-all duration-200 ease-out"
        style={{
          background: `radial-gradient(circle, 
            rgba(99, 102, 241, 0.5) 0%, 
            rgba(168, 85, 247, 0.3) 40%, 
            transparent 70%
          )`,
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          filter: "blur(20px)",
        }}
      />

      {/* Grid pattern overlay that follows mouse */}
      <div
        className="absolute w-screen h-screen opacity-5 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      />
    </div>
  )
}
