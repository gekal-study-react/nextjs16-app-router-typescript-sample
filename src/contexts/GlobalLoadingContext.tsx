"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface GlobalLoadingContextType {
  isSuspenseLoading: boolean;
  setIsSuspenseLoading: (loading: boolean) => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const GlobalLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSuspenseLoading, setIsSuspenseLoading] = useState(false);

  const value = useMemo(
    () => ({ isSuspenseLoading, setIsSuspenseLoading }),
    [isSuspenseLoading, setIsSuspenseLoading],
  );

  return <GlobalLoadingContext.Provider value={value}>{children}</GlobalLoadingContext.Provider>;
};

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error("useGlobalLoading must be used within a GlobalLoadingProvider");
  }
  return context;
};
