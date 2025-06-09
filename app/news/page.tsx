// app/news/page.tsx
import React from 'react';

export default function NewsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 prose prose-indigo prose-lg dark:prose-invert">
      <h1 className="text-4xl font-bold mb-6">
        🚀 We&apos;re Launching the Future of Brand & Legal Collaboration in India!
      </h1>

      <p className="mb-6">
        At <strong>GrowWithGarry</strong>, we’re building more than just websites — we’re building{' '}
        <strong>platforms that solve real problems</strong>.
      </p>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-3">🎥 1. <a href="https://creatorhub-outx.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">CreatorHub</a> – For Brands & Creators</h2>
        <p className="mb-3">
          A new way for <strong>Indian brands to collaborate with creators and influencers</strong>.  
          From barter to paid UGC campaigns — manage everything transparently on one platform.
        </p>
        <ul className="list-disc list-inside mb-3">
          <li>Ideal for D2C brands, personal brands, coaches, content creators</li>
          <li>Micro/macro influencer discovery</li>
          <li>Easy campaign collaboration</li>
          <li>Track deliverables & creative assets</li>
        </ul>
        <p><strong>No middlemen. No confusion. Just creator-driven growth.</strong></p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-3">⚖️ 2. AI-Powered LegalTech (Coming Soon)</h2>
        <p className="mb-3">
          Launching soon: a <strong>client–lawyer bridge</strong> powered by AI trained on the <strong>Indian Constitution</strong>.
        </p>
        <ul className="list-disc list-inside mb-3">
          <li>Instant chatbot-based legal help for FIRs, complaints, incidents</li>
          <li>Get section-wise suggestions for your situation</li>
          <li>Verified lawyer profiles with ratings, reviews, and consult features</li>
          <li>Available 24x7 for early-stage founders, youth, and citizens</li>
        </ul>
        <p><strong>Legal help shouldn’t be confusing or expensive. We’re making it simple, accessible, and fair.</strong></p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-3">🌐 All this under one platform: <a href="https://growwithgarry.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">GrowWithGarry.in</a></h2>
        <p className="mb-4">
          From:
        </p>
        <ul className="list-disc list-inside mb-3">
          <li>Next.js websites</li>
          <li>Razorpay payment integration</li>
          <li>AI chatbots trained on your brand</li>
          <li>UGC & influencer marketing</li>
          <li>SEO & email marketing</li>
          <li>Legal-tech automation</li>
        </ul>
        <p>
          👉 We&apos;re your <strong>end-to-end digital partner</strong> for launching and scaling in India.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-3">🤝 Collaborate With Us</h2>
        <p className="mb-1">
          📩 <strong>Email:</strong> <a href="mailto:connect@growwithgarry.in" className="text-indigo-600 hover:underline">connect@growwithgarry.in</a>
        </p>
        <p className="mb-1">
          🌐 <strong>Website:</strong> <a href="https://growwithgarry.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">growwithgarry.in</a>
        </p>
        <p>
          📱 <strong>DM us on LinkedIn / Instagram:</strong> <code>@growwithgarry</code>
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-3">Hashtags</h2>
        <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-indigo-600">
          #GrowWithGarry #CreatorHubIndia #LegalTech #AIIndia #D2CBrands #InfluencerMarketingIndia #StartupIndia #WebsiteBuilderIndia #NextjsIndia #DigitalIndia #ProductLaunchIndia
        </p>
      </section>
    </main>
  );
}
