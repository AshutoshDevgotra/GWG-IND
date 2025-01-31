import { Metadata } from 'next';

// Define the type for the params
type PageProps = {
  params: {
    id: string; // ✅ Correct type for App Router
  };
};

// Main component
export default function EditExpertPage({ params }: PageProps) {
  return <div>Editing expert ID: {params.id}</div>;
}

// Optional: Add metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Edit Expert ${params.id}`,
  };
}