import React from "react";
import { CircularProgress } from "@mui/material";
import { AppBackdrop } from "./AppBackdrop";
import { router } from "next/client";

interface LoadingProps {
  open?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ open = true }) => (
  <AppBackdrop open={open} key={router.asPath}>
    <CircularProgress color="inherit" />
  </AppBackdrop>
);
