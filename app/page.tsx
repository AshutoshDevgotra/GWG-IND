"use client";

import { useState, useEffect } from "react";
import { Menu, X, Building2, Megaphone, Bot, ChevronRight, Github, Twitter, Linkedin, Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SubscribeForm } from "@/components/subscribe-form";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Microsoft Azure Division",
    content: "The brand building services transformed our cloud solutions completely. Their innovative approach sets them apart.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, AWS",
    content: "Their AI solutions helped us automate our enterprise systems with remarkable efficiency.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    name: "Emma Williams",
    role: "Founder, Tesla AI",
    content: "The marketing strategies they implemented revolutionized our approach to AI integration.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  }
];

const brands = ["Microsoft", "Amazon", "Google", "Tesla", "IBM", "Oracle"];

// ... keep existing code (slides array)
   const slides = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2070&h=600",
  "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2070&h=600",
  "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=2070&h=600"
];


export default function HomePage() {
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000);
  return () => clearInterval(timer);
}, []);

return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section with Slider */}
      <div className="relative h-[600px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                  <div className="text-white animate-fade-in">
                    <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                      Transform Your Brand
                    </h1>
                    <p className="text-xl mb-8 text-gray-300 animate-fade-in opacity-0 [animation-delay:200ms]">
                      Innovative solutions for brand building, marketing, and AI integration
                    </p>
                    <a href="/experts">
                      <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105">
                        Get Started <ChevronRight className="ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
         {/* Brands Marquee */}
         <div className="bg-[#111111] py-12 overflow-hidden">
        <div className="animate-fade-up opacity-0 [animation-delay:400ms]">
          <h3 className="text-2xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Trusted by Industry Leaders
          </h3>
          <div className="flex space-x-12 animate-[scroll_25s_linear_infinite]">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="flex items-center min-w-[200px]">
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

  {/* Services Section */}
  <section id="services" className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Brand Building", desc: "Create a powerful brand identity that resonates with your audience." },
              { icon: Megaphone, title: "Marketing", desc: "Strategic marketing solutions to grow your business." },
              { icon: Bot, title: "AI Agents", desc: "Custom AI solutions to automate and enhance your operations." }
            ].map((service, index) => (
              <Card key={index} className="p-6 bg-gradient-to-b from-gray-900 to-black border-gray-800 hover:border-transparent transition-all duration-500 transform hover:scale-105 group hover:bg-gradient-to-br hover:from-purple-900 hover:via-rose-800 hover:to-green-800">
                <service.icon className="h-12 w-12 mb-4 text-blue-400 group-hover:text-white transition-colors duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-200">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-gradient-to-b from-gray-900 to-black border-gray-800 hover:border-transparent transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-900 hover:via-purple-900 hover:to-rose-900">
                <Quote className="h-8 w-8 mb-4 text-blue-400 opacity-50" />
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-400"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8">Subscribe to our newsletter for the latest updates and insights.</p>
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">GwG</span>
              </div>
              <p className="text-gray-400">Transform your brand with our innovative solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Brand Building</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Marketing</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">AI Agents</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-300 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Careers</li>
                <a href="/contact"><li className="hover:text-blue-300 transition-colors cursor-pointer">Contact</li></a>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Connect</h3>
              <div className="flex space-x-4">
                <a href="" className="text-gray-400 hover:text-blue-300 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/ashutosh-devgotra-284057269/" className="text-gray-400 hover:text-blue-300 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://github.com/AshutoshDevgotra" className="text-gray-400 hover:text-blue-300 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BrandCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

