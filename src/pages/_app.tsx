import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProvider } from "@/components/AppProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { GlobalLoadingProvider } from "@/contexts/GlobalLoadingContext";

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryProvider>
      <GlobalLoadingProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </ThemeProvider>
      </GlobalLoadingProvider>
    </QueryProvider>
  );
}
