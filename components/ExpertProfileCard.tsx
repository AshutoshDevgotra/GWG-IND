import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExpertProfileCardProps {
  name: string
  title: string
  image: string
  institutionType: string
  college: string
  branch: string
  year: string
  expertise: string[]
  experience: string
  price: number
  availability: string
}

export function ExpertProfileCard({
  name,
  title,
  image,
  institutionType,
  college,
  branch,
  year,
  expertise,
  experience,
  price,
  availability,
}: ExpertProfileCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image src={image || "/placeholder.svg"} alt={name} width={128} height={128} className="object-cover" />
        </div>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <p className="text-gray-500">{title}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Institution Details</h3>
          <p>
            {institutionType} - {college}
          </p>
          <p>
            {branch}, {year} Year
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Experience</h3>
          <p>{experience}</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Price</h3>
            <p>₹{price}/hour</p>
          </div>
          <Badge variant={availability === "Available Now" ? "secondary" : "destructive"}>{availability}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

