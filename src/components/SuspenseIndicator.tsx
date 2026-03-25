import React, { useEffect } from "react";
import { useGlobalLoading } from "@/contexts/GlobalLoadingContext";

export const SuspenseIndicator: React.FC = () => {
  const { setIsSuspenseLoading } = useGlobalLoading();

  useEffect(() => {
    setIsSuspenseLoading(true);
    return () => setIsSuspenseLoading(false);
  }, [setIsSuspenseLoading]);

  return null;
};
