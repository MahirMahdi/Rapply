import { Snackbar, Alert } from "@mui/material";
import React from "react";

const CustomAlert: React.FC<any> = ({ open, close, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={close}>
      <Alert onClose={close} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
