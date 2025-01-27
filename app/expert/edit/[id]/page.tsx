// app/expert/edit/[id]/page.tsx
"use client";

import { useState, useEffect, Key } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

export default function EditExpertPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    expertise: [""],
    experience: "",
    price: 50,
    availability: "Available Now",
    bio: "",
    email: "",
    phone: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchExpertData(params.id);
      } else {
        router.push("/experts");
        toast.error("Please sign in to edit your profile");
      }
    });
    return () => unsubscribe();
  }, [params.id, router]);

  const fetchExpertData = async (id: string) => {
    try {
      const expertDoc = await getDoc(doc(db, "experts", id));
      if (expertDoc.exists()) {
        setFormData(expertDoc.data() as typeof formData);
      } else {
        toast.error("Expert profile not found");
        router.push("/experts");
      }
    } catch (error) {
      console.error("Error fetching expert data:", error);
      toast.error("Failed to load expert profile");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpertiseChange = (index: number, value: string) => {
    const newExpertise = [...formData.expertise];
    newExpertise[index] = value;
    setFormData((prev) => ({
      ...prev,
      expertise: newExpertise,
    }));
  };

  const addExpertiseField = () => {
    setFormData((prev) => ({
      ...prev,
      expertise: [...prev.expertise, ""],
    }));
  };

  const removeExpertiseField = (index: number) => {
    if (formData.expertise.length > 1) {
      const newExpertise = formData.expertise.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        expertise: newExpertise,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      
      const expertRef = doc(db, "experts", params.id);
      await updateDoc(expertRef, {
        ...formData,
        expertise: formData.expertise.filter((exp) => exp.trim() !== ""),
        updatedAt: new Date().toISOString(),
      });

      toast.success("Expert profile updated successfully!");
      router.push("/experts");
    } catch (error) {
      console.error("Error updating expert profile:", error);
      toast.error("Failed to update expert profile");
    } finally {
      setLoading(false);
    }
  };
    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary pt-24 pb-32 mb-[40px] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Edit Expert Profile</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Update your profile information
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
              {formData.expertise.map((exp: string, index: number) => {
                                function handleExpertiseChange(index: number, value: string): void {
                                    throw new Error("Function not implemented.");
                                }

                  return (
                      <div key={index} className="flex gap-2 mb-2">
                          <Input
                              required
                              value={exp}
                              onChange={(e) => handleExpertiseChange(index, e.target.value)}
                              placeholder="e.g., Brand Development" />
                          {formData.expertise.length > 1 && (
                              <Button type="button" variant="outline" onClick={() => removeExpertiseField(index)}>
                                  Remove
                              </Button>
                          )}
                      </div>
                  );
              })}
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
  );
}