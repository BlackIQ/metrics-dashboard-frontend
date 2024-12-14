import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222",
    },
    primary: {
      main: colors.cyan[500],
    },
    secondary: {
      main: colors.cyan[700],
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;
