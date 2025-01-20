"use client";
import { useState, useEffect } from "react";
import { Device } from "twilio-client";

interface Expert {
  name: string;
  skills: string;
  image: string; // New property for image URL
}

const experts: Expert[] = [
  { name: "UX Designer", skills: "User Experience, Wireframes, Prototyping", image: "/images/ux-designer.jpg" },
  { name: "Video Editor", skills: "Premiere Pro, After Effects", image: "/images/video-editor.jpg" },
  { name: "Legal Advisor", skills: "Corporate Law, Taxation, IP Law", image: "/images/legal-advisor.jpg" },
  { name: "Web Developer", skills: "React, Next.js, Tailwind CSS", image: "/images/web-developer.jpg" },
  { name: "Marketing Expert", skills: "SEO, SEM, Social Media Strategy", image: "/images/marketing-expert.jpg" },
  { name: "Thumbnail Designer", skills: "Graphic Design, Photoshop", image: "/images/thumbnail-designer.jpg" },
  { name: "AI Agent Expert", skills: "ChatGPT, OpenAI, Automation", image: "/images/ai-agent-expert.jpg" },
];

export default function Experts() {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    async function setupDevice() {
      const res = await fetch("/api/token"); // API to get Twilio access token
      const data = await res.json();

      const twilioDevice = new Device(data.token);
      setDevice(twilioDevice);
    }
    setupDevice();
  }, []);

  const bookCall = (expert: Expert) => {
    if (device) {
      device.connect({ expert: expert.name });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Our Experts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            {/* Add image */}
            <img
              src={expert.image}
              alt={expert.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{expert.name}</h2>
            <p className="text-gray-700 text-center mt-2">{expert.skills}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
              onClick={() => bookCall(expert)}
            >
              Book a 5min Call at ₹50
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
