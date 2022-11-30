import React, { createContext, useState } from "react";

interface ContextProps {
  open: boolean;
  setOpen: Function;
  text: string;
  setText: Function;
  severity?: string;
  setSeverity?: Function;
}

export const AlertContext :React.Context<ContextProps>  = createContext<ContextProps>({
  open: false,
  setOpen: () => {},
  text: "",
  setText: () => {},
  severity: "",
  setSeverity:() => {}
});


