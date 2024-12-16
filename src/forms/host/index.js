// Components
import { Form } from "@/components";

// Hooks
import { useToast } from "@/hooks";

// APSs
import {
  createOne as createHost,
  updateOne as updateHost,
} from "@/api/services/host";

const HostForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
}) => {
  const toast = useToast();

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

  return (
    <Form
      name="host"
      callback={updateMode ? updateData : addData}
      disables={[]}
      btnStyle={{
        fullWidth: false,
        disabled: loading,
        color: "primary",
      }}
      def={updateMode ? currentData : {}}
      button={updateMode ? "Update" : "Create"}
    />
  );
};

export default HostForm;
