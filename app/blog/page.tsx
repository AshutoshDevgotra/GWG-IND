import Head from 'next/head';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>GrowWithGarry - Expert Solutions for Your Needs</title>
        <meta
          name="description"
          content="GrowWithGarry offers expert services in UX design, web development, marketing, legal assistance, and branding. Register as an expert or book a consultation with professionals for just ₹50."
        />
        <meta
          name="keywords"
          content="GrowWithGarry, UX design, web development, marketing experts, legal team, branding experts, expert registration, book consultation"
        />
        <meta name="author" content="GrowWithGarry" />
      </Head>

      <main className="px-4 py-8 max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to GrowWithGarry Blog
          </h1>
          <p className="text-lg text-gray-600">
            Discover insights, tips, and updates from our experts in UX design, web development, marketing, legal, and branding.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Why Choose GrowWithGarry?
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Expert services in UX design, web development, and branding</li>
            <li>Dedicated legal and marketing teams</li>
            <li>Easy expert registration on <Link href="/expert-register" className="text-blue-500 hover:underline">/expert-register</Link></li>
            <li>Affordable expert consultations for just ₹50</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Become an Expert with GrowWithGarry
          </h2>
          <p className="text-gray-700 mb-4">
            We welcome industry experts to join our platform. Register to showcase your profile, portfolio, and skills to potential clients. Grow your reach and connect with businesses seeking your expertise.
          </p>
          <Link href="/expert-register" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600">
            Register as an Expert
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Book a Consultation
          </h2>
          <p className="text-gray-700 mb-4">
            Explore profiles of experts in various fields, view their portfolios, and book a one-on-one consultation at just ₹50.
          </p>
          <Link href="/experts" className="inline-block bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600">
            Explore Experts
          </Link>
        </section>
      </main>

      <footer className="mt-16 py-6 bg-gray-100 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} GrowWithGarry. All rights reserved.
        </p>
      </footer>
    </>
  );
}
