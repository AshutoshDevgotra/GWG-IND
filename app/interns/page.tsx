// pages/interns.tsx
export default function InternsPage() {
  const interns = [
    {
      name: "Ayush Soni",
      jobId: "GWG-UIUX-2025-001",
      internshipFrom: "June 14, 2025",
      internshipTo: "July 14, 2025",
      role: "UI/UX Design Intern",
      certificateUrl: "/certificates/ayush-soni-certificate.png", // Upload to public folder
    },
    // Add more interns here as needed
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-green-700">🌟 Our Past Interns</h1>
      <p className="mb-6">We proudly showcase the brilliant minds who completed internships at GWG.</p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {interns.map((intern, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold">{intern.name}</h2>
            <p><strong>Job ID:</strong> {intern.jobId}</p>
            <p><strong>Role:</strong> {intern.role}</p>
            <p><strong>Internship Duration:</strong> {intern.internshipFrom} – {intern.internshipTo}</p>
            <a
              href={intern.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
