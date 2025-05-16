import React from 'react';
import Head from 'next/head';

const NextJSDeveloperIndiaPage = () => {
  return (
    <>
      <Head>
        <title>Next.js Best Developer in India | Grow with Garry</title>
        <meta
          name="description"
          content="Hire the best Next.js developer in India. Build fast, SEO-optimized websites with GrowWithGarry – a trusted expert in scalable React & Next.js development."
        />
        <meta name="keywords" content="Next.js developer India, best Next.js developer, hire Next.js developer India" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-white text-gray-800 px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Next.js Best Developer in India
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Are you looking to hire a top-tier Next.js developer from India? At <strong>GrowWithGarry</strong>, we specialize in building blazing-fast, SEO-optimized web apps using modern technologies like React, Next.js, and TypeScript.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            Hire Me Now
          </a>
        </div>

        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Why Choose Me for Your Next.js Project?</h2>
          <ul className="list-disc list-inside text-left space-y-2">
            <li>✅ 3+ years of experience with React and Next.js</li>
            <li>✅ SEO-first development to rank your website</li>
            <li>✅ Full-stack capability: Frontend, backend (Node.js), and database</li>
            <li>✅ Optimized performance using SSR, ISR, and static generation</li>
            <li>✅ Mobile-first, responsive design</li>
          </ul>
        </section>

        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Portfolio Highlights</h2>
          <p className="mb-4">Here are some recent projects built with Next.js:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>eCommerce Store:</strong> Built using Medusa.js and Next.js</li>
            <li><strong>Educational Platform:</strong> SSR-enabled platform for online learning</li>
            <li><strong>Startup Landing Pages:</strong> Conversion-focused, blazing fast websites</li>
          </ul>
        </section>

        <section className="max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Scale Your Product?</h2>
          <p className="mb-4">Let’s collaborate and build something amazing with Next.js.</p>
          <a
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            Schedule a Free Call
          </a>
        </section>
      </main>
    </>
  );
};

export default NextJSDeveloperIndiaPage;
