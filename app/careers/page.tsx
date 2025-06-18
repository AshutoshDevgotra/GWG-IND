// pages/careers.tsx
export default function CareersPage() {
  return (
    <div className="min-h-screen p-8 bg-white text-black">
      <h1 className="text-4xl font-bold mb-6">Careers at GrowWithGarry</h1>
      <p className="mb-8">Join us to create, automate, and scale with AI-driven solutions. We’re looking for talented individuals passionate about technology and design.</p>
      
      <div className="border rounded-lg p-6 bg-gray-100 shadow-md">
        <h2 className="text-2xl font-semibold mb-2">🎨 UI/UX Design Intern</h2>
        <p><strong>Duration:</strong> 1 Month</p>
        <p><strong>Location:</strong> Remote</p>
        <p><strong>Start Date:</strong> June 14, 2025</p>
        <p><strong>Tools:</strong> Figma, Canva, Adobe XD</p>
        <p className="mt-4">This role focuses on real-world projects, improving visual communication, user-centered wireframes, and prototyping.</p>
        <a href="/apply" className="inline-block mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">Apply Now</a>
      </div>
    </div>
  );
}
