"use client"
import { Instagram, Linkedin, Twitter, TwitterIcon } from "lucide-react";
import { InstagramIcon } from "lucide-react";
import { LinkedinIcon } from "lucide-react";
import { YoutubeIcon } from "lucide-react";



import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronRight,
  Check,
  Phone,
  ArrowRight,
  Code,
  Zap,
  Clock,
  Shield,
  Database,
  CheckCircle2,
  Headphones,
  Sparkles,
  Users,
  Award,
  Youtube,
  Laptop,
  Bot,
  Mail,
} from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CircuitBoardPattern } from "@/components/circuit-board-pattern"
import { FloatingGradient } from "@/components/floating-gradient"
import { MouseGradientEffect } from "@/components/mouse-gradient-effect"
import { NewsletterForm } from "@/components/newsletter-form"
import { ContactForm } from "@/components/contact-form"
import { ProductCard } from "@/components/product-card"
import { ServiceCard } from "@/components/service-card"

import { RazorpayCheckout } from "@/components/razorpay-checkout"
import { CountdownTimer } from "@/components/countdown-timer"
import { TechLogos } from "@/components/tech-logos"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [currentPlan, setCurrentPlan] = useState("basic")

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  const handlePaymentClick = (plan: string) => {
    setCurrentPlan(plan)
    setShowPaymentModal(true)
  }

  const handleInstantCallClick = () => {
    setShowCallModal(true)
  }

  return (
    <div className="min-h-screen bg-[#050714] text-white overflow-hidden">
      {/* Mouse Gradient Effect */}
      <MouseGradientEffect />

      {/* Circuit Board Background Pattern */}
      <CircuitBoardPattern className="fixed inset-0 opacity-5 pointer-events-none" />

      {/* Navbar
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              <span className="font-bold text-xl relative z-10">G</span>
            </div>
            <span className="font-bold text-xl">GrowWithGarry.in</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#portfolio" className="text-gray-300 hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
              Careers
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 transition-all duration-300 hidden md:flex"
              onClick={handleInstantCallClick}
            >
              <Phone className="h-4 w-4 mr-2 text-white" />
              Instant Call
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 border border-indigo-500/20">
              Get Started
            </Button>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-24 md:py-32">
        {/* Floating Gradient Elements */}
        <FloatingGradient />

        {/* Tech Elements */}
        <div
          className="absolute top-20 left-10 opacity-20 hidden lg:block"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        >
          <Code className="w-16 h-16 text-indigo-400" />
        </div>
        <div
          className="absolute bottom-20 right-10 opacity-20 hidden lg:block"
          style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
        >
          <Database className="w-16 h-16 text-purple-400" />
        </div>

        {/* 3D Geometric Shapes */}
        <div className="absolute -top-10 -right-10 w-40 h-40 opacity-30 hidden lg:block">
          <div className="w-full h-full border border-indigo-500/30 rounded-lg transform rotate-45"></div>
          <div className="w-full h-full border border-purple-500/30 rounded-lg transform rotate-12 absolute top-0"></div>
          <div className="w-full h-full border border-blue-500/30 rounded-lg transform -rotate-12 absolute top-0"></div>
        </div>

        <div className="absolute -bottom-10 -left-10 w-40 h-40 opacity-30 hidden lg:block">
          <div className="w-full h-full border border-indigo-500/30 rounded-full"></div>
          <div className="w-full h-full border border-purple-500/30 rounded-full transform scale-75 absolute top-0"></div>
          <div className="w-full h-full border border-blue-500/30 rounded-full transform scale-50 absolute top-0"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
            style={{ opacity, scale }}
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <span className="mr-2">🚀</span> Next-Gen Web Development
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 leading-tight">
              Elevate Your Brand with Custom Digital Experiences
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              We build stunning websites, e-commerce platforms, and SaaS solutions for Indian brands, content creators,
              and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 text-lg py-6 px-8 rounded-xl border border-indigo-500/20 group"
                onClick={() => handlePaymentClick("basic")}
              >
                Pay ₹1250 & Start Now
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/10  hover:bg-white/5 text-lg py-6 px-8 rounded-xl transition-all duration-300"
                onClick={handleInstantCallClick}
              >
                <Headphones className="mr-2 h-5 w-5" />
                Get Instant Call
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                48hr Delivery
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                100% Satisfaction
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                24/7 Support
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 max-w-6xl mx-auto relative px-4"
      >
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050714] z-10 h-1/4 bottom-0"></div>

        <div className="relative">
          {/* Outer blur glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-30 blur-sm"></div>

          {/* Inner container */}
          <div className="relative bg-gray-900/80 backdrop-blur-sm p-1 rounded-xl border border-indigo-500/20 overflow-hidden">
            {/* Clickable wrapper */}
            <a href="https://creatorhub-outx.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
              <iframe
                src="https://creatorhub-outx.vercel.app/"
                title="Website Mockup"
                className="w-full h-[700px] rounded-lg"
                style={{ border: "none" }}
              />
            </a>

            {/* Optional code effect overlay */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover opacity-5 mix-blend-overlay pointer-events-none"></div>
          </div>
        </div>
      </motion.div>

      {/* Special Offer for Content Creators - NEW */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">
                  <Youtube className="h-4 w-4 inline mr-1" /> Content Creator Special
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">20% OFF Portfolio Websites for Content Creators</h2>
                <p className="text-gray-300 mb-6">
                  Are you a YouTuber, Instagram influencer, or content creator? Get a stunning portfolio website
                  starting at just ₹1100 with our special creator discount!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:bg-pink-700 transition-all duration-300 border border-pink-500/20"
                    onClick={() => handlePaymentClick("creator")}
                  >
                    Claim Your 20% Discount
                  </Button>
                  <div className="flex items-center text-gray-400 text-sm">
                    <CountdownTimer minutes={30} seconds={0} />
                    <span className="ml-2">until offer expires</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur"></div>
                  <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20 text-center">
                    <Youtube className="h-16 w-16 mx-auto mb-4 text-pink-400" />
                    <div className="text-xl font-bold mb-2">Portfolio Website</div>
                    <div className="text-gray-400 mb-4">Starting at just ₹1100</div>
                    <div className="flex justify-center">
                      <div className="flex items-center gap-1 text-sm">
                        <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></div>
                        <span className="text-pink-400">Limited time offer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Products Section - NEW */}
      <section id="products" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                Our Innovative Products
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our suite of digital products designed to solve real problems
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ProductCard
              title="CreatorHub"
              description="A platform connecting Indian brands with content creators for authentic marketing collaborations."
              icon={<Users className="h-8 w-8 text-indigo-400" />}
              link="https://creatorhub-outx.vercel.app/"
              badge="Featured on Product Hunt"
              color="indigo"
            />

            <ProductCard
              title="NyaySetu"
              description="Making legal services accessible to all Indians through technology and simplified processes."
              icon={<Shield className="h-8 w-8 text-blue-400" />}
              link="#"
              badge="Coming Soon"
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* Services Section - NEW */}
      <section id="services" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored for Indian businesses and creators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ServiceCard
              title="Custom E-commerce"
              description="Build your brand's custom e-commerce platform with personalized storytelling and seamless shopping experiences."
              icon={<Laptop className="h-8 w-8 text-blue-400" />}
              color="blue"
            />

            <ServiceCard
              title="Creator Portfolios"
              description="Showcase your content and attract brand deals with a professional portfolio website designed for YouTubers and influencers."
              icon={<Youtube className="h-8 w-8 text-red-400" />}
              color="red"
            />

            <ServiceCard
              title="SaaS Development"
              description="Transform your business idea into a scalable SaaS product with our end-to-end development services."
              icon={<Code className="h-8 w-8 text-green-400" />}
              color="green"
            />

            <ServiceCard
              title="AI Chatbots"
              description="Implement intelligent chatbots trained on your business data to enhance customer service and engagement."
              icon={<Bot className="h-8 w-8 text-purple-400" />}
              color="purple"
            />

            <ServiceCard
              title="Email Marketing"
              description="Design and implement effective email campaigns that convert leads into loyal customers."
              icon={<Mail className="h-8 w-8 text-yellow-400" />}
              color="yellow"
            />

            <ServiceCard
              title="UX/UI Design"
              description="Create intuitive, beautiful interfaces that delight users and drive business results."
              icon={<Sparkles className="h-8 w-8 text-pink-400" />}
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                The GrowWithGarry Advantage
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              What makes our development process unique and powerful
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Zap className="h-8 w-8 text-indigo-400" />,
                title: "AI-Enhanced Development",
                description:
                  "We leverage cutting-edge AI tools to accelerate development while maintaining quality, reducing costs and time-to-market.",
              },
              {
                icon: <Clock className="h-8 w-8 text-purple-400" />,
                title: "48-Hour Turnaround",
                description:
                  "Most landing pages are delivered within 48 hours of payment, getting your business online faster than traditional agencies.",
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-400" />,
                title: "Future-Proof Technology",
                description:
                  "Built with the latest tech stack ensuring your site remains fast, secure and scalable as your business grows.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-0 p-8 h-full hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                  <div className="relative z-10">
                    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-3 inline-block mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 to-purple-900/5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with the latest and most powerful technologies for performance and scalability
            </p>
          </motion.div>

          <TechLogos />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What&apos;s Included (₹5000 Plan)</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to launch your online presence with a professional landing page
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Custom Designed Landing Page",
                description: "Professionally designed landing page tailored to your brand and business goals.",
              },
              {
                title: "Email List Storage",
                description: "Integrate with Firestore, Mailchimp, or custom database for lead collection.",
              },
              {
                title: "Database Integration",
                description: "Connect to Firestore, Firebase, AWS, or other database solutions for data management.",
              },
              {
                title: "Razorpay Payment Button",
                description: "Accept payments directly on your site with secure Razorpay integration.",
              },
              {
                title: "Responsive, Fast, SEO-Friendly",
                description: "Optimized for all devices, lightning-fast loading, and search engine visibility.",
              },
              {
                title: "Add-on: Chatbots, LLMs, Auth",
                description: "Optional AI chatbots, language models, and authentication systems available.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-0 p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden group h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-2 mt-1">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Flexible options to suit your business needs and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-70"></div>
              <div className="relative bg-gray-900/80 p-8 rounded-xl backdrop-blur-sm border border-indigo-500/20 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2">Basic Landing Page</h3>
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                  ₹5,000
                </div>
                <p className="text-gray-400 mb-6">Pay just ₹1,250 upfront</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Single page design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Mobile responsive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Contact form with Firestore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Basic SEO setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>48-hour delivery</span>
                  </li>
                </ul>
                <Button
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-500/20 w-full"
                  onClick={() => handlePaymentClick("basic")}
                >
                  Pay ₹1,250 Now
                </Button>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl blur opacity-80"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl opacity-80"></div>
              <div className="relative bg-gray-900/80 p-8 rounded-xl backdrop-blur-sm border border-purple-500/30 h-full flex flex-col">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Website</h3>
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400">
                  ₹12,000
                </div>
                <p className="text-gray-400 mb-6">Pay just ₹3,000 upfront</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Multi-page website (up to 5 pages)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Advanced design & animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Blog/content management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Payment integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Advanced SEO optimization</span>
                  </li>
                </ul>
                <Button
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-purple-500/20 w-full"
                  onClick={() => handlePaymentClick("premium")}
                >
                  Pay ₹3,000 Now
                </Button>
              </div>
            </motion.div>

            {/* Custom Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur opacity-70"></div>
              <div className="relative bg-gray-900/80 p-8 rounded-xl backdrop-blur-sm border border-blue-500/20 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2">Custom Solution</h3>
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Custom
                </div>
                <p className="text-gray-400 mb-6">25% upfront payment</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Custom web application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>E-commerce functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>User authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Custom database integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Ongoing support available</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="border-blue-500/20 text-white bg-blue-500/10 transition-all duration-300 w-full"
                  onClick={handleInstantCallClick}
                >
                  Get Custom Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Check out some of our recent projects</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "TechGuru E-Commerce",
                tag: "eCommerce",
                image: "/placeholder.svg?height=300&width=400",
                description: "A modern e-commerce platform for a tech gadget retailer with 200+ products.",
              },
              {
                title: "CloudSync Dashboard",
                tag: "SaaS",
                image: "/placeholder.svg?height=300&width=400",
                description: "Admin dashboard for a cloud storage service with real-time analytics.",
              },
              {
                title: "CreativeMinds Agency",
                tag: "Agency",
                image: "/placeholder.svg?height=300&width=400",
                description: "Brand website for a creative agency showcasing their portfolio and services.",
              },
              {
                title: "DesignMaster Portfolio",
                tag: "Portfolio",
                image: "/placeholder.svg?height=300&width=400",
                description: "Personal portfolio for a UI/UX designer with interactive project showcases.",
              },
              {
                title: "SpiceRoute Restaurant",
                tag: "Booking",
                image: "/placeholder.svg?height=300&width=400",
                description: "Restaurant website with online booking system and menu management.",
              },
              {
                title: "LearnQuest Academy",
                tag: "EdTech",
                image: "/placeholder.svg?height=300&width=400",
                description: "Educational platform with course management and student progress tracking.",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative border border-indigo-500/10 rounded-xl overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="inline-block px-3 py-1 bg-indigo-500/30 backdrop-blur-sm rounded-full text-sm mb-2 border border-indigo-500/20">
                        {project.tag}
                      </span>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-indigo-600/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                      <p className="text-white mb-4 text-center">{project.description}</p>
                      <Button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                        View Project
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="border-indigo-500/20 text-white bg-indigo-500/10 text-lg py-6 px-8 rounded-xl transition-all duration-300"
              >
                View Full Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - NEW */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 backdrop-blur-sm border border-indigo-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-300 mb-6">
                  Get the latest web development tips, trends, and special offers delivered directly to your inbox.
                </p>
              </div>
              <div className="flex-1">
                <NewsletterForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur"></div>
              <div className="relative bg-gray-900/80 p-8 md:p-12 rounded-xl backdrop-blur-sm border border-indigo-500/20">
                <h2 className="text-3xl font-bold text-center mb-4">Request a Custom Quote</h2>
                <p className="text-gray-400 text-center mb-8">
                  Tell us about your project and we&apos;ll get back to you within 24 hours
                </p>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need help choosing a package?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-lg py-6 px-8 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                </svg>
                Chat with us on WhatsApp
              </Button>
              <Button
                variant="outline"
                className="border-indigo-500/20 text-white bg-indigo-500/10 text-lg py-6 px-8 rounded-xl transition-all duration-300 flex items-center gap-2"
                onClick={handleInstantCallClick}
              >
                <Phone className="h-5 w-5" />
                Get Instant Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Shield className="h-8 w-8 text-indigo-400" />, text: "Secure Payments" },
                { icon: <Clock className="h-8 w-8 text-purple-400" />, text: "48hr Delivery" },
                { icon: <Users className="h-8 w-8 text-blue-400" />, text: "200+ Happy Clients" },
                { icon: <Award className="h-8 w-8 text-green-400" />, text: "100% Satisfaction" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full p-4 mb-3">
                    {badge.icon}
                  </div>
                  <div className="text-gray-300">{badge.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030510] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                  <Image src="/logo.png" alt="GwG Logo" width={40} height={40} className='rounded-full' />
                </div>
                <span className="font-bold text-xl">GrowWithGarry.in</span>
              </div>
              <p className="text-gray-400 mb-6">
                Professional web development services for Indian brands, content creators, and businesses.
              </p>
             <div className="flex gap-4">
  <a
    href="https://twitter.com/ashutosh1979853"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-colors"
  >
    <span className="sr-only">Twitter</span>
    <Twitter className="h-5 w-5 text-white" />
  </a>

  <a
    href="https://instagram.com/growwithgarry"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors"
  >
    <span className="sr-only">Instagram</span>
    <Instagram className="h-5 w-5 text-white" />
  </a>

  <a
    href="https://www.linkedin.com/in/ashutosh-devgotra-284057269/"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
  >
    <span className="sr-only">LinkedIn</span>
    <Linkedin className="h-5 w-5 text-white" />
  </a>

  <a
    href="https://youtube.com/@growwithgarry"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
  >
    <span className="sr-only">YouTube</span>
    <Youtube className="h-5 w-5 text-white" />
  </a>
</div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Landing Pages
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    E-Commerce
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    SaaS Development
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    AI Chatbots
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/interns" className="text-gray-400 hover:text-white transition-colors">
                    Our Interns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="text-gray-400">connect@growwithgarry.in</li>
                <li className="text-gray-400">+91 9877292856</li>
                <li className="text-gray-400">Jalandhar,India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} GrowWithGarry.in. All rights reserved.</p>
          </div>
        </div>
        {/* Product Hunt Badge */}
        <div className="mt-8 flex justify-center md:justify-start ml-2 left-2 ">
          <div>
            <Link
              href="https://www.producthunt.com/products/creatorhub-by-growwithgarry?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-creatorhub&#0045;by&#0045;growwithgarry"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=976125&theme=light&t=1749469730629"
                alt="CreatorHub by GrowWithGarry - India's fastest way to connect brands & creators | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="#"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-full p-4 shadow-lg z-50 flex items-center justify-center group"
      >
        <div className="absolute -inset-1 bg-green-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 relative z-10"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
        </svg>
        <span className="sr-only">Chat on WhatsApp</span>
      </a>

      {/* Razorpay Payment Modal */}
      {showPaymentModal && <RazorpayCheckout plan={currentPlan} onClose={() => setShowPaymentModal(false)} />}

    
    </div>
  )
}
