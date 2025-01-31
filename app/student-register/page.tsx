"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { db, auth } from "@/lib/firebase"
import { collection, addDoc, doc, deleteDoc, updateDoc, getDocs, query, where } from "firebase/firestore"
import type { User } from "firebase/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit2, Trash2, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const YEARS = ["1st", "2nd", "3rd", "4th", "5th"]

const INSTITUTION_TYPES = ["IIT", "NIT", "AIIMS", "IIIT"]

interface College {
  type: string;
  shortName: string;
  state: string;
  emailDomain: string;
  branches?: string[];
  emailFormats?: string[];
}

const COLLEGES: College[] = [
    // IITs
    {
      type: "IIT",
      shortName: "IIT Bombay",
      state: "Maharashtra",
      emailDomain: "iitb.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Delhi",
      state: "Delhi",
      emailDomain: "iitd.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Madras",
      state: "Tamil Nadu",
      emailDomain: "iitm.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Kanpur",
      state: "Uttar Pradesh",
      emailDomain: "iitk.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Kharagpur",
      state: "West Bengal",
      emailDomain: "iitkgp.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Roorkee",
      state: "Uttarakhand",
      emailDomain: "iitr.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Guwahati",
      state: "Assam",
      emailDomain: "iitg.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Hyderabad",
      state: "Telangana",
      emailDomain: "iith.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Indore",
      state: "Madhya Pradesh",
      emailDomain: "iiti.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Bhubaneswar",
      state: "Odisha",
      emailDomain: "iitbbs.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Gandhinagar",
      state: "Gujarat",
      emailDomain: "iitgn.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Jodhpur",
      state: "Rajasthan",
      emailDomain: "iitj.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Patna",
      state: "Bihar",
      emailDomain: "iitp.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Ropar",
      state: "Punjab",
      emailDomain: "iitrpr.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Mandi",
      state: "Himachal Pradesh",
      emailDomain: "iitmandi.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Varanasi",
      state: "Uttar Pradesh",
      emailDomain: "iitbhu.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Palakkad",
      state: "Kerala",
      emailDomain: "iitpkd.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Tirupati",
      state: "Andhra Pradesh",
      emailDomain: "iittp.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Dhanbad",
      state: "Jharkhand",
      emailDomain: "iitism.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Bhilai",
      state: "Chhattisgarh",
      emailDomain: "iitbhilai.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Goa",
      state: "Goa",
      emailDomain: "iitgoa.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Jammu",
      state: "Jammu and Kashmir",
      emailDomain: "iitjammu.ac.in"
    },
    {
      type: "IIT",
      shortName: "IIT Dharwad",
      state: "Karnataka",
      emailDomain: "iitdh.ac.in"
    },
  
    // NITs
    {
      type: "NIT",
      shortName: "NIT Trichy",
      state: "Tamil Nadu",
      emailDomain: "nitt.edu"
    },
    {
      type: "NIT",
      shortName: "NIT Warangal",
      state: "Telangana",
      emailDomain: "nitw.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Surathkal",
      state: "Karnataka",
      emailDomain: "nitk.edu.in"
    },
    {
      type: "NIT",
      shortName: "NIT Calicut",
      state: "Kerala",
      emailDomain: "nitc.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Rourkela",
      state: "Odisha",
      emailDomain: "nitrkl.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Kurukshetra",
      state: "Haryana",
      emailDomain: "nitkkr.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Durgapur",
      state: "West Bengal",
      emailDomain: "nitdgp.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Silchar",
      state: "Assam",
      emailDomain: "nits.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Jaipur",
      state: "Rajasthan",
      emailDomain: "mnit.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Nagpur",
      state: "Maharashtra",
      emailDomain: "vnit.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Allahabad",
      state: "Uttar Pradesh",
      emailDomain: "mnnit.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Hamirpur",
      state: "Himachal Pradesh",
      emailDomain: "nith.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Jalandhar",
      state: "Punjab",
      emailDomain: "nitj.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Patna",
      state: "Bihar",
      emailDomain: "nitp.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Meghalaya",
      state: "Meghalaya",
      emailDomain: "nitm.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Manipur",
      state: "Manipur",
      emailDomain: "nitmanipur.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Mizoram",
      state: "Mizoram",
      emailDomain: "nitmz.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Nagaland",
      state: "Nagaland",
      emailDomain: "nitnagaland.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Puducherry",
      state: "Puducherry",
      emailDomain: "nitpy.ac.in"
    },
    {
      type: "NIT",
      shortName: "NIT Sikkim",
      state: "Sikkim",
      emailDomain: "nitsikkim.ac.in"
    }
]

const COMMON_ENGINEERING_BRANCHES = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "chemical",
  "Aerospace",
    "Biotechnology",
    "Automobile",
    "Agricultural",
    "Biomedical",
    "Environmental",
]

interface FormData {
  name: string;
  institutionType: string;
  college: string;
  branch: string;
  year: string;
  collegeEmail: string;
  aadharNumber: string;
  bio: string;
  expertise: string[];
  experience: string;
  price: number;
  phone: string;
}

export default function ExpertRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string | null>(null)
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [formErrors, setFormErrors] = useState<{ collegeEmail?: string }>({})

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
  })

  const filteredColleges = COLLEGES.filter(college => 
    college.type === selectedInstitutionType
  )

  const getBranches = () => {
    if (!selectedCollege) return COMMON_ENGINEERING_BRANCHES
    return selectedCollege.branches || COMMON_ENGINEERING_BRANCHES
  }

  const validateCollegeEmail = (email: string): boolean => {
    if (!selectedCollege || !email) return false
    const domain = selectedCollege.emailDomain
    const pattern = new RegExp(`^[a-zA-Z0-9._-]+@${domain}$`)
    return pattern.test(email.toLowerCase())
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))

    // Clear previous error for this field
    if (name in formErrors) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }))
    }

    // Validate email if the field is collegeEmail
    if (name === "collegeEmail" && selectedCollege) {
      const isValid = validateCollegeEmail(value)
      if (!isValid && value) {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          collegeEmail: `Please use your official ${selectedCollege.shortName} email address (@${selectedCollege.emailDomain})`
        }))
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate email
      if (!validateCollegeEmail(formData.collegeEmail)) {
        setFormErrors({
          collegeEmail: `Please use your official ${selectedCollege?.shortName} email address`
        })
        return
      }

      if (!emailVerificationSent) {
        setEmailVerificationSent(true)
        toast.success("Verification email sent!")
      } else {
        console.log("Form submitted:", formData)
        toast.success("Profile created successfully!")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-[#172554] pt-24 pb-32 mb-[40px] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Expert Registration
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Share your expertise from India's premier institutions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Institution Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Institution Type Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution Type
                  </label>
                  <Select 
                    onValueChange={(value) => {
                      setSelectedInstitutionType(value)
                      setSelectedCollege(null)
                      setFormData(prev => ({
                        ...prev,
                        institutionType: value,
                        college: "",
                        branch: "",
                        collegeEmail: ""
                      }))
                      setFormErrors({})
                    }}
                  >
                    <SelectTrigger className="bg-white">
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

                {/* College Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution
                  </label>
                  <Select
                    disabled={!selectedInstitutionType}
                    onValueChange={(value) => {
                      const college = COLLEGES.find(c => c.shortName === value)
                      setSelectedCollege(college || null)
                      setFormData(prev => ({
                        ...prev,
                        college: value,
                        collegeEmail: ""
                      }))
                      setFormErrors({})
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select your institution" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredColleges.map((college) => (
                        <SelectItem key={college.shortName} value={college.shortName}>
                          {college.shortName} - {college.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Branch Select */}
                {selectedCollege && selectedInstitutionType !== "AIIMS" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branch
                    </label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {getBranches().map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Year Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <Select
                    onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year} Year
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Email Input */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College Email
                  </label>
                  <Input
                    required
                    type="email"
                    name="collegeEmail"
                    value={formData.collegeEmail}
                    onChange={handleInputChange}
                    placeholder={selectedCollege ? `your.email@${selectedCollege.emailDomain}` : "Enter college email"}
                    className={`bg-white ${formErrors.collegeEmail ? 'border-red-500' : ''}`}
                  />
                  {selectedCollege && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        Use your official {selectedCollege.shortName} email address (@{selectedCollege.emailDomain})
                      </p>
                      {selectedCollege.emailFormats && (
                        <p className="text-sm text-gray-500 mt-1">
                          Accepted formats:
                          <ul className="list-disc list-inside">
                            {selectedCollege.emailFormats.map((format, index) => (
                              <li key={index} className="ml-2">{format}</li>
                            ))}
                          </ul>
                        </p>
                      )}
                    </div>
                  )}
                  {formErrors.collegeEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.collegeEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-[#172554] hover:bg-[#1e3a8a]" 
              disabled={loading || Boolean(formErrors.collegeEmail)}
            >
              {loading ? "Processing..." : emailVerificationSent ? "Complete Registration" : "Send Verification Email"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}