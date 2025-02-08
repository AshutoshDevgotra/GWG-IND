import ExpertCard from "@/components/ExpertCard";

const experts = [
  {
    id: "expert_123",
    userId: "user_123",
    name: "John Doe",
    pricePerMinute: 100,
    price: 100,
    title: "Professional Consultant",
    image: "/default-expert.jpg",
    rating: 4.5,
    availability: "available",
    year: "2023",
    isLive: false,
    institutionType: "University",
    achievements: ["Best Consultant 2022", "Top Rated Expert"],
    expertise: ["General"],
    experience: "5 years",
    bio: "Expert consultant with extensive experience",
    languages: ["English"],
    category: "Consulting",
    reviews: 0,
    sessions: 0,
    status: "available",
    location: "US",
    timezone: "UTC-5",
    education: "Master's Degree",
    certifications: [],
    skills: ["Consulting", "Leadership"],
    email: "john@example.com",
    phone: "",
    isOnline: true,
    lastSeen: new Date().toISOString(),
    averageResponseTime: "10 minutes",
    totalEarnings: 0,
    createdAt: new Date().toISOString(),
    college: "Example University",
    branch: "Computer Science",
    rank: 1,
    yearsOfExperience: 5,
    verified: true,
    active: true
  },
];

const ExpertDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expert Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} onStartChat={function (): void {
                throw new Error("Function not implemented.");
            } } onStartVoiceCall={function (): void {
                throw new Error("Function not implemented.");
            } } onStartVideoCall={function (): void {
                throw new Error("Function not implemented.");
            } } isOnline={false} />
        ))}
      </div>
    </div>
  );
};

export default ExpertDashboard;
