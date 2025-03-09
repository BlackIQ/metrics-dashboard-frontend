import { Typography, Box, Button, Fade } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { keyframes } from "@mui/system";

const NotFound = () => {
  const router = useRouter();

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

  return (
    <>
      <Head>
        <title>404 - OpenHubble Console</title>
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)", // Matches login page
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
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
        <Fade in timeout={1000}>
          <Box sx={{ zIndex: 1 }}>
            <Typography
              fontWeight="bold"
              color="primary.main" // #00e5ff
              fontFamily="Orbitron"
              fontSize={{ xs: 80, md: 120 }} // Responsive size
              gutterBottom
              sx={{
                letterSpacing: 4,
                animation: `${neonGlow} 2s ease-in-out infinite`,
              }}
            >
              404
            </Typography>
            <Typography
              fontWeight="300"
              color="white"
              fontFamily="Orbitron"
              fontSize={{ xs: 40, md: 60 }}
              gutterBottom
              sx={{
                textShadow: "0 0 10px rgba(0, 255, 255, 0.3)", // Subtle glow
                letterSpacing: 2,
              }}
            >
              Page Not Found
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255, 255, 255, 0.7)"
              sx={{ mb: 4, maxWidth: "400px", mx: "auto" }}
            >
              Looks like you’ve drifted into uncharted space. Let’s get you back
              to the hub!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/")}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.7)",
                },
              }}
            >
              Return to Home
            </Button>
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default NotFound;
