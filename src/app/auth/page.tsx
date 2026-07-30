"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { setToken } from "@/redux/slices/token.slice";
import Form from "@/components/form/form.component";
import useAuth from "@/hooks/useAuth/useAuth.hook";
import {
  signinAuthentication,
  signupAuthentication,
} from "@/api/services/auth";
import { Signin, Signup } from "@/types/auth";

import { showToast } from "@/utils/toast.util";

import {
  Box,
  Typography,
  Button,
  Grid,
  Link as MUILink,
  Divider,
} from "@mui/material";
import { Google } from "@mui/icons-material";

const Auth = () => {
  useAuth(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<"login" | "register" | "forgotPassword">(
    "login",
  );

  const changeMode = (newMode: "login" | "register" | "forgotPassword") => {
    setMode(newMode);
  };

  const doLogin = async (data: Signin) => {
    setLoading(true);
    try {
      const token = await signinAuthentication(data);
      dispatch(setToken(token));
      showToast.success("Welcome back dear user");
      router.push("/panel");
    } catch (error) {
      showToast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const doRegister = async (data: Signup) => {
    setLoading(true);
    try {
      const token = await signupAuthentication(data);
      dispatch(setToken(token));
      showToast.success("Welcome new dear user");
      router.push("/panel");
    } catch (error) {
      showToast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Left Branding Panel (Desktop Only) */}
        <Grid size={{ xs: 0, md: 7, lg: 8 }}>
          <Box
            sx={{
              height: "100%",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "#070A0F",
              borderRight: "1px solid",
              borderColor: "divider",
              p: 4,
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              color="text.primary"
              sx={{
                fontWeight: 700,
              }}
            >
              OpenHubble
            </Typography>
            <Typography variant="h6" color="text.secondary">
              High-Density Infrastructure & Metrics Monitoring
            </Typography>
          </Box>
        </Grid>

        {/* Right Form Container */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                p: 4,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                {mode === "login"
                  ? "Sign In"
                  : mode === "register"
                    ? "Create Account"
                    : "Reset Password"}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ mb: 2 }}>
                {mode === "login" && (
                  <Form<Signin>
                    name="login"
                    callback={doLogin}
                    button="Sign In"
                    btnStyle={{
                      fullWidth: true,
                      disabled: loading,
                    }}
                  />
                )}

                {mode === "register" && (
                  <Form
                    name="register"
                    callback={doRegister}
                    button="Create Account"
                    btnStyle={{
                      disabled: loading,
                    }}
                  />
                )}
              </Box>

              {mode === "login" && (
                <Box sx={{ textAlign: "right", mb: 2 }}>
                  <MUILink
                    component="button"
                    variant="caption"
                    onClick={() => changeMode("forgotPassword")}
                    sx={{ color: "text.secondary" }}
                  >
                    Forgot Password?
                  </MUILink>
                </Box>
              )}

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => {}}
                sx={{ mb: 2 }}
              >
                Continue with Google
              </Button>

              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={() =>
                  changeMode(mode === "login" ? "register" : "login")
                }
              >
                {mode === "login"
                  ? "Don't have an account? Register"
                  : "Already registered? Sign In"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
