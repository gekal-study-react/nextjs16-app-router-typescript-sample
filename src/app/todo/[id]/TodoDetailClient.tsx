"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useIsMounted } from "@/hooks/useIsMounted";
import { todoApi, type Todo } from "@/api/todoApi";

interface TodoDetailClientProps {
  id: string;
}

export default function TodoDetailClient({ id }: TodoDetailClientProps) {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    const fetchTodo = async () => {
      try {
        setLoading(true);
        const data = await todoApi.fetchTodoById(id);
        setTodo(data);
        setEditTitle(data.title);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "データの取得に失敗しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, isMounted]);

  const handleUpdate = async () => {
    if (!todo || !editTitle.trim()) return;

    try {
      const updatedTodo = await todoApi.updateTodo(id, {
        ...todo,
        title: editTitle,
      });
      setTodo(updatedTodo);
      setIsEditing(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "更新に失敗しました"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await todoApi.deleteTodo(id);
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "削除に失敗しました"
      );
    }
  };

  if (!isMounted) return null;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          リストに戻る
        </Button>
      </Box>
    );
  }

  if (!todo) {
    return (
      <Box p={4}>
        <Alert severity="warning">タスクが見つかりません</Alert>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          リストに戻る
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth="600px" mx="auto" p={4}>
      <Typography variant="h4" gutterBottom>
        タスク詳細
      </Typography>

      <Box sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="タスク名"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={handleUpdate}>
                保存
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(todo.title);
                }}
              >
                キャンセル
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {todo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Status: {todo.completed ? "完了" : "未完了"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              作成日時: {new Date(todo.createdAt).toLocaleString("ja-JP")}
            </Typography>
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={() => setIsEditing(true)}>
                編集
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
              >
                削除
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Button
        variant="outlined"
        onClick={() => router.push("/")}
      >
        リストに戻る
      </Button>
    </Box>
  );
}
