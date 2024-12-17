// Components
import { Form, Confirm } from "@/components";

// Hooks
import { useToast, useDisclosure } from "@/hooks";

// APSs
import {
  createOne as createHost,
  updateOne as updateHost,
  deleteOne as deleteHost,
} from "@/api/services/host";

// Redux
import { useSelector } from "react-redux";
import { Box, Button, Divider, Typography } from "@mui/material";

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

  console.log(extraData);

  return (
    <>
      <Form
        name="host"
        callback={updateMode ? updateData : addData}
        selectData={{
          groups: extraData.groups,
          tags: extraData.tags,
        }}
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
