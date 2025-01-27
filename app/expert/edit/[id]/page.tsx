// app/experts/[id]/edit/page.tsx
import EditExpertForm from '@/app/expert/edit/EditExpertForm';

interface EditExpertPageProps {
  params: {
    id: string;
  };
}

export default function EditExpertPage({ params }: EditExpertPageProps) {
  return <EditExpertForm id={params.id} />;
}