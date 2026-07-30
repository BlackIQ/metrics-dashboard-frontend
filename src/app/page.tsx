"use client";

import { useRouter } from "next/navigation";

import { Typography, Box, Button } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
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
            sx={{
              mb: 2,
            }}
          >
            OpenHubble Cloud
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
            }}
          >
            Exploring Data, Unveiling Insights
          </Typography>
          <Typography
            variant="body2"
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
            onClick={() => router.push("/auth")}
          >
            Enter the Console
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
