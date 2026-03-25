import { Suspense } from "react";
import TodoPageClient from "./TodoPageClient";

export default function TodoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoPageClient />
    </Suspense>
  );
}
