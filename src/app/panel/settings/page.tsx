"use client";

// - - - - - React - - - - -
import { useState, useEffect } from "react";

// - - - - - Next - - - - -
import Head from "next/head";

// - - - - - MUI - - - - -
import {
  Box,
  Typography,
  Divider,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

// - - - - - Components - - - - -
import { Form, Loading } from "@/components";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - API - - - - -
import { singleUser, updateUser, changePassword } from "@/api/services/user";
import { changeEmail } from "@/api/services/auth";

// - - - - - Store - - - - -
import { setUser } from "@/redux/actions/user";

// - - - - - Redux - - - - -
import { useSelector, useDispatch } from "react-redux";

// Neon glow animation
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

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getData = async () => {
    try {
      const data = await singleUser(user._id);

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
      await updateUser(user._id, data);

      toast("Information updated", { severity: "success" });

      await getData();
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const changePasswordUser = async (data) => {
    setLoading(true);

    if (data.newPassword !== data.confirmPassword) {
      toast("Passwords do not match", { severity: "error" });

      setLoading(false);

      return;
    }

    const newData = { password: data.newPassword };

    try {
      await changePassword(user._id, newData);

      toast("Password changed", { severity: "success" });

      await getData();
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const changeEmailUser = async (data) => {
    setLoading(true);

    try {
      await changeEmail(data.newEmail);

      toast("Confirm email sent to new email inbox", { severity: "success" });

      await getData();
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ mb: 4 }}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Information" />
              <Tab label="Account" />
              <Tab label="Security" />
            </Tabs>

            {/* Tab Panels */}
            {tabValue === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: "rgba(30, 30, 30, 0.9)",
                  border: "1px solid rgba(0, 255, 255, 0.3)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                  "&:hover": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)" },
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
            )}

            {tabValue === 1 && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: "rgba(30, 30, 30, 0.9)",
                  border: "1px solid rgba(0, 255, 255, 0.3)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                  "&:hover": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)" },
                }}
              >
                <Typography
                  variant="h6"
                  fontFamily="Orbitron"
                  color="primary.main"
                  gutterBottom
                >
                  Email
                </Typography>
                <Typography
                  variant="body2"
                  color="rgba(255, 255, 255, 0.7)"
                  gutterBottom
                >
                  Change your account email address
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
                  name="changeEmail"
                  callback={changeEmailUser}
                  btnStyle={{
                    fullWidth: false,
                    disabled: loading,
                    color: "primary",
                  }}
                  def={{ _id: user._id, newEmail: user.email }}
                  button="Change Email"
                />
              </Paper>
            )}

            {tabValue === 2 && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: "rgba(30, 30, 30, 0.9)",
                  border: "1px solid rgba(0, 255, 255, 0.3)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                  "&:hover": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)" },
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
                  callback={changePasswordUser}
                  btnStyle={{
                    fullWidth: false,
                    disabled: loading,
                    color: "primary",
                  }}
                  def={{ _id: user._id }}
                  button="Change Password"
                />
              </Paper>
            )}
          </Container>
        )}
      </Box>
    </>
  );
};

export default Index;
