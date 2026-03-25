"use client";

import React from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useIsMutating, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useGlobalLoading } from "@/contexts/GlobalLoadingContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<LayoutProps> = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  let router = null;
  try {
    router = useRouter();
  } catch (e) {
    // Router may not be available in server context
  }

  const isMutating = useIsMutating();

  const { isSuspenseLoading } = useGlobalLoading();
  const isLoading = isMutating > 0 || isSuspenseLoading;

  return (
    <Box sx={{ flexGrow: 1 }} suppressHydrationWarning>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => router && router.push("/")}
          >
            TODO アプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={reset}
        >
          {children}
        </ErrorBoundary>
      </Container>
      <Loading open={isLoading} />
    </Box>
  );
};
