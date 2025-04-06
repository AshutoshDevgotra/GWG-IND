import React from "react";
import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="bg-white text-black px-6 py-10 md:px-20 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
          🧠 Build Websites That Work, Not Just Look Good – With GrowWithGarry.in 💻✨
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          🚀 Empowering India’s Entrepreneurs With Code, Coffee, and Clarity
        </p>

        <p className="mb-6">
          In a world where <strong>everyone is online</strong>, your business deserves a
          <strong> digital presence that actually works</strong> — fast, scalable, beautiful,
          and built with the best tech stack out there. And that’s exactly what we do at
          <strong> GrowWithGarry.in</strong> – where <em>tech meets jugaad</em>, and your business gets
          a website that <strong>converts, ranks, and grows</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">
          🔍 Why Your Business Needs a Solid Website (Not Just an Insta Page or WhatsApp)
        </h2>
        <p className="mb-6">
          Let’s be real. Social media is great for marketing — but when it comes to
          <strong> trust, conversions, and SEO visibility</strong>, nothing beats a proper,
          structured <strong>business website</strong>.
        </p>

        <ul className="list-disc list-inside mb-6">
          <li>Fashion brand from Ludhiana</li>
          <li>AI startup from Bengaluru</li>
          <li>Freelancer from Indore</li>
          <li>D2C product seller from Delhi NCR</li>
          <li>College student launching your first app from Punjab</li>
        </ul>

        <p className="mb-6">
          Your website is your <strong>digital visiting card + sales machine + brand identity</strong> — all in one.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">
          🔧 We Don’t Just Build Websites. We Engineer Your Digital Ecosystem.
        </h2>

        <p className="mb-4">
          Our development stack includes <strong>Next.js</strong>, <strong>Tailwind CSS</strong>,
          <strong> Firebase</strong>, <strong>Razorpay integration</strong>, and even
          <strong> headless CMS</strong> solutions for complete control and scalability.
        </p>

        <p className="mb-4">
          We’re also building AI chatbots trained on Indian laws and business queries to
          empower your clients and users.
        </p>

        <h3 className="text-xl font-bold text-green-800 mt-6 mb-3">
          📞 Let’s Build Something Amazing Together
        </h3>
        <p className="mb-4">
          Whether you’re a startup founder, solo entrepreneur, or student — let’s turn your idea into reality.
        </p>

        <p className="mb-4">
          <strong>Email</strong>: <a href="mailto:connect@growwithgarry.in" className="text-green-700 underline">connect@growwithgarry.in</a><br />
          <strong>Call/WhatsApp</strong>: <a href="https://wa.me/919877292856" className="text-green-700 underline">+91 98772 92856</a><br />
          <strong>Website</strong>: <a href="https://www.growwithgarry.in" className="text-green-700 underline">www.growwithgarry.in</a>
        </p>

        <div className="mt-10 text-center">
          <Link href="/portfolio">
            <a className="inline-block px-6 py-3 rounded-full text-white font-bold bg-gradient-to-r from-green-700 to-yellow-500 shadow-md hover:scale-105 transition-transform">
              🚀 View Our Portfolio
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}