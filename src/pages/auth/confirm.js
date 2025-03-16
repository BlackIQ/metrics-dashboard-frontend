import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setSession } from "@/redux/actions/session";
import { setUser } from "@/redux/actions/user";
import { useToast } from "@/hooks";
import { Box, Typography, CircularProgress } from "@mui/material";

// Confirm API
import { confirm } from "@/api/services/auth";

const Confirm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const { rayid } = router.query;

  useEffect(() => {
    if (rayid) {
      const fetchUserData = async () => {
        try {
          const result = await confirm(rayid);
          const { user, token } = result;
          dispatch(setUser(user));
          dispatch(setSession(token));
          toast("Email confirmed! Welcome to OpenHubble Cloud.", {
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
  );
};

export default Confirm;
