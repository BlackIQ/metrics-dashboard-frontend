import "@/styles/globals.css";

import { AppLayout } from "@/layouts";

import { Box } from "@mui/material";

import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const history = useRouter();

  const path = history.pathname.split("/").filter((item) => item !== "");

  const render = (path, component) => {
    switch (path) {
      default:
        return (
          <Box>
            <Box width="100%">{component}</Box>
          </Box>
        );
    }
  };

  return (
    // <Provider store={store}>
    <AppLayout>{render(path[0], <Component {...pageProps} />)}</AppLayout>
    // </Provider>
  );
}
