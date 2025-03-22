// - - - - - Components - - - - -
import { Form } from "@/components";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - API - - - - -
import { createAlert, updateAlert, testAlert } from "@/api/services/alerts";

// - - - - - MUI - - - - -
import { Box, Button, Divider, Typography } from "@mui/material";

// - - - - - React - - - - -
import { useState } from "react";

// - - - - - Config - - - - -
import { forms } from "@/config";

const AlertTelegramForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
}) => {
  const toast = useToast();

  const [formData, setFormData] = useState(
    currentData ? currentData.config : {}
  );

  const form = forms["alertTelegram"];

  const addData = async (callback) => {
    setLoading(true);

    const data = { type: "telegram", config: callback };

    try {
      await createAlert(data);

      toast("Telegram alert created");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const updateData = async (callback) => {
    setLoading(true);

    const data = { config: callback };

    try {
      await updateAlert(currentData._id, data);

      toast("Telegram alert updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const handleTestAlert = async () => {
    const payload = {};

    Object.keys(form).forEach((key) => {
      if (formData[key] !== undefined) {
        payload[key] = formData[key];
      }
    });

    setLoading(true);

    const data = { type: "telegram", config: payload };

    try {
      await testAlert(data);

      toast("Check your Telegram :)");
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Form
        name="alertTelegram"
        callback={updateMode !== "non-exists" ? updateData : addData}
        disables={[]}
        change={(fData) => setFormData(fData)}
        btnStyle={{
          fullWidth: false,
          disabled: loading,
          color: "primary",
        }}
        def={updateMode !== "non-exists" ? { ...currentData.config } : {}}
        button={updateMode !== "non-exists" ? "Update" : "Create"}
      />

      <Box
        sx={{
          mt: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Test Telegram Alert
        </Typography>

        <Divider sx={{ mb: 2, bgcolor: "grey.400" }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This will send a test message to the configured Telegram chat.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleTestAlert}
          sx={{
            mt: 1,
            borderRadius: 2,
            textTransform: "none",
          }}
          disableElevation
        >
          Send Test Telegram
        </Button>
      </Box>
    </>
  );
};

export default AlertTelegramForm;
