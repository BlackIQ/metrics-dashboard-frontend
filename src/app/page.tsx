"use client";

// - - - - - Next - - - - -
import Head from "next/head";
// import { useRouter } from "next/router";

// - - - - - MUI - - - - -
import { Typography, Box, Button } from "@mui/material";

export default function Home() {
  // const router = useRouter();

  return (
    <>
      <Head>
        <title>OpenHubble Cloud Console</title>
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            zIndex: 1,
            maxWidth: "800px",
            px: { xs: 2, md: 4 },
            py: 4,
          }}
        >
          <Box>
            <Typography
              variant="h2"
              color="white"
              sx={{
                mb: 2,
              }}
            >
              OpenHubble Cloud
            </Typography>
            <Typography
              variant="h6"
              color="white"
              sx={{
                mb: 3,
              }}
            >
              Exploring Data, Unveiling Insights
            </Typography>
            <Typography
              variant="body2"
              color="white"
              sx={{
                mb: 4,
              }}
            >
              Your gateway to powerful data analytics and real-time discoveries.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {}}
            >
              Enter the Console
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
