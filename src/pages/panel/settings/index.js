import { useState, useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Divider,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { Form, Loading } from "@/components";
import {
  single,
  updateOne as updateUser,
  changePassword as changePasswordUser,
} from "@/api/services/user";
import { useToast } from "@/hooks";
import { setUser } from "@/redux/actions/user";
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

// Divider glow animation
const dividerGlow = keyframes`
  0% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
  50% { box-shadow: 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  100% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
`;

const Index = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state);

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await single(user._id);
      dispatch(setUser(data.user));
      toast("Profile loaded", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (data) => {
    setLoading(true);
    try {
      await updateUser(data._id, data);
      toast("Information updated", { severity: "success" });
      await getData();
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data) => {
    setLoading(true);
    if (data.newPassword !== data.confirmPassword) {
      toast("Passwords do not match", { severity: "error" });
      setLoading(false);
      return;
    }
    const newData = { password: data.newPassword };
    try {
      await changePasswordUser(data._id, newData);
      toast("Password changed", { severity: "success" });
      await getData();
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(); // Fetch user data on mount
  }, []);

  return (
    <>
      <Head>
        <title>Settings - OpenHubble Console</title>
      </Head>
      <Box sx={{ py: 4 }}>
        {loading ? (
          <Loading />
        ) : (
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              fontFamily="Orbitron"
              color="primary.main"
              fontWeight="bold"
              sx={{ animation: `${neonGlow} 2s ease-in-out infinite`, mb: 4 }}
            >
              Settings
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: "rgba(30, 30, 30, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontFamily="Orbitron"
                    color="primary.main"
                    gutterBottom
                  >
                    Information
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.7)"
                    gutterBottom
                  >
                    Update your personal details
                  </Typography>
                  <Divider
                    sx={{
                      my: 2,
                      bgcolor: "primary.main",
                      height: "2px",
                      animation: `${dividerGlow} 2s ease-in-out infinite`,
                    }}
                  />
                  <Form
                    name="userProfileMe"
                    callback={updateData}
                    btnStyle={{
                      fullWidth: false,
                      disabled: loading,
                      color: "primary",
                    }}
                    def={user}
                    button="Change Info"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: "rgba(30, 30, 30, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontFamily="Orbitron"
                    color="primary.main"
                    gutterBottom
                  >
                    Password
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.7)"
                    gutterBottom
                  >
                    Change your account password
                  </Typography>
                  <Divider
                    sx={{
                      my: 2,
                      bgcolor: "primary.main",
                      height: "2px",
                      animation: `${dividerGlow} 2s ease-in-out infinite`,
                    }}
                  />
                  <Form
                    name="changePassword"
                    callback={changePassword}
                    btnStyle={{
                      fullWidth: false,
                      disabled: loading,
                      color: "primary",
                    }}
                    def={{ _id: user._id }}
                    button="Change Password"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Index;
