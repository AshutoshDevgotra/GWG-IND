"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, CheckCircle2 } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"

interface InstantCallModalProps {
  onClose: () => void
}

export function InstantCallModal({ onClose }: InstantCallModalProps) {
  const [step, setStep] = useState<"form" | "confirmation" | "success">("form")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("confirmation")
  }

  const handleConfirm = () => {
    setStep("success")
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border border-indigo-500/20 w-full max-w-md relative overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur"></div>
        <div className="relative p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>

          {step === "form" && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Get an Instant Call</h3>
                <p className="text-gray-400">Our expert will call you within 30 minutes</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                    className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-500/20"
                >
                  Request Call
                </Button>
              </form>
            </>
          )}

          {step === "confirmation" && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Confirm Your Request</h3>
                <p className="text-gray-400">Our expert will call you at {formData.phone} within the next 30 minutes</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Name:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Phone:</span>
                  <span>{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expected Call:</span>
                  <span>Within 30 minutes</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep("form")}
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-500/20"
                >
                  Confirm
                </Button>
              </div>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-indigo-500/20 rounded-full blur"></div>
                  <div className="relative bg-green-500/20 p-4 rounded-full">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Call Request Confirmed!</h3>
              <p className="text-gray-400 mb-6">
                Our expert will call you within 30 minutes. Please keep your phone handy.
              </p>

              <div className="flex justify-center mb-6">
                <CountdownTimer minutes={30} seconds={0} />
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Request ID:</span>
                  <span>CALL{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-500">Pending</span>
                </div>
              </div>

              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-500/20"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
