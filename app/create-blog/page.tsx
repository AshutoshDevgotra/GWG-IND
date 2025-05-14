"use client";
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CreateBlog() {
  const [form, setForm] = useState({ title: '', content: '', tags: '', image: '' });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { title, content, tags, image } = form;
    if (!title || !content) return alert('Title and Content are required');

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
        image,
        createdAt: Timestamp.now()
      });
      setForm({ title: '', content: '', tags: '', image: '' });
      alert('Blog published successfully');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 rounded-lg max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded mb-4"
          required
        />
        <textarea
          placeholder="Blog Content (you can use <img src='...' /> tags)"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          rows={6}
          className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded mb-4"
          required
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={e => setForm({ ...form, tags: e.target.value })}
          className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Main Image URL (optional)"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded mb-4"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold">
          Publish
        </button>
      </form>
    </div>
  );
}
