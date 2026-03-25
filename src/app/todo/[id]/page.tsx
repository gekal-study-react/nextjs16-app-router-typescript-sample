import React from "react";
import { TodoDetailClient } from "./TodoDetailClient";

interface TodoDetailPageProps {
  params: {
    id: string;
  };
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  return <TodoDetailClient id={params.id} />;
}
