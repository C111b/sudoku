import { useContext, useState } from "react";
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { ColorModeContext } from "./ColorModeContextProvider.js";

//icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Header() {
  //for info button
  const [info, setInfo] = useState(true);

  //context
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleInfo = () => {
    return info ? setInfo(false) : setInfo(true);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          Sudoku
        </Typography>
        <IconButton onClick={handleInfo}>
          <HelpOutlineIcon />
        </IconButton>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={info}
          onClose={handleInfo}
        >
          <DialogTitle sx={{ textAlign: "center" }}>How To Play</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                color: "text.primary",
                textAlign: "center",
              }}
            >
              Complete the Sudoku.
              <Divider sx={{ m: 2 }}></Divider>
            </DialogContentText>
            <DialogContentText
                    sx={{
                      color: "text.primary",
                      fontSize: ".75rem",
                      // ml: 5
                    }}
                  >Complete segments by filling in numbers from 1-9
                  <br /> <br />
                  Segments consist of: <br />
                  - Rows <br />
                  - Columns <br />
                  - 3x3 Blocks <br /> <br />
                  *No duplicate number should exist in a segment.
                  </DialogContentText>
          </DialogContent>
        </Dialog>
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
