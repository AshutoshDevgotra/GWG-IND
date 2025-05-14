"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  { name: "Creator Hub", url: "https://creatorhub-outx.vercel.app/" },
  { name: "Rainbow Gradient Design", url: "https://v0-rainbow-gradient-design.vercel.app/" },
  { name: "Influencer Bloom", url: "https://influencer-bloom.lovable.app/" },
  { name: "Curious Lamington", url: "https://curious-lamington-d062bb.netlify.app/" }
];

const socialLinks = {
  github: "https://github.com/ashutoshdevgotra", 
  linkedin: "https://linkedin.com/in/ashutosh-devgotra",
  twitter: "https://twitter.com/ashutoshdevgotra",
  website: "https://growwithgarry.com"
};

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Handle scroll events for parallax and animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Fix hydration issues
    setIsClient(true);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rainbow animation for section borders
  const rainbowAnimation = {
    backgroundSize: "200% 200%",
    backgroundImage: "linear-gradient(45deg, #ff9a9e, #fad0c4, #ffecd2, #fcb69f, #fd868c, #fe9a8b)",
    animation: "gradient 10s ease infinite",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-black flex flex-col items-center p-6 relative overflow-hidden">
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .gold-gradient {
          background: linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .rainbow-border {
          border: 2px solid transparent;
          background-clip: padding-box, border-box;
          background-origin: padding-box, border-box;
          background-image: 
            linear-gradient(to bottom, #1a202c, #1a202c),
            linear-gradient(90deg, #ff9a9e, #fad0c4, #ffecd2, #fcb69f, #fd868c, #fe9a8b);
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .parallax {
          transform: translateY(${scrollY * 0.4}px);
          transition: transform 0.2s ease-out;
        }
        
        .parallax-reverse {
          transform: translateY(${-scrollY * 0.2}px);
          transition: transform 0.2s ease-out;
        }
        
        .card-hover {
          transition: all 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      
      {/* Floating particles background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-500 opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Parallax Background */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-center opacity-15" 
        style={{ 
          backgroundImage: "url('/kasol-mountains.jpg')",
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      ></div>
      
      {/* Header with shimmer effect */}
      <header className="text-center py-16 relative z-10 w-full max-w-4xl">
        <motion.div 
          className="inline-block p-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="gold-gradient h-1 w-32 mx-auto mb-4"></div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundImage: "linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
              backgroundSize: "200% 200%",
              animation: "gradient 8s ease infinite"
            }}
          >
            Ashutosh Devgotra
          </motion.h1>
          <div className="gold-gradient h-1 w-32 mx-auto mt-4"></div>
        </motion.div>
        <motion.p 
          className="text-xl mt-4 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-green-400">Entrepreneur</span> | 
          <span className="text-blue-400"> AI Automation</span> | 
          <span className="text-purple-400"> Web Developer</span>
        </motion.p>
      </header>
      
      {/* Skill Tree Animation with scroll trigger */}
      <motion.section 
        className="w-full max-w-3xl mb-16 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative flex flex-col items-center space-y-4">
          <motion.div 
            className="w-2 h-24 bg-gradient-to-b from-green-400 to-blue-500" 
            initial={{ height: 0 }} 
            whileInView={{ height: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          ></motion.div>
          <div className="text-2xl font-semibold gold-gradient text-transparent bg-clip-text mb-6">My Skills</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {["Creative Thinking", "Marketing", "Web Dev", "Amazon Selling", "SEO", "WhatsApp Marketing", "Hosting & Deploying", "E-Commerce", "Branding"].map((skill, index) => (
              <motion.div 
                key={index} 
                className="rainbow-border px-4 py-3 rounded-lg shadow-lg text-center bg-gray-800"
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundImage: "linear-gradient(45deg, #1a202c, #2d3748)",
                  boxShadow: "0 0 15px rgba(191, 149, 63, 0.5)" 
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* About Me */}
      <motion.div
        className="w-full max-w-4xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rainbow-border bg-gray-800/80 backdrop-blur relative z-10 overflow-hidden card-hover">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-blue-900/20 pointer-events-none"></div>
          <CardContent className="p-8 relative">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-500 rounded-full opacity-10 filter blur-3xl"></div>
            <h2 className="text-3xl font-semibold gold-gradient text-transparent bg-clip-text">About Me</h2>
            <p className="mt-4 text-gray-300 leading-relaxed text-lg">
              All-rounder entrepreneur with expertise in AI automation, marketing, web development, Amazon selling, and brand growth. Founder of Growwithgarry at 21. Passionate about designing in a desi way and always striving to contribute to the nation.
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Projects with iframe retention */}
      <motion.div
        className="w-full max-w-4xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rainbow-border bg-gray-800/80 backdrop-blur relative z-10 overflow-hidden card-hover">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/20 pointer-events-none"></div>
          <CardContent className="p-8 relative">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500 rounded-full opacity-10 filter blur-3xl"></div>
            <h2 className="text-3xl font-semibold gold-gradient text-transparent bg-clip-text mb-8">Projects & Ventures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.url} 
                  className="border border-gray-700 rounded-lg overflow-hidden shadow-xl bg-gray-900/90"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * index, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  {isClient && (
                    <div className="w-full h-64 relative overflow-hidden">
                      <iframe 
                        src={project.url} 
                        className="w-full h-full border-none transform transition-transform duration-700 hover:scale-105"
                        title={project.name}
                      ></iframe>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30 pointer-events-none"></div>
                    </div>
                  )}
                  <div className="p-5 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text" style={rainbowAnimation}>
                      {project.name}
                    </h2>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-3 inline-block px-6 py-2 rounded gold-gradient text-gray-900 font-medium hover:scale-105 transition-transform"
                    >
                      Visit Website
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* My Journey with animated timeline */}
      <motion.div
        className="w-full max-w-4xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rainbow-border bg-gray-800/80 backdrop-blur relative z-10 overflow-hidden card-hover">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/20 pointer-events-none"></div>
          <CardContent className="p-8 relative">
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500 rounded-full opacity-10 filter blur-3xl"></div>
            <h2 className="text-3xl font-semibold gold-gradient text-transparent bg-clip-text mb-8">My Journey</h2>
            
            <div className="relative border-l-2 border-green-500 pl-8 py-4 space-y-12">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-green-500"></div>
                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-green-400 animate-ping opacity-75"></div>
                <h3 className="text-xl font-semibold mb-2 text-green-400">Early Beginnings</h3>
                <p className="text-gray-300">
                  Built my first blog in 9th-10th grade, applied HTML and Amazon affiliate links for monetization.
                </p>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Entrepreneurship</h3>
                <p className="text-gray-300">
                  Founded Growwithgarry at 21. Developed e-commerce stores, managed ads, and handled Amazon and Meesho selling.
                </p>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-purple-400 animate-ping opacity-75"></div>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Expanding Horizons</h3>
                <p className="text-gray-300">
                  Explored options trading at 17-18. Passionate about technology, AI, and problem-solving for Indian citizens.
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Let's Connect with enhanced social icons */}
      <motion.div
        className="w-full max-w-4xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rainbow-border bg-gray-800/80 backdrop-blur relative z-10 overflow-hidden card-hover">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 to-yellow-900/20 pointer-events-none"></div>
          <CardContent className="p-8 relative text-center">
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-500 rounded-full opacity-10 filter blur-3xl"></div>
            <h2 className="text-3xl font-semibold gold-gradient text-transparent bg-clip-text mb-8">Let's Connect</h2>
            
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <motion.a 
                href={socialLinks.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-green-500 transition-colors duration-300">
                  <FaGithub className="text-3xl text-gray-300 group-hover:text-black transition-colors duration-300" />
                </div>
                <p className="mt-2 text-gray-400 group-hover:text-green-400 transition-colors duration-300">GitHub</p>
              </motion.a>
              
              <motion.a 
                href={socialLinks.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-blue-500 transition-colors duration-300">
                  <FaLinkedin className="text-3xl text-gray-300 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
                <p className="mt-2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300">LinkedIn</p>
              </motion.a>
              
              <motion.a 
                href={socialLinks.twitter} 
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-blue-400 transition-colors duration-300">
                  <FaTwitter className="text-3xl text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                </div>
                <p className="mt-2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300">Twitter</p>
              </motion.a>
              
              <motion.a 
                href={socialLinks.website} 
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-yellow-500 transition-colors duration-300">
                  <FaGlobe className="text-3xl text-gray-300 group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                <p className="mt-2 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300">Website</p>
              </motion.a>
            </div>
            
            <motion.button
              className="mt-12 px-8 py-3 rounded-full font-semibold text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="absolute inset-0 gold-gradient"></span>
              <span className="relative text-gray-900 px-2">Get In Touch</span>
            </motion.button>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Footer with golden accent */}
      <footer className="mt-auto pt-6 pb-4 text-center text-gray-400 text-sm relative z-10 w-full">
        <div className="gold-gradient h-px w-32 mx-auto mb-4"></div>
        <p>© {new Date().getFullYear()} Ashutosh Devgotra. All rights reserved.</p>
      </footer>
    </div>
  );
}