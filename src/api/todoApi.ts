export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const STORAGE_KEY = "todo-app-data";

const getTodosFromStorage = (): Todo[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveTodosToStorage = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const todoApi = {
  fetchTodos: async (): Promise<Todo[]> => {
    await delay(1000);
    // Simulate random error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("データの取得に失敗しました");
    }
    return getTodosFromStorage();
  },

  fetchTodoById: async (id: string): Promise<Todo> => {
    await delay(500);
    const todos = getTodosFromStorage();
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`ID: ${id} のタスクが見つかりませんでした`);
    }
    return todo;
  },

  addTodo: async (title: string): Promise<Todo> => {
    await delay(500);
    const todos = getTodosFromStorage();
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTodosToStorage([newTodo, ...todos]);
    return newTodo;
  },

  toggleTodo: async (id: string): Promise<Todo> => {
    await delay(300);
    const todos = getTodosFromStorage();
    const updatedTodos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTodosToStorage(updatedTodos);
    const updated = updatedTodos.find((t) => t.id === id);
    if (!updated) throw new Error("Todo not found");
    return updated;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await delay(300);
    const todos = getTodosFromStorage();
    const filteredTodos = todos.filter((t) => t.id !== id);
    saveTodosToStorage(filteredTodos);
  },

  updateTodo: async (id: string, updates: Partial<Todo>): Promise<Todo> => {
    await delay(300);
    const todos = getTodosFromStorage();
    const updated = todos.map((t) => (t.id === id ? { ...t, ...updates } : t));
    saveTodosToStorage(updated);
    const updatedTodo = updated.find((t) => t.id === id);
    if (!updatedTodo) throw new Error("Todo not found");
    return updatedTodo;
  },
};
