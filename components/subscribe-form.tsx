"use client";

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: new Date().toISOString()
      });
      
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error adding subscriber:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
      <Input
        type="email"
        placeholder="Enter your email"
        className="bg-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button 
        variant="secondary" 
        type="submit"
        disabled={loading}
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}