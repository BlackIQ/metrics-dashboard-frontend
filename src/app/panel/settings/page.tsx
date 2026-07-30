"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import { Person, Lock, Email, DeleteForever } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import Form from "@/components/form/form.component";
import { showToast } from "@/utils/toast.util";
import {
  updateProfile,
  updatePassword,
  updateEmail,
} from "@/api/services/user";
import { setUser } from "@/redux/slices/user.slice";
import { RootState } from "@/redux/store";
import {
  UpdateProfilePayload,
  UpdatePasswordPayload,
  UpdateEmailPayload,
} from "@/types/user";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleUpdateProfile = async (data: UpdateProfilePayload) => {
    setLoading(true);
    try {
      const updatedUser = await updateProfile(data);
      dispatch(setUser(updatedUser));
      showToast.success("Profile updated successfully!");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (data: UpdatePasswordPayload) => {
    if (data.new_password !== data.confirm_password) {
      showToast.error("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updatePassword(data);
      dispatch(setUser(updatedUser));
      showToast.success("Password changed successfully!");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async (data: UpdateEmailPayload) => {
    setLoading(true);
    try {
      const updatedUser = await updateEmail(data);
      dispatch(setUser(updatedUser));
      showToast.success("Email address updated!");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        color="text.primary"
        sx={{
          fontWeight: 700,
        }}
      >
        Account Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Manage your profile details, security credentials, and preferences.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<Person fontSize="small" />}
            iconPosition="start"
            label="Profile"
          />
          <Tab
            icon={<Lock fontSize="small" />}
            iconPosition="start"
            label="Password"
          />
          <Tab
            icon={<Email fontSize="small" />}
            iconPosition="start"
            label="Email"
          />
          <Tab
            icon={<DeleteForever fontSize="small" />}
            iconPosition="start"
            label="Danger Zone"
          />
        </Tabs>
        <Divider sx={{ mt: 0 }} />

        {/* Profile Tab */}
        <CustomTabPanel value={activeTab} index={0}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Personal Details
          </Typography>
          <Form
            name="user_profile"
            callback={handleUpdateProfile}
            def={{
              first_name: currentUser?.first_name || "",
              last_name: currentUser?.last_name || "",
            }}
            button="Save Profile"
            btnStyle={{ disabled: loading }}
          />
        </CustomTabPanel>

        {/* Password Tab */}
        <CustomTabPanel value={activeTab} index={1}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Change Password
          </Typography>
          <Form
            name="user_password"
            callback={handleUpdatePassword}
            button="Update Password"
            btnStyle={{ disabled: loading }}
          />
        </CustomTabPanel>

        {/* Email Tab */}
        <CustomTabPanel value={activeTab} index={2}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Update Email Address
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Current email: <strong>{currentUser?.email || "—"}</strong>
          </Typography>
          <Form
            name="user_email"
            callback={handleUpdateEmail}
            def={{ email: currentUser?.email || "" }}
            button="Update Email"
            btnStyle={{ disabled: loading }}
          />
        </CustomTabPanel>

        {/* Danger Zone Tab */}
        <CustomTabPanel value={activeTab} index={3}>
          <Typography
            variant="h6"
            color="error.main"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Delete Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Once you delete your account, there is no going back. Please be
            certain.
          </Typography>

          <Tooltip
            title="Account deletion is currently unavailable"
            arrow
            placement="top-start"
          >
            <span>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForever />}
                disabled
                sx={{ textTransform: "none" }}
              >
                Delete Account
              </Button>
            </span>
          </Tooltip>
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}
