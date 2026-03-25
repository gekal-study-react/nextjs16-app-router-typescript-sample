"use client";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { AppProvider } from "@/components/AppProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { GlobalLoadingProvider } from "@/contexts/GlobalLoadingContext";

const theme = createTheme();

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <QueryProvider>
      <GlobalLoadingProvider>
        <ThemeProvider theme={theme}>
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </GlobalLoadingProvider>
    </QueryProvider>
  );
}
