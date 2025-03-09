import "@/styles/globals.css";
import { AppLayout, PanelLayout } from "@/layouts";
import { Box, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "@/redux";
import { useRouter } from "next/router";
import theme from "@/theme"; // Assuming your theme.js is here

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path =
    router.pathname.split("/").filter((item) => item !== "")[0] || "root"; // Default to "root" for "/"

  const renderLayout = (pathSegment, component) => {
    switch (pathSegment) {
      case "panel":
        return <PanelLayout>{component}</PanelLayout>;
      case "auth":
        return <Box>{component}</Box>;
      default:
        return component; // Simpler default case
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
