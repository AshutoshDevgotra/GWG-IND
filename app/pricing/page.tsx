"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const tiers = [
  {
    name: "Starter",
    price: "499",
    description: "Perfect for small businesses just starting their brand journey",
    features: [
      "Brand Identity Analysis",
      "Basic Marketing Strategy",
      "Social Media Setup",
      "Monthly Performance Report",
      "Email Support"
    ],
    highlighted: false
  },
  {
    name: "Professional",
    price: "999",
    description: "Ideal for growing businesses seeking comprehensive branding",
    features: [
      "Everything in Starter",
      "Custom Brand Guidelines",
      "Advanced Marketing Campaigns",
      "Basic AI Chatbot Integration",
      "Content Strategy",
      "Weekly Strategy Calls",
      "Priority Support"
    ],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "1,999",
    description: "Full-scale solution for established businesses",
    features: [
      "Everything in Professional",
      "Custom AI Solutions",
      "Advanced Analytics Dashboard",
      "Market Research Reports",
      "Competitor Analysis",
      "24/7 Priority Support",
      "Quarterly Strategy Review",
      "Custom Integration Solutions"
    ],
    highlighted: false
  }
];

export default function PricingPage() {
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = async (tier: typeof tiers[0]) => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      toast.error('Payment system is loading. Please try again in a moment.');
      return;
    }

    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseInt(tier.price.replace(",", "")) * 100, // Amount in paise
        currency: "INR",
        name: "BrandCraft",
        description: `${tier.name} Plan Subscription`,
        handler: function(response: any) {
          toast.success("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#000000"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      toast.error('Failed to initialize payment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary pt-24 pb-48 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">
              Transparent Pricing for Your Growth
            </h1>
            <p className="text-xl text-black/80 max-w-2xl mx-auto">
              Choose the perfect plan to transform your brand and accelerate your business growth
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-8 relative ${
                tier.highlighted
                  ? "border-2 border-primary shadow-xl scale-105"
                  : "bg-white"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-black text-sm font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">₹{tier.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </div>
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                className={`w-full ${
                  tier.highlighted ? "" : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => handlePayment(tier)}
              >
                Buy Now
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Can I switch plans later?
            </h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Is there a minimum contract period?
            </h3>
            <p className="text-gray-600">
              No, all our plans are month-to-month with no long-term commitments required.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Do you offer custom solutions?
            </h3>
            <p className="text-gray-600">
              Yes, for enterprises with specific needs, we can create custom packages. Contact our sales team for details.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already elevated their brand with our services
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" size="lg">
              Contact Sales
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-black hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}