import { blogPosts } from '@/app/data/blogData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((post) => post.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> &gt;{' '}
        <Link href="/blog" className="hover:underline">Blog</Link> &gt;{' '}
        <span className="text-gray-700 font-medium">{post.title}</span>
      </nav>

      {/* Blog Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
        {post.title}
      </h1>

      {/* Optional description */}
      {post.description && (
        <p className="text-lg text-gray-600 mb-6">{post.description}</p>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none">
        {post.content()}
      </article>
    </main>
  );
}
