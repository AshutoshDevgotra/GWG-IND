// app/expert/edit/[id]/page.tsx
import { Metadata } from 'next';
import { useParams } from 'next/navigation';
type PageProps = {
  params: {
    id: string; // ✅ Correct type for App Router
  };
};

export default function EditExpertPage({ params }: { params: { id: string } }) {
  return <div>Editing expert ID: {params.id}</div>;
}

// Optional: Add metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Edit Expert ${params.id}`,
  };
}