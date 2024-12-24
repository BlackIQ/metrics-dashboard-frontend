import { useState } from "react";
import Head from "next/head";

import { Box, Typography, Divider, Container, Grid } from "@mui/material";

import { Form } from "@/components";

import {
  single,
  updateOne as updateUser,
  changePassword as changePasswordUser,
} from "@/api/services/user";
import { useToast } from "@/hooks";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "@/redux/actions/user";

const Index = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { user } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const data = await single(user._id);

      dispatch(setUser(data.user));
    } catch (error) {
      toast(error.message);
    }
  };

  const updateData = async (data) => {
    setLoading(true);

    try {
      await updateUser(data._id, data);

      toast("Information updated");

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const changePassword = async (data) => {
    setLoading(true);

    if (data.newPassword !== data.confirmPassword) {
      toast("Passwords are not same");
    } else {
      const newData = { password: data.newPassword };

      try {
        await changePasswordUser(data._id, newData);

        toast("Password changed");

        getData();
      } catch (error) {
        toast(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Settings - OpenHubble Console</title>
      </Head>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Here you can change your information
              </Typography>
              <Form
                name="userProfileMe"
                callback={updateData}
                disables={[]}
                btnStyle={{
                  fullWidth: false,
                  disabled: loading,
                  color: "primary",
                }}
                def={user}
                button={"Change info"}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Password
              </Typography>
              <Typography variant="body1" gutterBottom>
                At this part you can change your password
              </Typography>
              <Form
                name="changePassword"
                callback={changePassword}
                disables={[]}
                btnStyle={{
                  fullWidth: false,
                  disabled: loading,
                  color: "primary",
                }}
                def={{ _id: user._id }}
                button={"Change password"}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
