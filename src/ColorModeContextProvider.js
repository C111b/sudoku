import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";


export const ColorModeContext = React.createContext({ toggleColorMode: () => {}})

// const theme = React.useMemo(
//     () => 
//     createTheme({
//         palette: {
//             mode,
//         },
//     }),
//     [mode],
// );

export default function ColorModeContextProvider({children}) {
    const [mode, setMode] = React.useState('light');
    
    const theme = React.useMemo(
        () => 
        createTheme({
            palette: {
                mode,
                
            },

        }),
        [mode],
    );
    
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            }
        }),
        [],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}> {children} </ThemeProvider>
        </ColorModeContext.Provider>
    )
}