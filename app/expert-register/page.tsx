"use client"

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type College = {
  type: string
  name: string
  shortName: string
  state: string
  emailDomain: string
}

interface FormData {
  name: string
  institutionType: string
  college: string
  branch: string
  year: string
  collegeEmail: string
  aadharNumber: string
  bio: string
  expertise: string[]
  experience: string
  price: number
  phone: string
  title: string
  availability: string
  email?: string
}

const INSTITUTION_TYPES = ["IIT", "NIT", "IIIT", "AIIMS"]

const COLLEGES: College[] = [
  {
    type: "IIT",
    shortName: "IIT Bombay",
    name: "Indian Institute of Technology Bombay",
    state: "Maharashtra",
    emailDomain: "iitb.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Delhi",
    name: "Indian Institute of Technology Delhi",
    state: "Delhi",
    emailDomain: "iitd.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Madras",
    name: "Indian Institute of Technology Madras",
    state: "Tamil Nadu",
    emailDomain: "iitm.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Kanpur",
    name: "Indian Institute of Technology Kanpur",
    state: "Uttar Pradesh",
    emailDomain: "iitk.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Kharagpur",
    name: "Indian Institute of Technology Kharagpur",
    state: "West Bengal",
    emailDomain: "iitkgp.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Roorkee",
    name: "Indian Institute of Technology Roorkee",
    state: "Uttarakhand",
    emailDomain: "iitr.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Guwahati",
    name: "Indian Institute of Technology Guwahati",
    state: "Assam",
    emailDomain: "iitg.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Hyderabad",
    name: "Indian Institute of Technology Hyderabad",
    state: "Telangana",
    emailDomain: "iith.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Indore",
    name: "Indian Institute of Technology Indore",
    state: "Madhya Pradesh",
    emailDomain: "iiti.ac.in",
  },
  {
    type: "IIT",
    shortName: "IIT Bhubaneswar",
    name: "Indian Institute of Technology Bhubaneswar",
    state: "Odisha",
    emailDomain: "iitbbs.ac.in",
  },

  {
    type: "NIT",
    shortName: "NIT Trichy",
    name: "National Institute of Technology Tiruchirappalli",
    state: "Tamil Nadu",
    emailDomain: "nitt.edu",
  },
  {
    type: "NIT",
    shortName: "NIT Warangal",
    name: "National Institute of Technology Warangal",
    state: "Telangana",
    emailDomain: "nitw.ac.in",
  },
  {
    type: "NIT",
    shortName: "NIT Surathkal",
    name: "National Institute of Technology Karnataka, Surathkal",
    state: "Karnataka",
    emailDomain: "nitk.edu.in",
  },
  {
    type: "NIT",
    shortName: "NIT Rourkela",
    name: "National Institute of Technology Rourkela",
    state: "Odisha",
    emailDomain: "nitrkl.ac.in",
  },
  {
    type: "NIT",
    shortName: "NIT Calicut",
    name: "National Institute of Technology Calicut",
    state: "Kerala",
    emailDomain: "nitc.ac.in",
  },
  {
    type: "NIT",
    shortName: "NIT Nagpur",
    name: "Visvesvaraya National Institute of Technology",
    state: "Maharashtra",
    emailDomain: "vnit.ac.in",
  },
  {
    type: "NIT",
    shortName: "NIT Jaipur",
    name: "Malaviya National Institute of Technology Jaipur",
    state: "Rajasthan",
    emailDomain: "mnit.ac.in",
  },
  {
    type: "NIT",
    shortName: "NIT Allahabad",
    name: "Motilal Nehru National Institute of Technology Allahabad",
    state: "Uttar Pradesh",
    emailDomain: "mnnit.ac.in",
  },
  {
    type: "NIT",
    shortName: "NIT Kurukshetra",
    name: "National Institute of Technology Kurukshetra",
    state: "Haryana",
    emailDomain: "nitkkr.ac.in",
  },
  {
    type: "NIT",
    shortName: "NIT Durgapur",
    name: "National Institute of Technology Durgapur",
    state: "West Bengal",
    emailDomain: "nitdgp.ac.in",
  },

  {
    type: "AIIMS",
    shortName: "AIIMS Delhi",
    name: "All India Institute of Medical Sciences Delhi",
    state: "Delhi",
    emailDomain: "aiims.edu",
  },
  {
    type: "AIIMS",
    shortName: "AIIMS Jodhpur",
    name: "All India Institute of Medical Sciences Jodhpur",
    state: "Rajasthan",
    emailDomain: "aiimsjodhpur.edu.in",
  },
  {
    type: "AIIMS",
    shortName: "AIIMS Bhubaneswar",
    name: "All India Institute of Medical Sciences Bhubaneswar",
    state: "Odisha",
    emailDomain: "aiimsbhubaneswar.nic.in",
  },
  {
    type: "AIIMS",
    shortName: "AIIMS Patna",
    name: "All India Institute of Medical Sciences Patna",
    state: "Bihar",
    emailDomain: "aiimspatna.org",
  },
  {
    type: "AIIMS",
    shortName: "AIIMS Raipur",
    name: "All India Institute of Medical Sciences Raipur",
    state: "Chhattisgarh",
    emailDomain: "aiimsraipur.edu.in",
  },
  {
    type: "AIIMS",
    shortName: "AIIMS Rishikesh",
    name: "All India Institute of Medical Sciences Rishikesh",
    state: "Uttarakhand",
    emailDomain: "aiimsrishikesh.edu.in",
  },
]

// ... continue for all other colleges

const BRANCHES = [
  "Computer Science and Engineering",
  "Electronics and Communication Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Biotechnology",
  "Metallurgical and Materials Engineering",
  "Production and Industrial Engineering",
  "Engineering Physics",
  "Engineering Mathematics",
  "MBBS",
  "BDS",
  "B.Pharm",
  // Add more branches as needed
]

export default function ExpertRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string | null>(null)
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [formErrors, setFormErrors] = useState<{ collegeEmail?: string }>({})
  const [showExpertForm, setShowExpertForm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [expertDocId, setExpertDocId] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [idCardImageFile, setIdCardImageFile] = useState<File | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    institutionType: "",
    college: "",
    branch: "",
    year: "",
    collegeEmail: "",
    aadharNumber: "",
    bio: "",
    expertise: [""],
    experience: "",
    price: 50,
    phone: "",
    title: "",
    availability: "Available Now",
  })

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!emailVerificationSent) {
        // Validate email
        if (!validateCollegeEmail(formData.collegeEmail)) {
          setFormErrors({
            collegeEmail: `Please use your official ${selectedCollege?.shortName} email address`,
          })
          return
        }

        setEmailVerificationSent(true)
        toast.success("Verification email sent!")
        setShowExpertForm(true)
      } else {
        // Handle image uploads
        let profileImageUrl = ""
        let idCardImageUrl = ""

        if (profileImageFile) {
          const profileImageRef = ref(storage, `experts/${user?.uid}/profile_${profileImageFile.name}`)
          const profileSnapshot = await uploadBytes(profileImageRef, profileImageFile)
          profileImageUrl = await getDownloadURL(profileSnapshot.ref)
          console.log("Profile image uploaded successfully. URL:", profileImageUrl)
        }

        if (idCardImageFile) {
          const idCardImageRef = ref(storage, `experts/${user?.uid}/id_card_${idCardImageFile.name}`)
          const idCardSnapshot = await uploadBytes(idCardImageRef, idCardImageFile)
          idCardImageUrl = await getDownloadURL(idCardSnapshot.ref)
          console.log("ID card image uploaded successfully. URL:", idCardImageUrl)
        }

        // Save expert data to Firestore
        const expertData = {
          ...formData,
          userId: user?.uid,
          profileImage: profileImageUrl,
          idCardImage: idCardImageUrl,
          createdAt: new Date().toISOString(),
        }

        const docRef = await addDoc(collection(db, "experts"), expertData)
        console.log("Expert profile created with ID:", docRef.id)

        toast.success("Expert profile created successfully!")
        router.push("/experts")
      }
    } catch (error) {
      console.error("Error creating expert profile:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>, type: "profile" | "idCard") => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === "profile") {
        setProfileImageFile(file)
      } else {
        setIdCardImageFile(file)
      }
      console.log(`${type} image file selected:`, file.name)
    }
  }

  const handleExpertiseChange = (index: number, value: string) => {
    const updatedExpertise = [...formData.expertise]
    updatedExpertise[index] = value
    setFormData((prev) => ({ ...prev, expertise: updatedExpertise }))
  }

  const removeExpertiseField = (index: number) => {
    const updatedExpertise = [...formData.expertise]
    updatedExpertise.splice(index, 1)
    setFormData((prev) => ({ ...prev, expertise: updatedExpertise }))
  }

  const addExpertiseField = () => {
    setFormData((prev) => ({ ...prev, expertise: [...prev.expertise, ""] }))
  }

  const validateCollegeEmail = (email: string): boolean => {
    // Add your email validation logic here
    // This is a placeholder, replace with your actual validation
    return email.includes("@")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-[#172554] pt-24 pb-32 mb-[40px] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Expert Registration</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Share your expertise from India's premier institutions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {!showExpertForm ? (
              // Institution Details Form
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Institution Details</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution Type</label>
                  <Select
                    name="institutionType"
                    value={formData.institutionType}
                    onValueChange={(value) => {
                      setSelectedInstitutionType(value)
                      setSelectedCollege(null)
                      setFormData((prev) => ({
                        ...prev,
                        institutionType: value,
                        college: "",
                        branch: "",
                        collegeEmail: "",
                      }))
                      setFormErrors({})
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      {INSTITUTION_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                  <Select
                    name="college"
                    value={formData.college}
                    onValueChange={(value) => {
                      const college = COLLEGES.find((c) => c.shortName === value)
                      setSelectedCollege(college || null)
                      setFormData((prev) => ({
                        ...prev,
                        college: value,
                        collegeEmail: "",
                      }))
                      setFormErrors({})
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your institution" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLLEGES.filter((college) => college.type === formData.institutionType).map((college) => (
                        <SelectItem key={college.shortName} value={college.shortName}>
                          {college.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                  <Select
                    name="branch"
                    value={formData.branch}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, branch: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANCHES.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year of Graduation</label>
                  <Input
                    required
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="e.g., 2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College Email</label>
                  <Input
                    required
                    name="collegeEmail"
                    value={formData.collegeEmail}
                    onChange={handleInputChange}
                    placeholder="e.g., john.doe@iitb.ac.in"
                  />
                  {formErrors.collegeEmail && <p className="text-red-500 text-xs mt-1">{formErrors.collegeEmail}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                  <Input
                    required
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Enter your Aadhar Number"
                  />
                </div>
              </div>
            ) : (
              // Expert Details Form
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Expert Details</h2>

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
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "profile")}
                    className="text-sm"
                  />
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
                    <Select
                      name="availability"
                      value={formData.availability}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available Now">Available Now</SelectItem>
                        <SelectItem value="Not Available">Not Available</SelectItem>
                      </SelectContent>
                    </Select>
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
              </div>
            )}
            {/* ID CARD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College ID Card</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "idCard")}
                required
                className="text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Please upload a clear image of your college ID card</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#172554] hover:bg-[#1e3a8a]"
              disabled={loading || Boolean(formErrors.collegeEmail)}
            >
              {loading ? "Processing..." : showExpertForm ? "Create Profile" : "Send Verification Email"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

