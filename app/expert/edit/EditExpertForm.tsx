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

interface ExpertFormData {
  expertise: string[];
  // add other form fields here
}

interface EditExpertFormProps {
  id: string;
}

export default function EditExpertForm({ id }: EditExpertFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<ExpertFormData>({ expertise: [] });

  // ... rest of your component code remains the same, but use `id` prop instead of `params.id`
  
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
    return unsubscribe;
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
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

  // ... rest of your component code remains the same

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Add expertise (comma-separated)"
            value={formData.expertise.join(", ")}
            onChange={(e) => setFormData({
              ...formData,
              expertise: e.target.value.split(",").map(item => item.trim())
            })}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function fetchExpertData(id: string) {
    throw new Error("Function not implemented.");
}
function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}

