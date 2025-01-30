// Components
import { Form, Confirm } from "@/components";

// Hooks
import { useToast, useDisclosure } from "@/hooks";

// APSs
import {
  createOne as createHost,
  updateOne as updateHost,
  deleteOne as deleteHost,
  checkOne as checkHost,
} from "@/api/services/host";

// Redux
import { useSelector } from "react-redux";
import { Box, Button, colors, Divider, Typography } from "@mui/material";
import { useState } from "react";

const HostForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
  extraData,
}) => {
  const toast = useToast();

  const { _id } = useSelector((state) => state.user);

  const { isOpen: confirmOpen, onToggle: handleConfirm } = useDisclosure();

  const [formData, setFormData] = useState({});

  const addData = async (callback) => {
    setLoading(true);

    const { ip, dns, port, ipCommunication } = callback;

    if (port <= 0 || port > 65535) {
      toast("Port number must be between 1 and 65535.");
      setLoading(false);
      return;
    }

    if (!ip && !dns) {
      toast("Either IP or DNS must be provided.");
      setLoading(false);
      return;
    }

    if (ipCommunication && !ip) {
      toast("IP is required when communication is IP.");
      setLoading(false);
      return;
    }

    if (!ipCommunication && !dns) {
      toast("IP is required when communication is DNS.");
      setLoading(false);
      return;
    }

    try {
      callback.user = _id;

      await createHost(callback);

      toast("Host created");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const updateData = async (data) => {
    setLoading(true);

    const { ip, dns, port, ipCommunication } = data;

    if (port <= 0 || port > 65535) {
      toast("Port number must be between 1 and 65535.");
      setLoading(false);
      return;
    }

    if (!ip && !dns) {
      toast("Either IP or DNS must be provided.");
      setLoading(false);
      return;
    }

    if (ipCommunication && !ip) {
      toast("IP is required when communication is IP.");
      setLoading(false);
      return;
    }

    if (!ipCommunication && !dns) {
      toast("IP is required when communication is DNS.");
      setLoading(false);
      return;
    }

    try {
      await updateHost(data._id, data);

      toast("Host updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteHost(currentData._id);

      toast("Host deleted");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const [checkState, setCheckState] = useState(null);
  const handleCheckState = async () => {
    const { ip, dns, port, ipCommunication } = formData;

    if (port <= 0 || port > 65535) {
      toast("Port number must be between 1 and 65535.");
      setLoading(false);
      return;
    }

    if (!ip && !dns) {
      toast("Either IP or DNS must be provided.");
      setLoading(false);
      return;
    }

    if (ipCommunication && !ip) {
      toast("IP is required when communication is IP.");
      setLoading(false);
      return;
    }

    if (!ipCommunication && !dns) {
      toast("IP is required when communication is DNS.");
      setLoading(false);
      return;
    }

    const host = { ip, dns, port, ipCommunication };

    try {
      await checkHost({
        host,
      });

      toast("Host is live!");
      setCheckState(true);
    } catch (error) {
      toast(error.message);
      setCheckState(false);
    }

    setLoading(false);
  };
  const getCheckStateColors = (state) => {
    if (state === null) {
      return {
        text: "textSecondary",
        btnBG: colors.grey[600],
        btnTEXT: "white",
      };
    } else if (state === true) {
      return {
        text: "success",
        btnBG: colors.green[600],
        btnTEXT: "white",
      };
    } else if (state === false) {
      return {
        text: "error",
        btnBG: colors.red[600],
        btnTEXT: "white",
      };
    }
  };

  return (
    <>
      <Form
        name="host"
        callback={updateMode ? updateData : addData}
        selectData={{
          groups: extraData.groups,
          tags: extraData.tags,
        }}
        change={(fData) => setFormData(fData)}
        disables={[]}
        btnStyle={{
          fullWidth: false,
          disabled: loading,
          color: "primary",
        }}
        def={
          updateMode
            ? currentData
            : {
                groups: [],
                tags: [],
              }
        }
        button={updateMode ? "Update" : "Create"}
      />

      <Box sx={{ mt: 3 }}>
        <Typography
          color={getCheckStateColors(checkState).text}
          variant="h6"
          gutterBottom
        >
          Test Connection
        </Typography>
        <Divider color="" sx={{ mb: 1 }} />
        <Typography
          variant="body2"
          color={getCheckStateColors(checkState).text}
          sx={{ mb: 1 }}
          gutterBottom
        >
          If you want to check agent is available or your cerdentionial is
          right, you can check with this button bellow.
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          size="medium"
          onClick={handleCheckState}
          sx={{
            background: getCheckStateColors(checkState).btnBG,
            color: "white",
            borderRadius: 1,
          }}
          disableElevation
        >
          Check
        </Button>
      </Box>

      {updateMode && (
        <Box sx={{ mt: 3 }}>
          <Typography color="error" variant="h6" gutterBottom>
            Delete
          </Typography>
          <Divider color="error" sx={{ mb: 1 }} />
          <Typography variant="body2" color="error" sx={{ mb: 1 }} gutterBottom>
            Here you can delete the host you created. Remember that metrics are
            still available at out databases. If you planned to use this host
            again, you can <b>Inactive</b> the host.
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={handleConfirm}
            sx={{
              borderRadius: 1,
            }}
            disableElevation
          >
            Delete
          </Button>
        </Box>
      )}

      <Confirm
        onConfirm={deleteData}
        isOpen={confirmOpen}
        handleOpen={handleConfirm}
      />
    </>
  );
};

export default HostForm;
