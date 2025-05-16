// app/blog/[slug]/page.tsx
import { blogPosts } from '@/app/data/blogData';
import { notFound } from 'next/navigation';

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function BlogPostPage({ params }: Props) {
  // Await params because Next.js requires it
  const { slug } = await params;

  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">{post.title}</h1>
      <article className="prose prose-lg max-w-none text-gray-700">
        {post.content()}
      </article>
    </main>
  );
}
