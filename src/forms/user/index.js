// - - - - - Components - - - - -
import { Form } from "@/components";

// - - - - - Hook - - - - -
import { useToast } from "@/hooks";

// - - - - - API - - - - -
import { updateUser, changePassword } from "@/api/services/user";

// - - - - - MUI - - - - -
import { Box, Tab } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

// - - - - - React - - - - -
import { useState } from "react";

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
      await updateUser(currentData._id, data);

      toast("Information updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const changePasswordUser = async (data) => {
    setLoading(true);

    if (data.newPassword !== data.confirmPassword) {
      toast("Passwords are not same");
    } else {
      const newData = { password: data.newPassword };

      try {
        await changePassword(currentData._id, newData);

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
            callback={changePasswordUser}
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              {tabItems.map((item) => (
                <Tab key={item.value} label={item.label} value={item.value} />
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
    </>
  );
};

export default UserForm;
