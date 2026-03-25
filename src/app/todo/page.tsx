import { Suspense } from "react";
import TodoPageClient from "./TodoPageClient";
import { SuspenseFallback } from "../SuspenseFallback";

export default function TodoPage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <TodoPageClient />
    </Suspense>
  );
}
