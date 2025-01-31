"use client"

import { useState, useEffect, type ChangeEvent, type MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { db, auth, storage } from "@/lib/firebase"
import { collection, addDoc, doc, deleteDoc, updateDoc, getDocs, query, where } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { User } from "firebase/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

      let imageUrl = ""

      // Handle image upload if file exists
      if (imageFile) {
        const imageRef = ref(storage, `experts/${imageFile.name}`)
        await uploadBytes(imageRef, imageFile)
        imageUrl = await getDownloadURL(imageRef)
      }

      const expertData = {
        ...formData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        image: imageUrl || formData.image,
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

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      setFormData((prev) => ({ ...prev, image: file.name }))
    }
  }

  function handleExpertiseChange(index: number, value: string): void {
    const updatedExpertise = [...formData.expertise]
    updatedExpertise[index] = value
    setFormData((prev) => ({ ...prev, expertise: updatedExpertise }))
  }

  function removeExpertiseField(index: number): void {
    const updatedExpertise = [...formData.expertise]
    updatedExpertise.splice(index, 1)
    setFormData((prev) => ({ ...prev, expertise: updatedExpertise }))
  }

  function addExpertiseField(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    setFormData((prev) => ({ ...prev, expertise: [...prev.expertise, ""] }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {expertDocId && (
        <div className="absolute top-4 right-4 flex gap-2">
          <Button onClick={handleEdit} variant="outline" className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button onClick={handleDelete} variant="destructive" className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete Profile
          </Button>
        </div>
      )}
      <div className="bg-primary pt-48 pb-32 mb-[40px] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {expertDocId ? "Your Expert Profile" : "Register as an Expert"}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Share your expertise and connect with clients worldwide
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      {!expertDocId && (
        <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
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
                <Input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
              </div>

              {/* Expertise Fields */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                {formData.expertise.map((expertise, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Input
                      value={expertise}
                      onChange={(e) => handleExpertiseChange(index, e.target.value)}
                      placeholder="e.g., Web Development"
                      className="flex-1"
                    />
                    <button type="button" className="text-red-500" onClick={() => removeExpertiseField(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <Button onClick={addExpertiseField} variant="outline">
                  Add Expertise
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <Textarea
                  required
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 years of experience in brand strategy"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Hour</label>
                  <Input
                    required
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    required
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="block w-full text-sm py-2 px-4 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Available Now">Available Now</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <Textarea
                  required
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="A brief bio about you"
                />
              </div>

              <div className="text-right">
                <Button type="submit" variant="default" disabled={loading}>
                  {loading ? "Saving..." : isEditMode ? "Update Profile" : "Create Profile"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Render form in dialog when editing */}
      <Dialog open={isEditMode && isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Expert Profile</DialogTitle>
          </DialogHeader>
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
              <Input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
            </div>

            {/* Expertise Fields */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
              {formData.expertise.map((expertise, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <Input
                    value={expertise}
                    onChange={(e) => handleExpertiseChange(index, e.target.value)}
                    placeholder="e.g., Web Development"
                    className="flex-1"
                  />
                  <button type="button" className="text-red-500" onClick={() => removeExpertiseField(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <Button onClick={addExpertiseField} variant="outline">
                Add Expertise
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <Textarea
                required
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 5 years of experience in brand strategy"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Hour</label>
                <Input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  required
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="block w-full text-sm py-2 px-4 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Available Now">Available Now</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <Textarea
                required
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="A brief bio about you"
              />
            </div>

            <div className="text-right">
              <Button type="submit" variant="default" disabled={loading}>
                {loading ? "Saving..." : isEditMode ? "Update Profile" : "Create Profile"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

