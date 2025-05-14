"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, CheckCircle2 } from "lucide-react"
import { initializeRazorpay, createRazorpayOrder, handlePayment as processPayment } from "../lib/razorpay"

interface RazorpayCheckoutProps {
  plan: string
  onClose: () => void
}

export function RazorpayCheckout({ plan, onClose }: RazorpayCheckoutProps) {
  const [step, setStep] = useState<"details" | "payment" | "success">("details")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })

  const planDetails = {
    basic: { name: "Basic Landing Page", amount: 1250, fullAmount: 5000 },
    premium: { name: "Premium Website", amount: 3000, fullAmount: 12000 },
    instant: { name: "Instant Consultation", amount: 500, fullAmount: 500 },
  }

  const selectedPlan = planDetails[plan as keyof typeof planDetails]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
    startPayment()
  }

  const startPayment = async () => {
    try {
      await initializeRazorpay()

      const order = await createRazorpayOrder(selectedPlan.amount)

      await processPayment({
        amount: selectedPlan.amount,
        orderId: order.id,
        onSuccess: (response: any) => {
          console.log("Payment successful", response)
          setStep("success")
        },
        onError: (error: any) => {
          console.error("Payment failed", error)
          alert("Payment failed. Please try again.")
        },
      })
    } catch (err) {
      console.error("Razorpay init or order creation failed", err)
      alert("Something went wrong while initiating payment.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border border-indigo-500/20 w-full max-w-md relative overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur"></div>
        <div className="relative p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>

          {step === "details" && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{selectedPlan.name}</h3>
                <p className="text-gray-400">
                  Pay ₹{selectedPlan.amount.toLocaleString()}
                  {selectedPlan.amount !== selectedPlan.fullAmount && (
                    <span> (₹{selectedPlan.fullAmount.toLocaleString()} total)</span>
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
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
                  Continue to Payment
                </Button>
              </form>
            </>
          )}

          {step === "payment" && (
            <div className="text-center py-6">
              <p className="text-white text-sm">Redirecting to secure Razorpay checkout...</p>
            </div>
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
              <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-gray-400 mb-6">
                Thank you for your payment of ₹{selectedPlan.amount.toLocaleString()}. We&apos;ll get started on your project
                right away.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
