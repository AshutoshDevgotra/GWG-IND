// app/founder/page.tsx
import Image from 'next/image';

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Banner */}
      <div className="relative w-full  h-[100%] md:h-96">
        <Image
          src="/images/founder.png"
          alt="Founder Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-end py-6 justify-center ">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Meet Our Founder</h1>
        </div>
      </div>

      {/* Founder Details */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Ashutosh Devgotra</h2>
        <p className="text-lg leading-7 text-gray-700 mb-4">
          Ashutosh Devgotra is the visionary behind <strong>GrowWithGarry</strong>, a tech-driven platform helping businesses leverage automation, AI, and marketing to scale with efficiency. He specializes in MLOps tools, web development, and helping creators automate their workflows.
        </p>
        <p className="text-lg leading-7 text-gray-700 mb-4">
          With a strong background in computer science and a passion for simplifying complex technologies, Ashutosh has worked across multiple domains to bring real-world solutions to growing startups and brands.
        </p>
        <p className="text-lg leading-7 text-gray-700">
          Learn more about him on his{' '}
          <a
            href="https://www.linkedin.com/in/ashutoshdevgotra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            LinkedIn profile
          </a>.
        </p>
      </section>
    </div>
  );
}
