"use client"
import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Phone, Video, Calendar, User } from "lucide-react"
import { toast } from "sonner"
import { auth, db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"
import type { Expert } from "@/types/expert"

interface ExpertCardProps {
  isOnline: boolean;
  expert: Expert
  onStartChat: (expertId: string) => void
  onStartVoiceCall: (expertId: string) => void
  onStartVideoCall: (expertId: string) => void
}

export default function ExpertCard({ expert, onStartChat, onStartVoiceCall, onStartVideoCall }: ExpertCardProps) {
  const [isBooking, setIsBooking] = useState(false)

  const handleBookCallback = async () => {
    if (!auth.currentUser) {
      toast.error("Please sign in to book a callback")
      return
    }

    setIsBooking(true)
    try {
      await addDoc(collection(db, "callbacks"), {
        expertId: expert.id,
        userId: auth.currentUser.uid,
        status: "pending",
        createdAt: new Date().toISOString(),
      })
      toast.success("Callback request sent successfully")
    } catch (error) {
      toast.error("Failed to book callback")
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <Card className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
      <div className="p-6 bg-gradient-to-br from-white to-blue-50">
        <div className="relative">
          {/* Online/Offline Status */}
          <Badge variant={expert.isOnline ? "default" : "secondary"} className="absolute top-0 right-0">
            {expert.isOnline ? "Online" : "Offline"}
          </Badge>

          {/* Live Badge */}
          {expert.isLive && (
            <Badge variant="destructive" className="absolute top-0 left-0 animate-pulse">
              LIVE
            </Badge>
          )}

          <div className="flex items-center mb-4">
            {expert.image ? (
              <Image
                src={expert.image || "/placeholder.svg"}
                width={60}
                height={60}
                alt={expert.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-900"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
            )}
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-900">{expert.name}</h3>
              <p className="text-sm text-gray-600">{expert.title}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">{expert.bio}</p>
            <p className="text-sm text-gray-600">Expertise: {expert.expertise.join(", ")}</p>
            <p className="text-sm text-gray-600">Experience: {expert.experience}</p>
            <p className="text-sm text-gray-600">Price: ₹{expert.price}/session</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => onStartChat(expert.id)}
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => onStartVoiceCall(expert.id)}
              disabled={!expert.isOnline}
            >
              <Phone className="w-4 h-4" />
              Voice Call
            </Button>

            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => onStartVideoCall(expert.id)}
              disabled={!expert.isOnline}
            >
              <Video className="w-4 h-4" />
              Video Call
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleBookCallback}
              disabled={isBooking}
            >
              <Calendar className="w-4 h-4" />
              {isBooking ? "Booking..." : "Book Callback"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

