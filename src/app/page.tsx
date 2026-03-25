import { Suspense } from "react";
import { TodoListClient } from "./TodoListClient";
import { SuspenseFallback } from "./SuspenseFallback";

export default function Home() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <TodoListClient />
    </Suspense>
  );
}
