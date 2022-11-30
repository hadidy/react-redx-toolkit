import GitHub from "@mui/icons-material/GitHub";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

export default function AppHeader() {
  return (
      <AppBar position="relative">
        <Toolbar>
          <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
            <GitHub sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Employee Portal
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
