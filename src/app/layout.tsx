"use client";

// - - - - - MUI - - - - -
import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";

// - - - - - Theme - - - - -
import theme from "@/theme";

// - - - - - Redux - - - - -
import { Provider } from "react-redux";
import store from "@/redux"; // Store

// - - - - - Components - - - - -
import { Toast } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>OpenHubble Metrics</title>
      </head>
      <body>
        <div>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box>
                {children}

                <Toast />
              </Box>
            </ThemeProvider>
          </Provider>
        </div>
      </body>
    </html>
  );
}
