"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { isAxiosError } from "axios";

import { setToken } from "@/redux/slices/token.slice";
import Form from "@/components/form/form.component";
import useAuth from "@/hooks/useAuth/useAuth.hook";
import {
  signinAuthentication,
  signupAuthentication,
  forgotPassword,
  resetPassword,
  confirmEmail,
  resendConfirmationEmail,
} from "@/api/services/auth";
import {
  googleAuthentication,
  facebookAuthentication,
  githubAuthentication,
} from "@/api/services/oauth";
import { Signin, Signup, Forgot, ResetPassword } from "@/types/auth";

import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithGitHub,
} from "@/utils/firebase.util";
import { showToast } from "@/utils/toast.util";

import {
  Box,
  Typography,
  Button,
  Grid,
  Link as MUILink,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Facebook, GitHub, Google } from "@mui/icons-material";

type modeType = "login" | "register" | "forgot" | "reset";

interface AlertState {
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  showResend?: boolean;
}

const Auth = () => {
  useAuth(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<modeType>("login");
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [resetToken, setResetToken] = useState<string | null>(null);

  const changeMode = (newMode: modeType) => {
    setAlert(null);
    setMode(newMode);
  };

  useEffect(() => {
    const confirmTok = searchParams.get("token");
    const resetTok = searchParams.get("reset_token");

    if (confirmTok) {
      handleConfirmEmail(confirmTok);
    } else if (resetTok) {
      setResetToken(resetTok);
      setMode("reset");
      setAlert({
        type: "info",
        title: "Set New Password",
        message: "Please enter and confirm your new password below.",
      });
    }
  }, [searchParams]);

  const handleConfirmEmail = async (token: string) => {
    setLoading(true);
    try {
      const res = await confirmEmail(token);
      setAlert({
        type: "success",
        title: "Account Confirmed",
        message:
          res.message || "Your email has been confirmed. You can now sign in.",
      });
      setMode("login");
    } catch (error) {
      setAlert({
        type: "error",
        title: "Confirmation Failed",
        message:
          "Invalid or expired token. Please request a new confirmation link.",
      });
    } finally {
      setLoading(false);
    }
  };

  const doLogin = async (data: Signin) => {
    setLoading(true);
    setAlert(null);
    setUserEmail(data.email);

    try {
      const token = await signinAuthentication(data);
      dispatch(setToken(token));
      showToast.success("Welcome back!");
      router.push("/panel");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const status = error.response.status;
        const detail = error.response.data?.detail || "";

        if (status === 401) {
          if (detail.toLowerCase().includes("not confirmed")) {
            setAlert({
              type: "warning",
              title: "Email Not Confirmed",
              message:
                "Your account is not confirmed yet. Please check your inbox or resend the link.",
              showResend: true,
            });
            return;
          }

          if (detail.toLowerCase().includes("inactive")) {
            setAlert({
              type: "error",
              title: "Account Inactive",
              message:
                "Your account is not active. Please contact support at support@openhubble.com.",
            });
            return;
          }

          showToast.error(detail || "Invalid email or password");
          return;
        }
      }
      showToast.error("An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const doRegister = async (data: Signup) => {
    setLoading(true);
    setAlert(null);
    setUserEmail(data.email);

    try {
      const res = await signupAuthentication(data);
      setAlert({
        type: "info",
        title: "Registration Successful",
        message:
          res.message ||
          "Please check your email inbox to confirm your account before signing in.",
        showResend: true,
      });
      setMode("login");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        showToast.error(error.response.data?.detail || "Registration failed");
      } else {
        showToast.error("Error during registration");
      }
    } finally {
      setLoading(false);
    }
  };

  const doForget = async (data: Forgot) => {
    setLoading(true);
    setAlert(null);
    try {
      await forgotPassword(data);
      setAlert({
        type: "success",
        title: "Check Your Inbox",
        message:
          "If your email is registered, instructions to reset your password have been sent.",
      });
    } catch (error) {
      showToast.error("Error sending reset password email");
    } finally {
      setLoading(false);
    }
  };

  const doResetPassword = async (data: ResetPassword) => {
    if (!resetToken) {
      showToast.error("Missing password reset token.");
      return;
    }

    if (data.new_password !== data.confirm_password) {
      showToast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await resetPassword({
        token: resetToken,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      });

      setAlert({
        type: "success",
        title: "Password Reset Complete",
        message:
          res.message || "Your password has been changed. Please sign in.",
      });
      setMode("login");
      setResetToken(null);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        showToast.error(
          error.response.data?.detail || "Failed to reset password.",
        );
      } else {
        showToast.error("An error occurred while resetting password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendLink = async () => {
    if (!userEmail) {
      showToast.error("Please enter your email in the login form first.");
      return;
    }

    setLoading(true);
    try {
      const res = await resendConfirmationEmail({ email: userEmail });
      showToast.success(res.message || "Confirmation link sent!");
    } catch (error) {
      showToast.error("Failed to resend confirmation email.");
    } finally {
      setLoading(false);
    }
  };

  const doGoogleLogin = async () => {
    setLoading(true);
    try {
      const idToken = await signInWithGoogle();
      const token = await googleAuthentication({ id_token: idToken });
      dispatch(setToken(token));
      showToast.success("Welcome back dear user");
      router.push("/panel");
    } catch (error) {
      showToast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const doFacebookLogin = async () => {
    setLoading(true);
    try {
      const idToken = await signInWithFacebook();
      const token = await facebookAuthentication({ id_token: idToken });
      dispatch(setToken(token));
      showToast.success("Welcome back dear user");
      router.push("/panel");
    } catch (error) {
      showToast.error("Facebook login failed");
    } finally {
      setLoading(false);
    }
  };

  const doGitHubLogin = async () => {
    setLoading(true);
    try {
      const idToken = await signInWithGitHub();
      const token = await githubAuthentication({ id_token: idToken });
      dispatch(setToken(token));
      showToast.success("Welcome back dear user");
      router.push("/panel");
    } catch (error) {
      showToast.error("GitHub login failed");
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
              sx={{ fontWeight: 700 }}
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
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                {mode === "login"
                  ? "Sign In"
                  : mode === "register"
                    ? "Create Account"
                    : mode === "forgot"
                      ? "Reset Password"
                      : "New Password"}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              {/* Status Banner */}
              {alert && (
                <Alert
                  severity={alert.type}
                  sx={{ mb: 3 }}
                  action={
                    alert.showResend ? (
                      <Button
                        color="inherit"
                        size="small"
                        onClick={handleResendLink}
                        disabled={loading}
                      >
                        Resend
                      </Button>
                    ) : undefined
                  }
                >
                  <AlertTitle>{alert.title}</AlertTitle>
                  {alert.message}
                </Alert>
              )}

              <Box sx={{ mb: 2 }}>
                {mode === "login" && (
                  <Form<Signin>
                    name="login"
                    callback={doLogin}
                    button="Sign In"
                    btnStyle={{ fullWidth: true, disabled: loading }}
                  />
                )}

                {mode === "register" && (
                  <Form<Signup>
                    name="register"
                    callback={doRegister}
                    button="Create Account"
                    btnStyle={{ disabled: loading, fullWidth: true }}
                  />
                )}

                {mode === "forgot" && (
                  <Form<Forgot>
                    name="forget"
                    callback={doForget}
                    button="Send Reset Link"
                    btnStyle={{ disabled: loading, fullWidth: true }}
                  />
                )}

                {mode === "reset" && (
                  <Form<ResetPassword>
                    name="reset"
                    callback={doResetPassword}
                    button="Update Password"
                    btnStyle={{ disabled: loading, fullWidth: true }}
                  />
                )}
              </Box>

              {mode === "login" && (
                <Box sx={{ textAlign: "right", mb: 2 }}>
                  <MUILink
                    component="button"
                    variant="caption"
                    onClick={() => changeMode("forgot")}
                    sx={{ color: "text.secondary" }}
                  >
                    Forgot Password?
                  </MUILink>
                </Box>
              )}

              <Divider sx={{ mb: 3, borderColor: "primary.main" }} />

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={doGoogleLogin}
                sx={{ mb: 2 }}
              >
                Continue with Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={doFacebookLogin}
                sx={{ mb: 2 }}
              >
                Continue with Facebook
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHub />}
                onClick={doGitHubLogin}
                sx={{ mb: 2 }}
              >
                Continue with GitHub
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
