"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Video as VideoCall, PhoneCall, Calendar, Star, Award, Briefcase, Clock, Users, LogIn } from "lucide-react";
import { toast } from "sonner";
import { VideoRoom } from '@/components/video-room';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { AuthButton } from '@/components/auth-button';

const experts = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Brand Strategy Expert",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 4.9,
    reviews: 128,
    expertise: ["Brand Development", "Market Analysis", "Growth Strategy"],
    experience: "12+ years",
    price: 50,
    availability: "Available Now"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Digital Marketing Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 4.8,
    reviews: 93,
    expertise: ["SEO", "Content Strategy", "Social Media"],
    experience: "8+ years",
    price: 50,
    availability: "Available in 30 mins"
  },
  {
    id: 3,
    name: "Emma Williams",
    title: "UI/UX Design Consultant",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 4.7,
    reviews: 156,
    expertise: ["User Experience", "Interface Design", "Prototyping"],
    experience: "10+ years",
    price: 50,
    availability: "Available Now"
  }
];

export default function ExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleBooking = (expert: typeof experts[0]) => {
    if (!user) {
      toast.error('Please sign in to book a call');
      setIsAuthDialogOpen(true);
      return;
    }
    toast.success(`Booking confirmed with ${expert.name}! Check your email for details.`);
  };

  const startVideoCall = (expert: typeof experts[0]) => {
    if (!user) {
      toast.error('Please sign in to start a video call');
      setIsAuthDialogOpen(true);
      return;
    }
    setSelectedExpert(expert);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary pt-24 pb-32 mb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {!user && (
            <div className="flex justify-end mb-8">
             
            </div>
          )}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Connect with Industry Experts
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Get personalized guidance from our experienced professionals
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      {/* Expert Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <Card key={expert.id} className="bg-white overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{expert.name}</h3>
                      <p className="text-sm text-gray-600">{expert.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="ml-1 text-sm font-medium">{expert.rating}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm">
                    <Award className="w-4 h-4 mr-2 text-primary" />
                    <span>Top rated expert with {expert.reviews} reviews</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 mr-2 text-primary" />
                    <span>{expert.experience} experience</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span>{expert.availability}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full flex items-center justify-center"
                    onClick={() => handleBooking(expert)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book 5min Call (₹{expert.price})
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      onClick={() => startVideoCall(expert)}
                    >
                      <VideoCall className="w-4 h-4 mr-2" />
                      Video Call
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                    >
                      <PhoneCall className="w-4 h-4 mr-2" />
                      Voice Call
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Call Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Video Call with {selectedExpert?.name}</DialogTitle>
          </DialogHeader>
          {selectedExpert && (
            <div className="aspect-video">
              <VideoRoom expertId={selectedExpert.id.toString()} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Why Choose Us Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Experts?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get personalized guidance from industry professionals with proven track records
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Experts</h3>
              <p className="text-gray-600">
                All our experts are thoroughly vetted and have proven track records
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
              <p className="text-gray-600">
                Connect with experts instantly through video or voice calls
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">
                Get tailored advice specific to your business needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}