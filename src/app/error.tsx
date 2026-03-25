"use client";

import { useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry等のログ収集サービスに送る場合はここで行います
    console.error("アプリケーションエラー:", error);
  }, [error]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "3rem", mb: 2 }}>
          ⚠️
        </Typography>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          問題が発生しました
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          データの読み込み中、または処理中にエラーが発生しました。
          <br />
          通信環境をご確認の上、再試行してください。
        </Typography>
        <Button
          variant="contained"
          size="large"
          // App Routerのreset()は、エラーになった箇所の再レンダリングを自動で試みてくれます
          onClick={() => reset()}
          sx={{ mt: 3 }}
        >
          再試行する
        </Button>
      </Box>
    </Container>
  );
}
