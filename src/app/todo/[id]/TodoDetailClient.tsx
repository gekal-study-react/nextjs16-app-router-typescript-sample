"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Typography, Button, Paper, Box, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTodo } from "@/hooks/useTodos";
import { useIsMounted } from "@/hooks/useIsMounted";

interface TodoDetailClientProps {
  id: string;
}

export const TodoDetailClient: React.FC<TodoDetailClientProps> = ({ id }) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { data: todo } = useTodo(id);

  if (!isMounted) {
    return null;
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
};
