import { Metadata } from 'next';

// Define the type for the params
type PageProps = {
  params: {
    id: string; // ✅ Correct type for App Router
  };
};

// Mock function to fetch expert data (replace with your actual data fetching logic)
async function getExpert(id: string) {
  // Simulate a database or API call
  const experts = [
    { id: '1', name: 'John Doe', title: 'Software Engineer', bio: 'Expert in React and Next.js' },
    { id: '2', name: 'Jane Smith', title: 'Data Scientist', bio: 'Expert in Machine Learning' },
  ];

  const expert = experts.find((expert) => expert.id === id);
  if (!expert) {
    throw new Error(`Expert with ID ${id} not found`);
  }

  return expert;
}

// Main component
export default async function EditExpertPage({ params }: PageProps) {
  // Fetch expert data based on the ID
  const expert = await getExpert(params.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Expert: {expert.name}</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            defaultValue={expert.name}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            defaultValue={expert.title}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            defaultValue={expert.bio}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

// Optional: Add metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Fetch expert data for metadata
  const expert = await getExpert(params.id);

  return {
    title: `Edit Expert: ${expert.name}`,
    description: `Edit the profile of ${expert.name}, ${expert.title}.`,
  };
}