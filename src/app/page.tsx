"use client";

import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import { useTodos, useAddTodo, useToggleTodo, useDeleteTodo } from "@/hooks/useTodos";

const TodoList: React.FC = () => {
  const router = useRouter();
  const { data: todos } = useTodos();
  const addTodo = useAddTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      addTodo.mutate(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mt: 2 }}
      >
        TODO リスト
      </Typography>

      <Paper
        component="form"
        onSubmit={handleAddTodo}
        sx={{ p: 2, mb: 4, display: "flex", gap: 1, borderRadius: 2 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="新しいタスクを入力..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          disabled={addTodo.isPending}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={addTodo.isPending || !newTodoTitle.trim()}
          sx={{ minWidth: 80 }}
        >
          追加
        </Button>
      </Paper>

      {todos.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 8 }}>
          登録されているタスクはありません。
        </Typography>
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              sx={{
                mb: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
              }}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="details"
                    onClick={() => router.push(`/todo/${todo.id}`)}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo.mutate(todo.id)}
                    disabled={deleteTodo.isPending}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemIcon sx={{ pl: 2 }}>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => toggleTodo.mutate(todo.id)}
                  disabled={false}
                />
              </ListItemIcon>
              <ListItemText
                primary={todo.title}
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "text.secondary" : "text.primary",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default function Home() {
  return <TodoList />;
}
