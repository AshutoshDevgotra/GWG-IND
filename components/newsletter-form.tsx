"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Mail, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Add email to Firestore
      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        subscribedAt: new Date(),
        source: "website_newsletter",
      })

      setIsSuccess(true)
      setEmail("")

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (err) {
      setError("Failed to subscribe. Please try again.")
      console.error("Newsletter subscription error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl"
      >
        <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
        <span className="text-green-400 font-medium">Successfully subscribed!</span>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white placeholder:text-gray-400"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 border border-indigo-500/20 px-8"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <p className="text-gray-400 text-sm">Join 1000+ subscribers. No spam, unsubscribe anytime.</p>
    </form>
  )
}
