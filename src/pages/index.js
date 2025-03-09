import { Typography, Box, Button, Fade, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00b8d4; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 25px #00e5ff, 0 0 30px #00b8d4; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00b8d4; }
`;

// Pulse animation for background
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.5; }
`;

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>OpenHubble Cloud Console</title>
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center", // Vertically center the main content
          justifyContent: "center",
          "&:before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
            animation: `${pulse} 8s infinite`,
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            zIndex: 1,
            maxWidth: "800px", // Wider but still constrained
            px: { xs: 2, md: 4 }, // Responsive padding
            py: 4,
          }}
        >
          <Fade in timeout={1000}>
            <Box>
              <Typography
                color="primary.main" // #00e5ff
                variant="h1"
                fontFamily="Orbitron"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4.5rem" },
                  letterSpacing: 3,
                  animation: `${neonGlow} 2s ease-in-out infinite`,
                  mb: 2,
                }}
              >
                OpenHubble Cloud
              </Typography>
              <Typography
                color="white"
                variant="h5"
                fontWeight="300"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.5rem" },
                  textShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
                  mb: 3,
                }}
              >
                Exploring Data, Unveiling Insights
              </Typography>
              <Typography
                color="rgba(255, 255, 255, 0.8)"
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Your gateway to powerful data analytics and real-time
                discoveries.
              </Typography>
              <Button
                variant="contained"
                color="primary" // #00e5ff
                size="large"
                onClick={() => router.push("/auth")}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.7)",
                  },
                  mb: 6, // Space before cards
                }}
              >
                Enter the Console
              </Button>
            </Box>
          </Fade>

          {/* Feature Cards */}
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={1500}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "rgba(30, 30, 30, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    boxShadow: "0 0 15px rgba(0, 255, 255, 0.1)",
                    "&:hover": {
                      boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)",
                      borderColor: "rgba(0, 255, 255, 0.5)",
                    },
                  }}
                >
                  <Typography
                    color="primary.main"
                    variant="h6"
                    fontWeight="bold"
                  >
                    Data Exploration
                  </Typography>
                  <Typography color="rgba(255, 255, 255, 0.8)" variant="body2">
                    Dive into your datasets with powerful tools designed for
                    discovery.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={2000}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "rgba(30, 30, 30, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    boxShadow: "0 0 15px rgba(0, 255, 255, 0.1)",
                    "&:hover": {
                      boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)",
                      borderColor: "rgba(0, 255, 255, 0.5)",
                    },
                  }}
                >
                  <Typography
                    color="primary.main"
                    variant="h6"
                    fontWeight="bold"
                  >
                    Real-Time Insights
                  </Typography>
                  <Typography color="rgba(255, 255, 255, 0.8)" variant="body2">
                    Unlock actionable insights with live analytics and
                    visualizations.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={2500}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "rgba(30, 30, 30, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    boxShadow: "0 0 15px rgba(0, 255, 255, 0.1)",
                    "&:hover": {
                      boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)",
                      borderColor: "rgba(0, 255, 255, 0.5)",
                    },
                  }}
                >
                  <Typography
                    color="primary.main"
                    variant="h6"
                    fontWeight="bold"
                  >
                    Scalable Platform
                  </Typography>
                  <Typography color="rgba(255, 255, 255, 0.8)" variant="body2">
                    Grow effortlessly with a cloud built for any data challenge.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
