import { useState } from "react";
import { AlertContext } from "./GlobalAlertContext";

export const AlertContextProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <AlertContext.Provider
      value={{ open, setOpen, text, setText, severity, setSeverity }}
    >
      {children}
    </AlertContext.Provider>
  );
};
