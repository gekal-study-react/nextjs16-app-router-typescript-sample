"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useIsMounted } from "@/hooks/useIsMounted";
import { todoApi, type Todo } from "@/api/todoApi";

export default function TodoPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMounted = useIsMounted();
  const todoId = searchParams.get("id");
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isMounted || !todoId) {
      setLoading(false);
      return;
    }

    const fetchTodo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await todoApi.fetchTodoById(todoId);
        setTodo(data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "データの取得に失敗しました";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [todoId, isMounted]);

  if (!isMounted) return null;

  // No ID specified
  if (!todoId) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
          onClick={() => router.push("/")}
        >
          一覧に戻る
        </Button>
        <Typography>タスクが選択されていません。</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
          onClick={() => router.push("/")}
        >
          一覧に戻る
        </Button>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!todo) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
          onClick={() => router.push("/")}
        >
          一覧に戻る
        </Button>
        <Typography>タスクが見つかりません。</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2 }} onClick={() => router.push("/")}>
        一覧に戻る
      </Button>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          タスク詳細
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: "bold" }}>
            タイトル
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {todo.title}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: "bold" }}>
            状態
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {todo.completed ? "完了" : "未完了"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: "bold" }}>
            作成日時
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {new Date(todo.createdAt).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
