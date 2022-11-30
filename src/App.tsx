import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddEmployee from "./app/component/AddEmployee";
import AppHeader from "./app/component/AppHeader";
import Employee from "./app/component/Employee";
import { AlertContextProvider } from "./app/context/GlobalAlertProvider";
import GlobalAlert from "./app/shared/componanet/GlobalAlert";
function App() {
  return (
    <AlertContextProvider>
      <CssBaseline />
      <AppHeader />
      <BrowserRouter>
            <Routes>
              <Route path="/addEmployee" element={<AddEmployee />}></Route>
              <Route path="/" element={<Employee />}></Route>
            </Routes>
          </BrowserRouter>
      <GlobalAlert />
    </AlertContextProvider>
  );
}

export default App;
