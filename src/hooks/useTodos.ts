import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi, Todo } from "@/api/todoApi";

export const useTodos = () => {
  return useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await todoApi.fetchTodos();
    },
  });
};

export const useTodo = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["todos", id],
    queryFn: async () => {
      return await todoApi.fetchTodoById(id);
    },
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      return await todoApi.addTodo(title);
    },
    onMutate: async (newTodoTitle) => {
      // 進行中のリフェッチをキャンセル
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      // 現在のキャッシュを保存
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      // キャッシュを即座に更新（楽観的更新）
      queryClient.setQueryData<Todo[]>(["todos"], (old) => {
        const tempTodo: Todo = {
          id: "temp-" + Date.now(),
          title: newTodoTitle,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        return [tempTodo, ...(old || [])];
      });
      return { previousTodos };
    },
    onError: (err, newTodoTitle, context) => {
      // エラーが発生した場合は前の状態にロールバック
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      // 成功・失敗に関わらず、サーバーの状態と同期するためにリフェッチ
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await todoApi.toggleTodo(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
      );
      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      if (updated) {
        queryClient.setQueryData(["todos", updated.id], updated);
      }
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await todoApi.deleteTodo(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old) => old?.filter((todo) => todo.id !== id));
      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
