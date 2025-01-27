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

interface EditExpertPageProps {
  params: {
    id: string;
  };
}

export default function EditExpertPage({ params }: EditExpertPageProps) {
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
            {/* Form fields here */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating Profile..." : "Update Profile"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
