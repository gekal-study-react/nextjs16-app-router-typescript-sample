import React, { Suspense, useEffect, useState } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useIsMutating, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import { SuspenseIndicator } from "./SuspenseIndicator";
import { useGlobalLoading } from "@/contexts/GlobalLoadingContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<LayoutProps> = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const router = useRouter();
  const isMutating = useIsMutating();
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    const handleRouterChangeStart = (url: string, { shallow }: { shallow: boolean }) => {
      console.debug("Router change start:", url, shallow);
      if (url !== router.asPath && !shallow) {
        setIsRouteLoading(true);
      }
    };
    const handleRouterChangeComplete = (url: string, { shallow }: { shallow: boolean }) => {
      console.debug("Router change complete:", url, shallow);
      setIsRouteLoading(false);
    };
    const handleRouterChangeError = (
      error: unknown,
      url: string,
      { shallow }: { shallow: boolean },
    ) => {
      console.error("Router change error:", error, url, shallow);
      setIsRouteLoading(false);
    };

    router.events.on("routeChangeStart", handleRouterChangeStart);
    router.events.on("routeChangeComplete", handleRouterChangeComplete);
    router.events.on("routeChangeError", handleRouterChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouterChangeStart);
      router.events.off("routeChangeComplete", handleRouterChangeComplete);
      router.events.off("routeChangeError", handleRouterChangeError);
    };
  }, [router.asPath, router.events]);

  const { isSuspenseLoading } = useGlobalLoading();
  const isLoading = isMutating > 0 || isRouteLoading || isSuspenseLoading;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            TODO アプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={reset}
          resetKeys={[router.asPath]}
        >
          <Suspense fallback={<SuspenseIndicator />}>{children}</Suspense>
        </ErrorBoundary>
      </Container>
      <Loading open={isLoading} />
    </Box>
  );
};
