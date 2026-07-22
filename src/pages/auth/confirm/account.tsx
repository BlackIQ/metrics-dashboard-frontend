// - - - - - React - - - - -
import { useEffect } from "react";

// - - - - - Redux - - - - -
import { useDispatch } from "react-redux";

// - - - - - Next - - - - -
import { useRouter } from "next/router";
import Head from "next/head";

// - - - - - Store - - - - -
import { setSession } from "@/redux/actions/session";
import { setUser } from "@/redux/actions/user";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - MUI - - - - -
import { Box, Typography, CircularProgress } from "@mui/material";

// - - - - - API - - - - -
import { confirmEmail } from "@/api/services/auth";

const Confirm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const { rayid } = router.query;

  useEffect(() => {
    if (rayid) {
      const fetchUserData = async () => {
        try {
          const result = await confirmEmail(rayid);

          const { user, token } = result;

          dispatch(setUser(user));
          dispatch(setSession(token));

          toast("Acount confirmed! Welcome to OpenHubble Cloud.", {
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
        <title>Confirm Account - OpenHubble Console</title>
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
          <Typography variant="h6">Confirming your account...</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Confirm;
