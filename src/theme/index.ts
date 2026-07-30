import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0B0F17",
      paper: "#111827",
    },
    primary: {
      main: "#3B82F6",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#64748B",
    },
    success: {
      main: "#10B981",
    },
    error: {
      main: "#EF4444",
    },
    text: {
      primary: "#F3F4F6",
      secondary: "#9CA3AF",
    },
    divider: "#1E293B",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontSize: 13,
    h1: { fontSize: "1.75rem", fontWeight: 600 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    h3: { fontSize: "1.25rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderColor: "#1E293B",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #1E293B",
          padding: "8px 12px",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "#0F172A",
          color: "#9CA3AF",
        },
      },
    },
  },
});
