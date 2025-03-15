// Components
import { Form } from "@/components";

// Hooks
import { useToast } from "@/hooks";

// APSs
import {
  createOne as createAlert,
  updateOne as updateAlert,
} from "@/api/services/alerts";

const AlertTelegramForm = ({
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

  return (
    <Form
      name="alertTelegram"
      callback={updateMode !== "non-exists" ? updateData : addData}
      disables={[]}
      btnStyle={{
        fullWidth: false,
        disabled: loading,
        color: "primary",
      }}
      def={updateMode !== "non-exists" ? { ...currentData.config } : {}}
      button={updateMode !== "non-exists" ? "Update" : "Create"}
    />
  );
};

export default AlertTelegramForm;
