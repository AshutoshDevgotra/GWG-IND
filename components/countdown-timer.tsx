"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  minutes: number
  seconds: number
}

export function CountdownTimer({ minutes, seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds)

  useEffect(() => {
    if (timeLeft <= 0) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const displayMinutes = Math.floor(timeLeft / 60)
  const displaySeconds = timeLeft % 60

  return (
    <div className="flex items-center gap-1 font-mono text-sm">
      <div className="bg-red-500/20 px-2 py-1 rounded border border-red-500/30">
        {displayMinutes.toString().padStart(2, "0")}
      </div>
      <span className="text-red-400">:</span>
      <div className="bg-red-500/20 px-2 py-1 rounded border border-red-500/30">
        {displaySeconds.toString().padStart(2, "0")}
      </div>
    </div>
  )
}
