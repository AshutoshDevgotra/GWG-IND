"use client";
// pages/blog.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

type BlogType = {
  id: string;
  title?: string;
  content?: string;
  image?: string;
  tags?: string[];
  createdAt?: { seconds: number; nanoseconds?: number };
};

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogSnapshot = await getDocs(collection(db, 'blogs'));
        const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogList);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="bg-[#0f0f0f] text-black min-h-screen px-6 py-10">
      <Head>
        <title>GrowWithGarry Blog | Website Development & SaaS News India</title>
        <meta name="description" content="Latest blogs on SaaS development, professional website design, and landing page building services in India." />
        <meta name="keywords" content="Website development in India, Landing page creation India, Build website India, SaaS development India" />
        <meta name="author" content="GrowWithGarry" />
      </Head>

      <h1 className="text-4xl font-bold text-center mb-10">GrowWithGarry Blog</h1>

      <div className="max-w-3xl mx-auto space-y-10">
        {blogs
          .filter(blog => blog.createdAt?.seconds)
          .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
          .map(blog => (
            <article key={blog.id} className="bg-[#1a1a1a] p-6 rounded-lg shadow">
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title || 'Blog image'}
                  className="mb-4 w-full rounded"
                  width={800}
                  height={400}
                  style={{ objectFit: 'cover' }}
                  unoptimized={false}
                />
              )}
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-400 mb-2">
                {blog.createdAt?.seconds ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString() : ''}
              </p>
              <div
                className="text-base leading-relaxed mb-3"
                dangerouslySetInnerHTML={{ __html: blog.content || '' }}
              />
              {blog.tags && (
                <div className="text-sm text-blue-400 mb-4">{blog.tags.join(', ')}</div>
              )}
              <div className="flex space-x-4">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}