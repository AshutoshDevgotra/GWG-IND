import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Development, Brand Building & E-Commerce Listing Services in India | GrowWithGarry",
  description:
    "GrowWithGarry.in helps startups and D2C brands with SaaS development, e-commerce listings on Amazon & Flipkart, brand building, MVP launches, and growth marketing.",
  keywords:
    "SaaS development India, SaaS product builder, MVP development, startup tech partner, brand identity, digital branding, e-commerce listing agency, Amazon product listing, Flipkart seller support, D2C brand launch, Meesho listing help, Shopify setup, Razorpay integration, Stripe India setup, cloud app development, Firebase app dev, MongoDB expert, Next.js agency India, React developers India, business website SEO, Indian startup agency, full stack developer team, app development India, UI/UX design for SaaS, startup landing page, digital growth agency, e-commerce marketing, Flipkart SEO, Amazon A+ content, Facebook Ads India, Instagram brand growth, PPC services, SEM India, digital product launch, custom CRM development, CRM integration, SaaS UI design, scalable tech architecture, API integration services, payment gateway India, mobile responsive website, startup branding India, domain + hosting setup, SEO for SaaS, technical SEO India, ecommerce optimization, startup content strategy, organic reach, India SaaS agency, ecomm ad campaign, SEO-optimized product listings, mobile-first design, digital presence growth, user onboarding UX, scalable MVPs, lean development, app maintenance India, marketplace growth, Flipkart brand registry, brand positioning, content marketing India, email automation India, Zapier setup, workflow automation, tech consultation India, website redesign India, brand audit India, SEO audit, local business SEO India, ecommerce tracking setup, social media optimization, YouTube channel SEO, business consulting India, Grow With Garry digital services, India-based tech agency, product-market fit, startup strategy India, go-to-market strategy India, no-code SaaS setup, headless CMS setup, JAMstack development, performance marketing India",
};

export default function ServicesPage() {
  return (
    <main className="px-4 md:px-20 py-12 text-white bg-[#050714]">
      <article className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            SaaS Development, Brand Building & E-Commerce Listing Services for Startups & D2C Brands in India
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            From MVPs to marketplaces, GrowWithGarry.in turns ideas into revenue-generating brands with scalable SaaS, powerful branding, and marketplace growth services.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🚀 SaaS Development Services</h2>
          <p className="text-gray-300 leading-relaxed">
            We help you build scalable, secure, and user-friendly SaaS products — from concept to launch. Whether you need an MVP, CRM, or full SaaS application, we handle design, backend, frontend, APIs, payments (Stripe, Razorpay), and deployment.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-400">
            <li>Custom MVP Development with Next.js, React, Firebase, and MongoDB</li>
            <li>Responsive UI/UX design with Tailwind CSS</li>
            <li>Payment gateway integration (Stripe, Razorpay)</li>
            <li>Admin dashboards, analytics, and CRM tools</li>
            <li>Ongoing support, testing, and cloud deployment</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🎯 Brand Building Services</h2>
          <p className="text-gray-300 leading-relaxed">
            A strong digital brand starts with identity, consistency, and credibility. We help startups and D2C brands build trust and visibility with strategy-backed brand assets.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-400">
            <li>Logo, fonts, color palette, and visual identity</li>
            <li>SEO-optimized landing pages & websites</li>
            <li>Social media setup and optimization (Instagram, LinkedIn, YouTube)</li>
            <li>Content marketing & blogging services</li>
            <li>Email marketing setup (MailerLite, ConvertKit, etc.)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🛒 E-Commerce Listing & Growth</h2>
          <p className="text-gray-300 leading-relaxed">
            We manage everything from listing to order management on Amazon, Flipkart, Meesho, and more. Get better visibility, more conversions, and smooth operations.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-400">
            <li>Product listing with SEO-rich descriptions and keywords</li>
            <li>Image editing and A+ content (Amazon, Flipkart)</li>
            <li>Inventory and order sync setup</li>
            <li>Ad campaign strategy & management (Amazon Sponsored Ads, Flipkart Ads)</li>
            <li>Shopify, Meesho, Jiomart integrations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">📈 Why GrowWithGarry?</h2>
          <ul className="list-disc list-inside text-gray-400">
            <li>100+ successful product & brand launches</li>
            <li>Trusted by D2C founders, SaaS startups, and e-commerce sellers</li>
            <li>Real-time reporting, dedicated account managers</li>
            <li>Affordable pricing & fast turnaround</li>
          </ul>
        </section>

        <section className="text-center mt-16">
          <h3 className="text-3xl font-bold mb-4">📞 Ready to Grow?</h3>
          <p className="text-gray-300 mb-6">
            Get in touch with our team today and take the first step toward building your tech, brand, and marketplace presence.
          </p>
          <a
            href="https://growwithgarry.in/contact"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg transition"
          >
            Book a Free Strategy Call
          </a>
        </section>
      </article>
    </main>
  );
}
