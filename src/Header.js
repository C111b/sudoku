import { AppBar, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import { ColorModeContext } from "./ColorModeContextProvider.js";

//icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useContext } from "react";

export default function Header() {
//context
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          Sudoku
        </Typography>
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton
          sx={{ justifyContent: "flex-end", mr: 1 }}
          color="secondary"
        //   edge="end"
            onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
          <Brightness4Icon />
          )} 
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
