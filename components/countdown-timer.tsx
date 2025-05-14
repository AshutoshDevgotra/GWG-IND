"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  minutes: number
  seconds: number
}

export function CountdownTimer({ minutes, seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    minutes,
    seconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 }
        } else if (prevTime.minutes > 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 }
        } else {
          clearInterval(timer)
          return prevTime
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1 rounded-full border border-indigo-500/20">
      <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
      <span>
        {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  )
}
