"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoIcon as VideoCall, PhoneCall, Calendar, Star, Award, Briefcase, Clock, Users, Search, School, GraduationCap, Building } from "lucide-react"
import { toast } from "sonner"
import { VideoRoom } from "@/components/video-room"
import { auth, db } from "@/lib/firebase"
import type { User } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"

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
  college: string
  branch: string
  year: string
}

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([])
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([])
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchFilters, setSearchFilters] = useState({
    college: "",
    branch: "",
    year: "",
    query: ""
  })

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
        setFilteredExperts(expertsData)
      } catch (error) {
        console.error("Error fetching experts:", error)
        toast.error("Failed to load experts")
      } finally {
        setLoading(false)
      }
    }

    fetchExperts()
  }, [])

  useEffect(() => {
    const filtered = experts.filter(expert => {
      const matchesCollege = !searchFilters.college || expert.college.toLowerCase().includes(searchFilters.college.toLowerCase())
      const matchesBranch = !searchFilters.branch || expert.branch.toLowerCase().includes(searchFilters.branch.toLowerCase())
      const matchesYear = !searchFilters.year || expert.year.includes(searchFilters.year)
      const matchesQuery = !searchFilters.query || 
        expert.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        expert.expertise.some(exp => exp.toLowerCase().includes(searchFilters.query.toLowerCase()))

      return matchesCollege && matchesBranch && matchesYear && matchesQuery
    })

    setFilteredExperts(filtered)
  }, [searchFilters, experts])

  // ... (keep existing handleBooking and startVideoCall functions)

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
                onChange={(e) => setSearchFilters(prev => ({ ...prev, query: e.target.value }))}
              />
            </div>
            <Select
              value={searchFilters.college}
              onValueChange={(value) => setSearchFilters(prev => ({ ...prev, college: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select College" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(experts.map(e => e.college))).map(college => (
                  <SelectItem key={college} value={college}>{college}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={searchFilters.branch}
              onValueChange={(value) => setSearchFilters(prev => ({ ...prev, branch: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(experts.map(e => e.branch))).map(branch => (
                  <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={searchFilters.year}
              onValueChange={(value) => setSearchFilters(prev => ({ ...prev, year: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(experts.map(e => e.year))).map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </div>

      {/* Expert Cards */}
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
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                  <div className="p-6 bg-gradient-to-br from-white to-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <img
                          src={expert.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(expert.name)}
                          alt={expert.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-900 group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-blue-900">{expert.name}</h3>
                          <p className="text-sm text-gray-600">{expert.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span className="ml-1 text-sm font-medium">{expert.rating}</span>
                      </div>
                    </div>

                    {/* Rest of the card content remains the same */}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Keep existing Dialog and Why Choose Us section */}
    </div>
  )
}