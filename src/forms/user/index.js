import { useState } from "react";

import { Form } from "@/components";

import {
  updateOne as updateUser,
  changePassword as changePasswordUser,
} from "@/api/services/user";

import { register as registerUser } from "@/api/services/auth";
import { Box, Tab } from "@mui/material";

import { TabContext, TabPanel, TabList } from "@mui/lab";

// Hooks
import { useToast } from "@/hooks";

const UserForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
  extraData,
}) => {
  const toast = useToast();

  const updateData = async (data) => {
    setLoading(true);

    try {
      await updateUser(data._id, data);

      toast("Information updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const register = async (data) => {
    setLoading(true);

    try {
      await registerUser(data);

      toast("User created");
      handleClose();

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
        handleClose();
      } catch (error) {
        toast(error.message);
      }
    }

    setLoading(false);
  };

  const [value, setValue] = useState("common");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabItems = [
    {
      label: "Information",
      value: "common",
      panel: (
        <Box>
          <Form
            name="userProfile"
            callback={updateData}
            disables={[]}
            btnStyle={{
              fullWidth: false,
              disabled: loading,
              color: "primary",
            }}
            selectData={{
              role: extraData.roles,
            }}
            def={updateMode ? currentData || {} : {}}
            button={"Change info"}
          />
        </Box>
      ),
    },
    {
      label: "Security",
      value: "passwd",
      panel: (
        <Box>
          <Form
            name="changePassword"
            callback={changePassword}
            disables={[]}
            btnStyle={{
              fullWidth: false,
              disabled: loading,
              color: "primary",
            }}
            def={currentData ? { _id: currentData._id } : {}}
            button={"Change password"}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        {updateMode ? (
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  {tabItems.map((item) => (
                    <Tab
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </TabList>
              </Box>
              {tabItems.map((item) => (
                <TabPanel key={`panel-${item.value}`} value={item.value}>
                  {item.panel}
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        ) : (
          <Box>
            <Form
              name="register"
              callback={register}
              disables={[]}
              btnStyle={{
                fullWidth: false,
                disabled: loading,
                color: "primary",
              }}
              selectData={{
                role: extraData.roles,
              }}
              def={{}}
              button={"Create User"}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserForm;
