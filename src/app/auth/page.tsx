"use client";

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
import useAuth from "@/hooks/useAuth/useAuth.hook";
import useToast from "@/hooks/useToast/useToast.hook";

// - - - - - API Auth - - - - -

// - - - - - MUI - - - - -
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Link as MUILink,
  IconButton,
} from "@mui/material";
import { Google } from "@mui/icons-material";

// - - - - - Next - - - - -
import Head from "next/head";

const Auth = () => {
  useAuth();

  const dispatch = useDispatch();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  const changeMode = (newMode) => {
    setMode(newMode);
  };

  const doLogin = async (callback) => {
    alert("Login");
  };

  const doRegister = async (callback) => {
    alert("Register");
  };

  const doForgotPassword = async (data) => {
    alert("Forgot Password");
  };

  const doGoogleLogin = async () => {
    alert("Google");
  };

  return (
    <>
      <Head>
        <title>Authentication - OpenHubble Metrics</title>
      </Head>

      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Grid container>
          {/* Left Panel (Hidden on Mobile) */}
          <Grid
            size={{ xs: 0, md: 6 }}
            sx={{
              background: "black",
              height: "100vh",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ textAlign: "center", zIndex: 2 }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: "white",
                }}
              >
                Welcome to OpenHubble
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                }}
              >
                Exploring Data, Unveiling Insights
              </Typography>
            </Box>
          </Grid>

          {/* Right Panel (Form) */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              position: "relative",
            }}
          >
            <Container maxWidth="xs">
              <Box
                sx={{
                  p: 4,
                  borderRadius: 1,
                  border: "1px solid black",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {mode === "login"
                    ? "Login"
                    : mode === "register"
                      ? "Register"
                      : "Forgot Password"}
                </Typography>

                {/* Neon Divider */}
                <Box
                  sx={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: "primary.main",
                  }}
                />

                <Form
                  name={mode}
                  callback={
                    mode === "login"
                      ? doLogin
                      : mode === "register"
                        ? doRegister
                        : doForgotPassword
                  }
                  button={
                    mode === "login"
                      ? "Login"
                      : mode === "register"
                        ? "Register"
                        : "Send Reset Link"
                  }
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
                />

                {mode === "login" && (
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <MUILink
                      component="button"
                      onClick={() => changeMode("forgotPassword")}
                      sx={{
                        // color: "secondary.main",
                        textDecoration: "none",
                        mb: 2,
                        "&:hover": {
                          // color: "secondary.light",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Forgot Password?
                    </MUILink>
                  </Box>
                )}

                {/* OAuth Buttons Section */}
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={doGoogleLogin}
                  sx={{
                    mb: 2,
                  }}
                >
                  Continue with Google
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    changeMode(mode === "login" ? "register" : "login")
                  }
                  sx={{
                    mb: 2,
                  }}
                  fullWidth
                  disableElevation
                >
                  {mode === "login"
                    ? "Need an account? Register"
                    : mode === "register"
                      ? "Have an account? Login"
                      : "Back to Login"}
                </Button>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Auth;
