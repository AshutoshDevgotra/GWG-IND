// app/experts/[id]/edit/page.tsx
import EditExpertForm from '@/app/expert/edit/EditExpertForm';

// Define props type for server component
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Mark as server component and use the correct props type
export default async function EditExpertPage({ params, searchParams }: Props) {
  return <EditExpertForm id={params.id} />;
}