import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from "@/theme";

console.log(theme);

const AuthLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>{children}</Box>
    </ThemeProvider>
  );
};

export default AuthLayout;
