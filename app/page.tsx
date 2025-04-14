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

const slides = [
  "/images/Ux-banner.jpg",
  "/images/personal-brand.jpg",
  "/images/website-business.jpg",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    
    <div className="min-h-screen bg-black">
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
                    <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-[#e8c288] ">
                      Transform Your Brand
                    </h1>
                    <p className="text-xl mb-8 text-white animate-fade-in opacity-0 [animation-delay:200ms]">
                      Innovative solutions for brand building, marketing, and AI integration
                    </p>
                    <a href="/experts">
                      <Button size="lg" className="bg-[#227002] hover:from-[#227002] hover:to-[#e8c288] text-white transition-all duration-300 transform hover:scale-105">
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
          <h3 className="text-2xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-[#e8c288] ">
            Trusted by Industry Leaders
          </h3>
          <div className="flex space-x-12 animate-[scroll_25s_linear_infinite]">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="flex items-center min-w-[200px]">
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-[#e8c288] ">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className={`text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[#e8c288]  transform transition-all duration-700 ${
              scrollY > 300 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Brand Building", desc: "Create a powerful brand identity that resonates with your audience." },
              { icon: Megaphone, title: "Marketing", desc: "Strategic marketing solutions to grow your business." },
              { icon: Bot, title: "AI Agents", desc: "Custom AI solutions to automate and enhance your operations." }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`p-6 bg-gradient-to-b from-black to-[#111111] border-[#e8c288]/30 hover:border-[#e8c288] transition-all duration-500 transform hover:scale-105 group hover:shadow-[0_0_15px_rgba(232,194,136,0.3)] ${
                  scrollY > 400 ? `opacity-100 translate-y-0 [transition-delay:${index * 200}ms]` : "opacity-0 translate-y-10"
                }`}
              >
                <service.icon className="h-12 w-12 mb-4 text-[#e8c288] group-hover:text-[#227002] transition-colors duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400 group-hover:text-white">{service.desc}</p>
                <div className="mt-4 w-0 group-hover:w-full h-0.5 bg-[#e8c288] transition-all duration-500"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className={`text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[#e8c288]  transform transition-all duration-700 ${
              scrollY > 600 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`p-6 bg-black border border-[#227002]/30 hover:border-[#227002] transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(34,112,2,0.3)] ${
                  scrollY > 700 ? `opacity-100 translate-y-0 [transition-delay:${index * 200}ms]` : "opacity-0 translate-y-10"
                }`}
              >
                <Quote className="h-8 w-8 mb-4 text-[#e8c288] opacity-70" />
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#e8c288]"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-[#e8c288]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#e8c288] fill-[#e8c288]" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="bg-[#e8c288] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center transform transition-all duration-700 ${
              scrollY > 1000 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/80 mb-8">Subscribe to our newsletter for the latest updates and insights.</p>
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
                <span className="text-xl font-bold bg-clip-text text-transparent bg-[#e8c288] ">GwG</span>
              </div>
              <p className="text-gray-400">Transform your brand with our innovative solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#e8c288]">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-[#227002] transition-colors cursor-pointer">Brand Building</li>
                <li className="hover:text-[#227002] transition-colors cursor-pointer">Marketing</li>
                <li className="hover:text-[#227002] transition-colors cursor-pointer">AI Agents</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#e8c288]">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-[#227002] transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-[#227002] transition-colors cursor-pointer">Careers</li>
                <a href="/contact"><li className="hover:text-[#227002] transition-colors cursor-pointer">Contact</li></a>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#e8c288]">Connect</h3>
              <div className="flex space-x-4">
                <a href="" className="text-gray-400 hover:text-[#227002] transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/ashutosh-devgotra-284057269/" className="text-gray-400 hover:text-[#227002] transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://github.com/AshutoshDevgotra" className="text-gray-400 hover:text-[#227002] transition-colors">
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