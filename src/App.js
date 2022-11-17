import * as React from "react";
import { HashRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Gameboard from "./Gameboard.js";
import Header from "./Header.js";
import ColorModeContextProvider from "./ColorModeContextProvider.js";

function App() {
  return (
    <>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <ColorModeContextProvider>
          <CssBaseline />
          <Header />
          <Gameboard />
        </ColorModeContextProvider>
      </HashRouter>
    </>
  );
}

export default App;
