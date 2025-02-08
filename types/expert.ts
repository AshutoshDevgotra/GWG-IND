import { ReactNode } from "react";

export interface Expert {
  price: ReactNode;
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  expertise: string[];
  experience: string;
  pricePerMinute: number;
  availability: string;
  bio: string;
  email: string;
  phone: string;
  userId: string;
  createdAt: string;
  college: string;
  branch: string;
  year: string;
  isOnline: boolean;
  isLive: boolean;
  institutionType: string;
  achievements: string[];
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  timestamp: string;
}

export interface Call {
  id: string;
  expertId: string;
  userId: string;
  type: 'voice' | 'video';
  status: 'pending' | 'active' | 'completed' | 'rejected';
  startTime?: string;
  endTime?: string;
  duration?: number;
  cost?: number;
}