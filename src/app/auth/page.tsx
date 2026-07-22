"use client";

// - - - - - Redux - - - - -
import { useDispatch } from "react-redux";

// - - - - - React - - - - -
import { useState } from "react";

// - - - - - Store - - - - -
import { setSession } from "@/redux/slices/session.slice";

// - - - - - Components - - - - -
import Form from "@/components/form/form.component";

// - - - - - Hooks - - - - -
import useAuth from "@/hooks/useAuth/useAuth.hook";

// - - - - - API Auth - - - - -

// - - - - - MUI - - - - -
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Link as MUILink,
} from "@mui/material";
import { Google } from "@mui/icons-material";

// - - - - - Next - - - - -
import Head from "next/head";

const Auth = () => {
  useAuth();

  const dispatch = useDispatch();

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
      <Box
        sx={
          {
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            // overflow: "hidden",
            // position: "relative",
          }
        }
      >
        <Grid container>
          {/* Left Panel (Hidden on Mobile) */}
          <Grid size={{ xs: 0, md: 8 }}>
            <Box
              sx={{
                background: "black",
                height: "100vh",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box>
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
            </Box>
          </Grid>

          {/* Right Panel (Form) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                px: 5,
                height: "100vh",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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

                {/* Divider */}
                <Box
                  sx={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: "primary.main",
                    mb: 2,
                  }}
                />

                <Box sx={{ mb: 2 }}>
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
                </Box>

                {mode === "login" && (
                  <Box sx={{ textAlign: "center" }}>
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Auth;
