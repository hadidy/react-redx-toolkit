import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext } from "react";
import { AlertContext } from "../../context/GlobalAlertContext";

export default function GlobalAlert() {
  const { open, setOpen, text ,  severity  } = useContext(AlertContext);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => {
        setOpen(false);
      }}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert
        onClose={() => {
          setOpen(false);
        }}
        severity={ (severity as AlertColor) ? (severity as AlertColor)  : "error" }
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
