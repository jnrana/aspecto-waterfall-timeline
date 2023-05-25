import React from "react";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";

function AppLayout({ children }) {
  return (
    <div className="AppContainer">
      <AppBar>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" textAlign="center" component="div">
            Aspecto Waterfall Timeline
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="AppContainer" sx={{ marginTop: 10 }}>
        {children}
      </Container>
    </div>
  );
}

export default AppLayout;
