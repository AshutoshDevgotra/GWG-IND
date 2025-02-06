"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, User } from "lucide-react";
import { toast } from "sonner";
import { ExpertCard } from "@/components/ExpertCard";
import { ChatWindow } from "@/components/ChatWindow";
import { VideoRoom } from "@/components/video-room";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

interface Expert {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  expertise: string[];
  experience: string;
  price: number;
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

interface Channel {
  id: string;
  expertId: string;
  userId: string;
  status: string;
  createdAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeCallType, setActiveCallType] = useState<'voice' | 'video' | null>(null);
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    college: "",
    branch: "",
    year: "",
    query: "",
  });

  // Get unique values for select options
  const uniqueColleges = Array.from(new Set(experts.map((e) => e.college))).sort();
  const uniqueBranches = Array.from(new Set(experts.map((e) => e.branch))).sort();
  const uniqueYears = Array.from(new Set(experts.map((e) => e.year))).sort();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error('Please sign in to access expert services');
      } else {
        // Subscribe to user's channels when authenticated
        const channelsQuery = query(
          collection(db, 'channels'),
          where('userId', '==', user.uid)
        );
        
        const channelUnsubscribe = onSnapshot(channelsQuery, (snapshot) => {
          const channelsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Channel[];
          setChannels(channelsData);
        });

        return () => channelUnsubscribe();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const expertsCollection = collection(db, "experts");
        const expertsSnapshot = await getDocs(expertsCollection);
        const expertsData = expertsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expert[];

        setExperts(expertsData);
        setFilteredExperts(expertsData);
      } catch (error) {
        console.error("Error fetching experts:", error);
        toast.error("Failed to load experts");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();

    // Listen for real-time expert status updates
    const expertsQuery = query(collection(db, "experts"));
    const unsubscribe = onSnapshot(expertsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          setExperts(prev => prev.map(expert => 
            expert.id === change.doc.id 
              ? { ...expert, ...change.doc.data() } as Expert
              : expert
          ));
        }
      });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = experts.filter((expert) => {
      const matchesCollege =
        !searchFilters.college || expert.college.toLowerCase().includes(searchFilters.college.toLowerCase());
      const matchesBranch =
        !searchFilters.branch || expert.branch.toLowerCase().includes(searchFilters.branch.toLowerCase());
      const matchesYear = !searchFilters.year || expert.year.includes(searchFilters.year);
      const matchesQuery =
        !searchFilters.query ||
        expert.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        expert.expertise.some((exp) => exp.toLowerCase().includes(searchFilters.query.toLowerCase()));

      return matchesCollege && matchesBranch && matchesYear && matchesQuery;
    });

    setFilteredExperts(filtered);
  }, [searchFilters, experts]);

  const handleStartChat = async (expertId: string) => {
    if (!auth.currentUser) {
      toast.error('Please sign in to start a chat');
      return;
    }

    try {
      // Check if a channel already exists
      const existingChannel = channels.find(
        channel => channel.expertId === expertId && channel.userId === auth.currentUser?.uid
      );

      if (existingChannel) {
        setActiveChatId(existingChannel.id);
        return;
      }

      // Create a new channel if one doesn't exist
      const channelRef = await addDoc(collection(db, 'channels'), {
        expertId,
        userId: auth.currentUser.uid,
        status: 'active',
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: null,
        unreadCount: 0
      });

      setActiveChatId(channelRef.id);
      toast.success('Chat session started');
    } catch (error) {
      console.error('Error starting chat:', error);
      toast.error('Failed to start chat session');
    }
  };

  const handleStartVoiceCall = async (expertId: string) => {
    if (!auth.currentUser) {
      toast.error('Please sign in to start a call');
      return;
    }

    const expert = experts.find(e => e.id === expertId);
    if (!expert?.isOnline) {
      toast.error('Expert is currently offline');
      return;
    }

    try {
      const callDoc = await addDoc(collection(db, 'calls'), {
        expertId,
        userId: auth.currentUser.uid,
        type: 'voice',
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setActiveCallType('voice');
      toast.success('Voice call request sent');
    } catch (error) {
      console.error('Error starting voice call:', error);
      toast.error('Failed to start voice call');
    }
  };

  const handleStartVideoCall = async (expertId: string) => {
    if (!auth.currentUser) {
      toast.error('Please sign in to start a video call');
      return;
    }

    const expert = experts.find(e => e.id === expertId);
    if (!expert?.isOnline) {
      toast.error('Expert is currently offline');
      return;
    }

    try {
      const callDoc = await addDoc(collection(db, 'calls'), {
        expertId,
        userId: auth.currentUser.uid,
        type: 'video',
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setSelectedExpert(expert);
      setActiveCallType('video');
      setIsVideoCallModalOpen(true);
      toast.success('Video call request sent');
    } catch (error) {
      console.error('Error starting video call:', error);
      toast.error('Failed to start video call');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with enhanced gradient */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 pt-24 pb-32 mb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-4 font-display"
            >
              Connect with Industry Experts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-2xl mx-auto font-light"
            >
              Get personalized guidance from our experienced professionals
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by name or expertise..."
                className="pl-10"
                value={searchFilters.query}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, query: e.target.value }))}
              />
            </div>
            <Select
              value={searchFilters.college}
              onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, college: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select College" />
              </SelectTrigger>
              <SelectContent>
                {uniqueColleges.map((college) => (
                  <SelectItem key={`college-${college}`} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={searchFilters.branch}
              onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, branch: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {uniqueBranches.map((branch) => (
                  <SelectItem key={`branch-${branch}`} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={searchFilters.year}
              onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, year: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                {uniqueYears.map((year) => (
                  <SelectItem key={`year-${year}`} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading experts...</p>
          </div>
        ) : filteredExperts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No experts found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredExperts.map((expert) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                onStartChat={handleStartChat}
                onStartVoiceCall={handleStartVoiceCall}
                onStartVideoCall={handleStartVideoCall}
              />
            ))}
          </div>
        )}
      </div>

      {activeChatId && (
        <ChatWindow
          channelId={activeChatId}
          userId={auth.currentUser?.uid || ''}
          onClose={() => setActiveChatId(null)} expertId={""}        />
      )}

      {isVideoCallModalOpen && selectedExpert && (
        <Dialog open={isVideoCallModalOpen} onOpenChange={setIsVideoCallModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Video Call with {selectedExpert.name}</DialogTitle>
            </DialogHeader>
            <VideoRoom expertId={selectedExpert.id} userId={auth.currentUser?.uid} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}