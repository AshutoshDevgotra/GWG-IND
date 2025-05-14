"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2 } from "lucide-react"

interface BidFormProps {
  projectType: "website" | "ecommerce" | "webapp"
}

export function BidForm({ projectType }: BidFormProps) {
  const [bidAmount, setBidAmount] = useState(5000)
  const [submitted, setSubmitted] = useState(false)

  const minBid = {
    website: 3000,
    ecommerce: 8000,
    webapp: 10000,
  }

  const maxBid = {
    website: 10000,
    ecommerce: 20000,
    webapp: 25000,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-indigo-500/20 rounded-full blur"></div>
            <div className="relative bg-green-500/20 p-4 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Bid Submitted!</h3>
        <p className="text-gray-400 mb-6">
          Thank you for your bid of ₹{bidAmount.toLocaleString()} We'll review your proposal and get back to you within
          24 hours.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-500/20"
        >
          Submit Another Bid
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            required
            className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            required
            className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-black"
          />
        </div>
      </div>

      <div>
        <label htmlFor="project-description" className="block text-sm font-medium text-gray-300 mb-1">
          Project Description
        </label>
        <Textarea
          id="project-description"
          placeholder="Describe your project requirements"
          required
          className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-black min-h-[120px]"
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor="bid-amount" className="block text-sm font-medium text-gray-300">
            Your Bid Amount (₹)
          </label>
          <span className="text-indigo-400 font-semibold">₹{bidAmount.toLocaleString()}</span>
        </div>
        <Slider
          id="bid-amount"
          min={minBid[projectType]}
          max={maxBid[projectType]}
          step={500}
          value={[bidAmount]}
          onValueChange={(value) => setBidAmount(value[0])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Min: ₹{minBid[projectType].toLocaleString()}</span>
          <span>Max: ₹{maxBid[projectType].toLocaleString()}</span>
        </div>
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-1">
          Expected Timeline (days)
        </label>
        <Input
          id="timeline"
          type="number"
          min="1"
          placeholder="Number of days"
          required
          className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-black"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 border border-blue-500/20"
      >
        Submit Your Bid
      </Button>
    </form>
  )
}
