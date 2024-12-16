import "@/styles/globals.css";

import { AppLayout, PanelLayout } from "@/layouts";

import { Box } from "@mui/material";

import { Provider } from "react-redux";
import store from "@/redux";

import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const history = useRouter();

  const path = history.pathname.split("/").filter((item) => item !== "");

  const render = (path, component) => {
    switch (path) {
      case "panel":
        return (
          <Box width="100%">
            <PanelLayout>{component}</PanelLayout>
          </Box>
        );
      case "auth":
        return (
          <Box className="login">
            <Box>{component}</Box>
          </Box>
        );
      default:
        return (
          <Box>
            <Box width="100%">{component}</Box>
          </Box>
        );
    }
  };

  return (
    <Provider store={store}>
      <AppLayout>{render(path[0], <Component {...pageProps} />)}</AppLayout>
    </Provider>
  );
}
