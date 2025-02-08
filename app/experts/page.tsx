"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search } from "lucide-react";
import { toast } from "sonner";
import ExpertCard from "@/components/ExpertCard";
import { ChatWindow } from "@/components/ChatWindow";
import { VideoRoom } from "@/components/video-room";
import { WalletButton } from "@/components/WalletButton";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, onSnapshot, serverTimestamp, getDoc, doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Expert } from "@/types/expert";

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeCallType, setActiveCallType] = useState<'voice' | 'video' | null>(null);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        toast.error('Please sign in to access expert services');
      } else {
        // Fetch wallet balance
        const walletRef = doc(db, 'wallets', user.uid);
        const walletDoc = await getDoc(walletRef);
        if (walletDoc.exists()) {
          setWalletBalance(walletDoc.data().balance);
        }

        // Subscribe to wallet changes
        const walletUnsubscribe = onSnapshot(walletRef, (doc) => {
          if (doc.exists()) {
            setWalletBalance(doc.data().balance);
          }
        });

        return () => walletUnsubscribe();
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
      // Create a new chat channel
      const channelRef = await addDoc(collection(db, 'channels'), {
        expertId,
        userId: auth.currentUser.uid,
        status: 'active',
        createdAt: serverTimestamp(),
      });

      setActiveChatId(channelRef.id);
      toast.success('Chat session started');
    } catch (error) {
      console.error('Error starting chat:', error);
      toast.error('Failed to start chat session');
    }
  };

  const handleStartCall = async (expertId: string, type: 'voice' | 'video') => {
    if (!auth.currentUser) {
      toast.error('Please sign in to start a call');
      return;
    }

    const expert = experts.find(e => e.id === expertId);
    if (!expert?.isOnline) {
      toast.error('Expert is currently offline');
      return;
    }

    // Check wallet balance
    const requiredBalance = expert.pricePerMinute * 5; // Minimum 5 minutes
    if (walletBalance < requiredBalance) {
      toast.error(`Insufficient balance. Minimum ₹${requiredBalance} required for call`);
      return;
    }

    try {
      const callDoc = await addDoc(collection(db, 'calls'), {
        expertId,
        userId: auth.currentUser.uid,
        type,
        status: 'pending',
        createdAt: serverTimestamp(),
        pricePerMinute: expert.pricePerMinute
      });

      if (type === 'video') {
        setSelectedExpert(expert);
        setIsVideoCallModalOpen(true);
      }
      setActiveCallType(type);
      toast.success(`${type === 'video' ? 'Video' : 'Voice'} call request sent`);
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error('Failed to start call');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 pt-24 pb-32 mb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
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
                className="text-xl text-white/80 max-w-2xl font-light"
              >
                Get personalized guidance from our experienced professionals
              </motion.p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white">
                <p className="text-sm opacity-80">Wallet Balance</p>
                <p className="text-xl font-semibold">₹{walletBalance}</p>
              </div>
              <WalletButton />
            </div>
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
    {uniqueColleges.map((college, index) => (
      <SelectItem key={college || index} value={college}>
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
    {uniqueBranches.map((branch, index) => (
      <SelectItem key={branch || index} value={branch}>
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
    {uniqueYears.map((year, index) => (
      <SelectItem key={year || index} value={year}>
        {year}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

          </div>
        </motion.div>
      </div>

      {/* Experts Grid */}
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
                onStartVoiceCall={(expertId) => handleStartCall(expertId, 'voice')}
                onStartVideoCall={(expertId) => handleStartCall(expertId, 'video')}
              />
            ))}
          </div>
        )}
      </div>

      {/* Chat Window */}
      {activeChatId && (
        <ChatWindow
          channelId={activeChatId}
          userId={auth.currentUser?.uid || ''}
          expertId={selectedExpert?.id || ''}
          onClose={() => setActiveChatId(null)}
        />
      )}

      {/* Video Call Modal */}
      {isVideoCallModalOpen && selectedExpert && (
        <VideoRoom
          expertId={selectedExpert.id}
          userId={auth.currentUser?.uid}
          onClose={() => {
            setIsVideoCallModalOpen(false);
            setSelectedExpert(null);
          } } callId={""} onEnd={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </div>
  );
}