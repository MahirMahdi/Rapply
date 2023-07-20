import { Snackbar } from "@mui/material";
import React from "react";

const CustomSnackbar: React.FC<any> = ({ open, close, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={close}
      message={message}
      autoHideDuration={2000}
    />
  );
};

export default CustomSnackbar;
