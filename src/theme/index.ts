import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111111",
    },
    secondary: {
      main: "#6B7280",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    divider: "#E5E7EB",
    text: {
      primary: "#111111",
      secondary: "#6B7280",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 18px",
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          "& fieldset": {
            borderColor: "#E5E7EB",
          },

          "&:hover fieldset": {
            borderColor: "#C7C7C7",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#111",
            borderWidth: 2,
          },
        },
      },
    },
  },
});

export default theme;
