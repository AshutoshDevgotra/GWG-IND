import Link from 'next/link';
import { blogPosts } from '@/app/data/blogData';

export default function BlogListPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4">Latest Insights & Articles</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.slug}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            {post.description && (
              <p className="text-gray-600 text-base mb-4">{post.description}</p>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block text-blue-600 font-medium hover:underline transition"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
