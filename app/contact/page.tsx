"use client";

import { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      // Save the form data to Firestore
      const contactCollection = collection(db, "contactMessages");
      await addDoc(contactCollection, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(), // Store the timestamp
      });

      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Grow With Garry</title>
        <meta name="description" content="Contact us for any inquiries or support." />
      </Head>
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <div className="mb-8 text-center">
          <p className="text-lg">
            Email:{" "}
            <a href="mailto:connect@growwithgarry.in" className="text-blue-500 underline">
              connect@growwithgarry.in
            </a>
          </p>
          <p className="text-lg">
            WhatsApp:{" "}
            <a
              href="https://wa.me/7696522829"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              7696522829
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Your Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Your Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </>
  );
}
