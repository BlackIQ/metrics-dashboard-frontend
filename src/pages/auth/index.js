import { useDispatch } from "react-redux";
import { useState } from "react";

import { setSession } from "@/redux/actions/session";
import { setUser } from "@/redux/actions/user";

import { Form } from "@/components";
import { useAuth } from "@/hooks";
import { login, register } from "@/api/services/auth";

import { Box, Typography, Button, Container } from "@mui/material";
import Head from "next/head";

import { useToast } from "@/hooks";

const Auth = () => {
  useAuth();

  const dispatch = useDispatch();
  const toast = useToast();

  // Loading
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  const changeMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const doLogin = async (callback) => {
    setLoading(true);

    try {
      const result = await login(callback);

      const { user, token } = result;

      dispatch(setUser(user));
      dispatch(setSession(token));
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const doRegister = async (callback) => {
    setLoading(true);

    try {
      const result = await register(callback);

      const { user, token } = result;

      dispatch(setUser(user));
      dispatch(setSession(token));
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Authentication - OpenHubble Console</title>
      </Head>
      <Container maxWidth="xs">
        <Box
          sx={{
            textAlign: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(15px)",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h5"
              color="primary.main"
              fontWeight="500"
              fontSize={30}
              gutterBottom
            >
              {mode === "login" ? "Login" : "Register"}
            </Typography>
            <Form
              name={mode}
              callback={mode === "login" ? doLogin : doRegister}
              button={mode === "login" ? "Login" : "Register"}
              btnStyle={{
                fullWidth: true,
                disabled: loading,
              }}
              disables={[]}
            />
            <Button
              variant="outlined"
              onClick={changeMode}
              sx={{
                mt: 2,
                p: 1.5,
                borderRadius: 1,
              }}
              fullWidth
              disableElevation
            >
              {mode === "login" ? "Register" : "Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Auth;
