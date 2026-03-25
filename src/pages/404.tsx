import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Stack, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";

export default function Custom404() {
  const router = useRouter();
  const [isRecovering, setIsRecovering] = useState(true);

  useEffect(() => {
    // ページ読み込み時に、router.asPathを使用して再試行（リプレース）を試みる
    // GitHub Pagesなどの静的ホスティングで、リロード時に404になる問題を解消するため
    const tryRecover = async () => {
      // わずかな遅延を置いてから実行（ハイドレーション待ち）
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (router.asPath && router.asPath !== "/404/" && router.asPath !== "/404") {
        try {
          console.debug("Attempting to recover route:", router.asPath);
          await router.replace(router.asPath);
        } catch (e) {
          console.error("Recovery failed:", e);
          setIsRecovering(false);
        }
      } else {
        setIsRecovering(false);
      }
    };

    if (router.isReady) {
      tryRecover();
    }
  }, [router.isReady, router.asPath, router]);

  if (isRecovering) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="65vh"
      >
        <Typography variant="body1" sx={{ mt: 3, color: "text.secondary" }}>
          読み込み中...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="65vh"
    >
      <Paper elevation={3} sx={{ p: 6, textAlign: "center", maxWidth: 500, borderRadius: 3 }}>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 1, fontSize: "6rem" }}
        >
          404
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
          ページが見つかりません
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.8 }}>
          お探しのページは存在しないか、移動した可能性があります。
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => router.push("/")}
            sx={{ px: 4, py: 1.5, borderRadius: 10, boxShadow: 3 }}
          >
            ホームへ戻る
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
