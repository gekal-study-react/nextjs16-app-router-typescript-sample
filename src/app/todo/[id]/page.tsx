import { notFound } from "next/navigation";
import TodoDetailClient from "./TodoDetailClient";

// Generate static params for static export
// This function provides all possible [id] values for pre-rendering
export async function generateStaticParams() {
  // For static export with localStorage-based data,
  // we generate a reasonable number of placeholder IDs.
  // In a real app, you'd fetch these from a database or API.
  const placeholderIds = Array.from({ length: 10 }, (_, i) =>
    (Math.random().toString(36).substring(2, 9) + i).substring(0, 9)
  );

  return placeholderIds.map((id) => ({
    id,
  }));
}

interface TodoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;

  // Server-side validation (optional - can be done client-side)
  // Since we're using localStorage, we can't validate on server
  // but we still export the page for each ID

  return <TodoDetailClient id={id} />;
}
