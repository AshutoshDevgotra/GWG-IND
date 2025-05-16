// app/blog/[slug]/page.tsx
import { blogPosts } from '@/app/data/blogData';
import { notFound } from 'next/navigation';

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

// Mark the component as async to match Next.js expected signature
export default async function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      {post.content()}
    </main>
  );
}
