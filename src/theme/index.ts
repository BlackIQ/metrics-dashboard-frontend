import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222",
    },
    primary: {
      main: "#00e5ff", // Neon cyan
    },
    secondary: {
      main: colors.cyan[700], // Contrasting cyan
    },
  },
  typography: {
    fontFamily: "Inter, Orbitron, sans-serif", // Inter as default, Orbitron
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
  },
});

export default theme;
