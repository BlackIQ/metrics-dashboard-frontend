"use client";

import { useDispatch } from "react-redux";

import { useState } from "react";

import { setToken } from "@/redux/slices/token.slice";

import Form from "@/components/form/form.component";

import useAuth from "@/hooks/useAuth/useAuth.hook";

import {
  signinAuthentication,
  signupAuthentication,
} from "@/api/services/auth";

import { Signin, Signup } from "@/types/auth";

import { Box, Typography, Button, Grid, Link as MUILink } from "@mui/material";
import { Google } from "@mui/icons-material";

const Auth = () => {
  useAuth();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("login");

  const changeMode = (newMode: string) => {
    setMode(newMode);
  };

  const doLogin = async (callback: Signin) => {
    try {
      const token = await signinAuthentication(callback);

      dispatch(setToken(token));
    } catch (error) {
      console.log(error);
    }
  };

  const doRegister = async (callback: Signup) => {
    try {
      const token = await signupAuthentication(callback);

      dispatch(setToken(token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
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
                {mode === "login" ? "Login" : "Register"}
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
                {mode == "login" ? (
                  <Form<Signin>
                    name={mode}
                    callback={doLogin}
                    button="Login"
                    btnStyle={{
                      fullWidth: true,
                      disabled: loading,
                    }}
                  />
                ) : (
                  <Form<Signup>
                    name={mode}
                    callback={doRegister}
                    button="Register"
                    btnStyle={{
                      fullWidth: true,
                      disabled: loading,
                    }}
                  />
                )}
              </Box>

              {mode === "login" && (
                <Box sx={{ textAlign: "center" }}>
                  <MUILink
                    component="button"
                    onClick={() => changeMode("forgotPassword")}
                    sx={{
                      textDecoration: "none",
                      mb: 2,
                      "&:hover": {
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
                onClick={() => {}}
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
  );
};

export default Auth;
