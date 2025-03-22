// - - - - - Redux - - - - -
import { useDispatch } from "react-redux";

// - - - - - React - - - - -
import { useState } from "react";

// - - - - - Store - - - - -
import { setSession } from "@/redux/actions/session";
import { setUser } from "@/redux/actions/user";

// - - - - - Components - - - - -
import { Form } from "@/components";

// - - - - - Hooks - - - - -
import { useAuth, useToast } from "@/hooks";

// - - - - - API - - - - -
import { loginAccount, registerAccount } from "@/api/services/auth";

// - - - - - MUI - - - - -
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Fade,
  keyframes,
} from "@mui/material";

// - - - - - Next - - - - -
import Head from "next/head";

// - - - - - Form Config - - - - -
import { forms } from "@/config";

// Neon glow animation for text
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00b8d4; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 25px #00e5ff, 0 0 30px #00b8d4; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00b8d4; }
`;

// Neon divider glow animation
const dividerGlow = keyframes`
  0% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
  50% { box-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff; }
  100% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
`;

const Auth = () => {
  useAuth();

  const dispatch = useDispatch();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  const changeMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const doLogin = async (callback) => {
    const payload = {};

    Object.keys(forms["login"]).forEach((key) => {
      if (callback[key] !== undefined) {
        payload[key] = callback[key];
      }
    });

    setLoading(true);

    try {
      const result = await loginAccount(payload);

      const { user, token } = result;

      dispatch(setUser(user));
      dispatch(setSession(token));
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const doRegister = async (callback) => {
    const payload = {};

    Object.keys(forms["register"]).forEach((key) => {
      if (callback[key] !== undefined) {
        payload[key] = callback[key];
      }
    });

    setLoading(true);

    try {
      await registerAccount(payload);

      toast("Registration successful! Please check your email to confirm.", {
        severity: "success",
      });
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Authentication - OpenHubble Console</title>
      </Head>
      
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Grid container sx={{ minHeight: "100vh" }}>
          {/* Left Panel (Hidden on Mobile) */}
          <Grid
            item
            xs={false}
            md={6}
            sx={{
              background:
                "linear-gradient(45deg, #00b8d4 0%, #00e5ff 50%, #00b8d4 100%)",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              p: 4,
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.2)",
                zIndex: 1,
              },
            }}
          >
            <Fade in timeout={1000}>
              <Box sx={{ textAlign: "center", zIndex: 2 }}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  fontFamily="Orbitron"
                  gutterBottom
                  sx={{
                    letterSpacing: 2,
                    color: "#fff",
                    animation: `${neonGlow} 2s ease-in-out infinite`,
                  }}
                >
                  Welcome to OpenHubble
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="300"
                  sx={{
                    maxWidth: "400px",
                    mx: "auto",
                    mt: 2,
                    lineHeight: 1.6,
                    color: "#e0f7fa",
                    textShadow: "0 0 5px rgba(0, 255, 255, 0.3)",
                  }}
                >
                  Exploring Data, Unveiling Insights
                </Typography>
              </Box>
            </Fade>
          </Grid>

          {/* Right Panel (Form) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              bgcolor: "background.default",
              position: "relative",
            }}
          >
            <Container maxWidth="xs">
              <Fade in timeout={500}>
                <Box
                  sx={{
                    backdropFilter: "blur(15px)",
                    bgcolor: "rgba(30, 30, 30, 0.9)",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    position: "relative",
                    overflow: "hidden",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: "-50%",
                      left: "50%",
                      width: "200%",
                      height: "200%",
                      background:
                        "radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
                      animation: "pulse 8s infinite",
                      zIndex: 0,
                      transform: "translateX(-50%)", // Center the radial gradient
                    },
                    "&:hover": {
                      boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)",
                      borderColor: "rgba(0, 255, 255, 0.5)",
                    },
                    "& > *": { position: "relative", zIndex: 1 },
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary.main" // #00e5ff
                    fontWeight="600"
                    fontSize={30}
                    gutterBottom
                    textAlign="center"
                    sx={{
                      textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                    }}
                  >
                    {mode === "login" ? "Login" : "Register"}
                  </Typography>

                  {/* Neon Divider */}
                  <Box
                    sx={{
                      height: "2px",
                      width: "60%",
                      backgroundColor: "primary.main", // #00e5ff
                      mx: "auto", // Center it
                      mb: 3, // Space below divider
                      animation: `${dividerGlow} 2s ease-in-out infinite`,
                    }}
                  />

                  <Form
                    name={mode}
                    callback={mode === "login" ? doLogin : doRegister}
                    button={mode === "login" ? "Login" : "Register"}
                    btnStyle={{
                      fullWidth: true,
                      disabled: loading,
                      size: "large",
                      sx: {
                        py: 1.5,
                        mt: 2,
                        bgcolor: "primary.main",
                        "&:hover": { bgcolor: "primary.dark" },
                        boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
                      },
                    }}
                    disables={[]}
                  />
                  <Button
                    variant="outlined"
                    onClick={changeMode}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 1,
                      borderColor: "secondary.main",
                      color: "secondary.main",
                      "&:hover": {
                        bgcolor: "rgba(0, 255, 255, 0.1)",
                        borderColor: "secondary.light",
                        boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
                      },
                    }}
                    fullWidth
                    disableElevation
                  >
                    {mode === "login"
                      ? "Need an account? Register"
                      : "Have an account? Login"}
                  </Button>
                </Box>
              </Fade>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// Pulse animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.5; }
`;

export default Auth;
