import React from "react";
import { CircularProgress } from "@mui/material";
import { AppBackdrop } from "./AppBackdrop";

interface LoadingProps {
  open?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ open = true }) => (
  <AppBackdrop open={open}>
    <CircularProgress color="inherit" />
  </AppBackdrop>
);
