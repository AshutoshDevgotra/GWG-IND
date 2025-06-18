"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface FormData {
  name: string
  email: string
  phone: string
  websiteType: string
  budget: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    websiteType: "Landing Page",
    budget: "₹5,000 - ₹10,000",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Add form data to Firestore
      await addDoc(collection(db, "contact_forms"), {
        ...formData,
        submittedAt: new Date(),
        source: "website_contact",
        status: "new",
      })

      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        websiteType: "Landing Page",
        budget: "₹5,000 - ₹10,000",
        message: "",
      })

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError("Failed to submit form. Please try again.")
      console.error("Contact form submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-green-400 mb-2">Thank You!</h3>
        <p className="text-gray-300"> We&apos;ll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor="websiteType" className="block text-sm font-medium text-gray-300 mb-1">
            Type of Website
          </label>
          <select
            id="websiteType"
            name="websiteType"
            value={formData.websiteType}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white py-2 px-3"
          >
            <option>Landing Page</option>
            <option>E-Commerce</option>
            <option>Portfolio</option>
            <option>SaaS</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
          Budget
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white py-2 px-3"
        >
          <option>₹5,000 - ₹10,000</option>
          <option>₹10,000 - ₹25,000</option>
          <option>₹25,000 - ₹50,000</option>
          <option>₹50,000+</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project"
          value={formData.message}
          onChange={handleChange}
          required
          className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white placeholder:text-gray-400 min-h-[120px]"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 w-full py-6 text-lg rounded-xl border border-indigo-500/20"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Quote"
        )}
      </Button>
    </form>
  )
}
