// import { useState } from "react";
import { CssBaseline } from "@mui/material";

import Gameboard from "./Gameboard.js";
import Header from "./Header.js";

import ColorModeContextProvider from "./ColorModeContextProvider.js";

function App() {
  return (
    <>
      <ColorModeContextProvider>
        <CssBaseline />
        <Header />
        <Gameboard />
      </ColorModeContextProvider>
    </>
  );
}

export default App;
