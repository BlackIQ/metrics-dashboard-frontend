// - - - - - React - - - - -
import { useState, useEffect } from "react";

// - - - - - Next - - - - -
import Head from "next/head";
import { useRouter } from "next/router";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - Components - - - - -
import { Form } from "@/components";

// - - - - - MUI - - - - -
import {
  Box,
  Typography,
  Button,
  Container,
  Fade,
  CircularProgress,
  keyframes,
} from "@mui/material";

// - - - - - API - - - - -
import { resetPassword } from "@/api/services/auth";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00b8d4; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 25px #00e5ff, 0 0 30px #00b8d4; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00b8d4; }
`;

// Divider glow animation
const dividerGlow = keyframes`
  0% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
  50% { box-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff; }
  100% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
`;

const ResetPassword = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const { rayid } = router.query;

  useEffect(() => {
    if (rayid) {
      setIsValidating(false);
    } else {
      setIsValidating(false);
    }
  }, [rayid]);

  const changePasswordUser = async (data) => {
    setLoading(true);

    if (data.newPassword !== data.confirmPassword) {
      toast("Passwords do not match", { severity: "error" });
      setLoading(false);
      return;
    }

    const newData = { rayid, newPassword: data.newPassword };

    try {
      await resetPassword(rayid, newData.newPassword);
      toast("Password reset successfully! Please log in.", {
        severity: "success",
      });
      router.push("/auth");
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (isValidating) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", color: "#fff" }}>
          <CircularProgress sx={{ color: "#00e5ff", mb: 2 }} />
          <Typography variant="h6">Validating...</Typography>
        </Box>
      </Box>
    );
  }

  if (!rayid) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", color: "#fff" }}>
          <Typography variant="h6" color="error">
            Invalid or missing reset link
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.push("/auth/forgot-password")}
            sx={{ mt: 2, color: "#00e5ff", borderColor: "#00e5ff" }}
          >
            Request a new link
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Reset Password - OpenHubble Console</title>
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
                "&:hover": {
                  boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)",
                  borderColor: "rgba(0, 255, 255, 0.5)",
                },
              }}
            >
              <Typography
                variant="h5"
                color="primary.main"
                fontWeight="600"
                fontSize={30}
                gutterBottom
                textAlign="center"
                sx={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
              >
                Reset Password
              </Typography>

              <Box
                sx={{
                  height: "2px",
                  width: "60%",
                  backgroundColor: "primary.main",
                  mx: "auto",
                  mb: 3,
                  animation: `${dividerGlow} 2s ease-in-out infinite`,
                }}
              />

              <Form
                name="changePassword"
                callback={changePasswordUser}
                button="Reset Password"
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
                onClick={() => router.push("/auth")}
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
                Back to Login
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default ResetPassword;
