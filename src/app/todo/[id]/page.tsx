import TodoDetailClient from "./TodoDetailClient";

// Generate static params for static export
// This function provides all possible [id] values for pre-rendering
// With output: "export", only these IDs will work at build time.
// Dynamic IDs generated at runtime will be handled client-side (see TodoDetailClient).
export async function generateStaticParams() {
  // Generate multiple placeholder IDs for common use cases
  // This ensures those pages are pre-rendered during build
  const placeholderIds = [
    "todo-001",
    "todo-002",
    "todo-003",
    "todo-004",
    "todo-005",
    "todo-006",
    "todo-007",
    "todo-008",
    "todo-009",
    "todo-010",
  ];

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

  // Server component that passes id to client component
  // Client component handles data fetching and not-found cases
  return <TodoDetailClient id={id} />;
}
