import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from "@/theme";
import { Toast } from "@/components";

const AuthLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        {children}

        <Toast />
      </Box>
    </ThemeProvider>
  );
};

export default AuthLayout;
