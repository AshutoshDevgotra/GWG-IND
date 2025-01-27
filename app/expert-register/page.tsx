"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { db, auth } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import type { User } from "firebase/auth"

export default function ExpertRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    rating: 5.0,
    reviews: 0,
    expertise: [""],
    experience: "",
    price: 50,
    availability: "Available Now",
    bio: "",
    email: "",
    phone: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
          name: user.displayName || "",
        }))
      } else {
        router.push("/experts")
        toast.error("Please sign in to register as an expert")
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImageFile(file)
    if (file) {
      setFormData((prev) => ({ ...prev, image: file.name }))
    }
  }

  const handleExpertiseChange = (index: number, value: string) => {
    const newExpertise = [...formData.expertise]
    newExpertise[index] = value
    setFormData((prev) => ({
      ...prev,
      expertise: newExpertise,
    }))
  }

  const addExpertiseField = () => {
    setFormData((prev) => ({
      ...prev,
      expertise: [...prev.expertise, ""],
    }))
  }

  const removeExpertiseField = (index: number) => {
    if (formData.expertise.length > 1) {
      const newExpertise = formData.expertise.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        expertise: newExpertise,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("Please sign in to register as an expert")
      return
    }

    try {
      setLoading(true)

      const expertData = {
        ...formData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        expertise: formData.expertise.filter((exp) => exp.trim() !== ""),
      }

      await addDoc(collection(db, "experts"), expertData)

      toast.success("Expert profile created successfully!")
      router.push("/experts")
    } catch (error) {
      console.error("Error creating expert profile:", error)
      toast.error("Failed to create expert profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary pt-24 pb-32 mb-[40px] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Register as an Expert</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Share your expertise and connect with clients worldwide
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input required name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                <Input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brand Strategy Expert"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              {imageFile && <p className="mt-2 text-sm text-gray-500">Selected file: {imageFile.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
              {formData.expertise.map((exp, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    required
                    value={exp}
                    onChange={(e) => handleExpertiseChange(index, e.target.value)}
                    placeholder="e.g., Brand Development"
                  />
                  {formData.expertise.length > 1 && (
                    <Button type="button" variant="outline" onClick={() => removeExpertiseField(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addExpertiseField} className="mt-2">
                Add Expertise
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <Input
                  required
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10+ years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Price (₹)</label>
                <Input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <Textarea
                required
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about your professional background and expertise..."
                className="h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 1234567890"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Profile..." : "Register as Expert"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

