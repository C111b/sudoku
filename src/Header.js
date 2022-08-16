import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

//icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Header() {
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
          //   onClick={colorMode.toggleColorMode}
        >
          {/* {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : ( */}
          <Brightness4Icon />
          {/* )} */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
