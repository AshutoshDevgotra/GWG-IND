"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VideoIcon as VideoCall, PhoneCall, Calendar, Star, Award, Briefcase, Clock, Users } from "lucide-react"
import { toast } from "sonner"
import { VideoRoom } from "@/components/video-room"
import { auth, db } from "@/lib/firebase"
import type { User } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"

interface Expert {
  id: string
  name: string
  title: string
  image: string
  rating: number
  reviews: number
  expertise: string[]
  experience: string
  price: number
  availability: string
  bio: string
  email: string
  phone: string
  userId: string
  createdAt: string
}

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([])
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const expertsCollection = collection(db, "experts")
        const expertsSnapshot = await getDocs(expertsCollection)
        const expertsData = expertsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expert[]

        setExperts(expertsData)
      } catch (error) {
        console.error("Error fetching experts:", error)
        toast.error("Failed to load experts")
      } finally {
        setLoading(false)
      }
    }

    fetchExperts()
  }, [])

  const handleBooking = async (expert: Expert) => {
    if (!user) {
      toast.error("Please sign in to book a call")
      return
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          expertName: expert.name,
          time: "10:00 AM, 25th Jan", // Replace with dynamic time if applicable
        }),
      })

      if (response.ok) {
        toast.success(`Booking confirmed with ${expert.name}! Check your email for details.`)
      } else {
        toast.error("Failed to send booking confirmation email")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while booking")
    }
  }

  const startVideoCall = (expert: Expert) => {
    if (!user) {
      toast.error("Please sign in to start a video call")
      return
    }
    setSelectedExpert(expert)
    setIsVideoModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary pt-24 pb-32 mb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Connect with Industry Experts</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Get personalized guidance from our experienced professionals
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      {/* Expert Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading experts...</p>
          </div>
        ) : experts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No experts available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <Card key={expert.id} className="bg-white overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img
                        src={expert.image || "/placeholder.svg"}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
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
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full flex items-center justify-center" onClick={() => handleBooking(expert)}>
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
                      <Button variant="outline" className="flex items-center justify-center">
                        <PhoneCall className="w-4 h-4 mr-2" />
                        Voice Call
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Video Call Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Video Call with {selectedExpert?.name}</DialogTitle>
          </DialogHeader>
          {selectedExpert && (
            <div className="aspect-video">
              <VideoRoom expertId={selectedExpert.id} />
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
              <p className="text-gray-600">All our experts are thoroughly vetted and have proven track records</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
              <p className="text-gray-600">Connect with experts instantly through video or voice calls</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">Get tailored advice specific to your business needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

