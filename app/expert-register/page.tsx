"use client"

import { useState, useEffect, ChangeEvent, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { db, auth } from "@/lib/firebase"
import { collection, addDoc, doc, deleteDoc, updateDoc, getDocs, query, where } from "firebase/firestore"
import type { User } from "firebase/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit2, Trash2 } from "lucide-react"

export default function ExpertRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [expertDocId, setExpertDocId] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
          name: user.displayName || "",
        }))
        
        // Check if user already has an expert profile
        const expertsRef = collection(db, "experts")
        const q = query(expertsRef, where("userId", "==", user.uid))
        const querySnapshot = await getDocs(q)
        
        if (!querySnapshot.empty) {
          const expertDoc = querySnapshot.docs[0]
          setExpertDocId(expertDoc.id)
          setFormData(expertDoc.data() as typeof formData)
        }
      } else {
        router.push("/experts")
        toast.error("Please sign in to register as an expert")
      }
    })
    return () => unsubscribe()
  }, [router])

  // ... (keep existing handleInputChange, handleImageChange, handleExpertiseChange, 
  // addExpertiseField, and removeExpertiseField functions)

  const handleEdit = () => {
    setIsEditMode(true)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!expertDocId || !user) return

    if (window.confirm("Are you sure you want to delete your expert profile? This action cannot be undone.")) {
      try {
        setLoading(true)
        await deleteDoc(doc(db, "experts", expertDocId))
        toast.success("Expert profile deleted successfully!")
        router.push("/experts")
      } catch (error) {
        console.error("Error deleting expert profile:", error)
        toast.error("Failed to delete expert profile. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!expertDocId || !user) return

    try {
      setLoading(true)

      const expertData = {
        ...formData,
        userId: user.uid,
        updatedAt: new Date().toISOString(),
        expertise: formData.expertise.filter((exp) => exp.trim() !== ""),
      }

      await updateDoc(doc(db, "experts", expertDocId), expertData)

      toast.success("Expert profile updated successfully!")
      setIsEditMode(false)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating expert profile:", error)
      toast.error("Failed to update expert profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("Please sign in to register as an expert")
      return
    }

    if (isEditMode) {
      await handleUpdate(e)
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

      const docRef = await addDoc(collection(db, "experts"), expertData)
      setExpertDocId(docRef.id)

      toast.success("Expert profile created successfully!")
      router.push("/experts")
    } catch (error) {
      console.error("Error creating expert profile:", error)
      toast.error("Failed to create expert profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.")
  }

  function handleExpertiseChange(index: number, value: string): void {
    throw new Error("Function not implemented.")
  }

  function removeExpertiseField(index: number): void {
    throw new Error("Function not implemented.")
  }

  function addExpertiseField(event: MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary pt-24 pb-32 mb-[40px] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {expertDocId ? 'Your Expert Profile' : 'Register as an Expert'}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Share your expertise and connect with clients worldwide
            </p>
            {expertDocId && (
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Profile
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      {/* Render form in dialog when editing */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Expert Profile</DialogTitle>
          </DialogHeader>
          {/* Original form JSX goes here */}
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
        </DialogContent>
      </Dialog>

      {/* Show form directly when creating new profile */}
      {!expertDocId && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... (keep all your existing form fields) ... */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Profile..." : "Register as Expert"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}