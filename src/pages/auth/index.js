import { useState, useEffect } from "react";

import { Form } from "@/components";

import { Box, Typography, Grid, Container, Button } from "@mui/material";
import Head from "next/head";

const Auth = () => {
  useEffect(() => {}, []);

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  const changeMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const fnc_login = async (callback) => {
    setLoading(true);

    try {
      console.log(callback);

      // const result = await login(callback);
      // const { user, token } = result;
      // dispatch(setUser(user));
      // dispatch(setSession(token));
    } catch (error) {
      createSnack(error.message, "error");
    }

    setLoading(false);
  };

  const fnc_register = async (callback) => {
    setLoading(true);

    try {
      console.log(callback);

      // const result = await login(callback);
      // const { user, token } = result;
      // dispatch(setUser(user));
      // dispatch(setSession(token));
    } catch (error) {
      createSnack(error.message, "error");
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Authentication</title>
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
              callback={mode === "login" ? fnc_login : fnc_register}
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
