"use client";

import { motion } from "framer-motion";

const projects = [
  { name: "Creator Hub", url: "https://creatorhub-outx.vercel.app/" },
  { name: "Leafy Melba", url: "https://leafy-melba-224cc5.netlify.app" },
  { name: "Rainbow Gradient Design", url: "https://v0-rainbow-gradient-design.vercel.app/" },
  { name: "Influencer Bloom", url: "https://influencer-bloom.lovable.app/" },
  { name: "Curious Lamington", url: "https://curious-lamington-d062bb.netlify.app/" }
];

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <motion.h1 className="text-4xl font-bold text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Our Portfolio
      </motion.h1>
      <p className="text-center text-gray-600">Explore our projects with live previews.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div key={project.url} className="border rounded-lg overflow-hidden shadow-lg" whileHover={{ scale: 1.05 }}>
            <iframe src={project.url} className="w-full h-60 border-none"></iframe>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Visit Website
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
