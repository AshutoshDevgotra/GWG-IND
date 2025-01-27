// app/experts/[id]/edit/EditExpertForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

interface EditExpertFormProps {
  id: string;
}

export default function EditExpertForm({ id }: EditExpertFormProps) {
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
        fetchExpertData(id);
      } else {
        router.push("/experts");
        toast.error("Please sign in to edit your profile");
      }
    });
    return () => unsubscribe();
  }, [id, router]);

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
      
      const expertRef = doc(db, "experts", id);
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <Input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expertise
              </label>
              {formData.expertise.map((exp, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    value={exp}
                    onChange={(e) => handleExpertiseChange(index, e.target.value)}
                    placeholder="Enter expertise"
                    required
                  />
                  {formData.expertise.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeExpertiseField(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addExpertiseField}
                className="mt-2"
              >
                Add Expertise
              </Button>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <Input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (per hour)
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <Input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating Profile..." : "Update Profile"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}