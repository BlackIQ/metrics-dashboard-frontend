import { Box, Typography } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from "@/theme";
import { useAuth } from "@/hooks";

const PanelLayout = ({ children }) => {
  useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Typography variant="h1" color="primary" gutterBottom>
          Welcome.
        </Typography>

        {children}
      </Box>
    </ThemeProvider>
  );
};

export default PanelLayout;
