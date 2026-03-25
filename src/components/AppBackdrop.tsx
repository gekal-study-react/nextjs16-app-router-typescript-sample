import React from "react";
import { Backdrop, BackdropProps } from "@mui/material";

interface AppBackdropProps extends Omit<BackdropProps, "children"> {
  children?: React.ReactNode;
}

export const AppBackdrop: React.FC<AppBackdropProps> = ({ children, sx, ...props }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: "column",
        gap: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Backdrop>
  );
};
