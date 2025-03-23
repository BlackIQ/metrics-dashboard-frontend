// - - - - - React - - - - -
import { useEffect } from "react";

// - - - - - Redux - - - - -
import { useDispatch } from "react-redux";

// - - - - - Next - - - - -
import { useRouter } from "next/router";
import Head from "next/head";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - MUI - - - - -
import { Box, Typography, CircularProgress } from "@mui/material";

// - - - - - API - - - - -
import { confirmChangeEmail } from "@/api/services/auth";

const Confirm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const { rayid } = router.query;

  useEffect(() => {
    if (rayid) {
      const fetchUserData = async () => {
        try {
          await confirmChangeEmail(rayid);

          toast("New email confirmed!", {
            severity: "success",
          });

          router.push("/panel");
        } catch (error) {
          toast(error.message, { severity: "error" });
          router.push("/auth");
        }
      };

      fetchUserData();
    }
  }, [rayid, dispatch, router, toast]);

  return (
    <>
      <Head>
        <title>Confirm Email - OpenHubble Console</title>
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
        <Box sx={{ textAlign: "center", color: "#fff" }}>
          <CircularProgress sx={{ color: "#00e5ff", mb: 2 }} />
          <Typography variant="h6">Confirming your email...</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Confirm;
