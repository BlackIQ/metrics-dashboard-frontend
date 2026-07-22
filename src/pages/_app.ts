// - - - - - Styles - - - - -
import "@/styles/globals.css";

// - - - - - Next - - - - -
import { useRouter } from "next/router";

// - - - - - MUI - - - - -
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/theme"; // Theme

// - - - - - Redux - - - - -
import { Provider } from "react-redux";
import store from "@/redux"; // Store

// - - - - - App - - - - -
import { AppLayout, PanelLayout } from "@/layouts"; // Layout

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path =
    router.pathname.split("/").filter((item) => item !== "")[0] || "root";

  const renderLayout = (pathSegment, component) => {
    switch (pathSegment) {
      case "panel":
        return <PanelLayout>{component}</PanelLayout>;
      case "auth":
        return <Box>{component}</Box>;
      default:
        return component;
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppLayout>
          {renderLayout(path, <Component {...pageProps} />)}
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}
