// Components
import { Form } from "@/components";

// Hooks
import { useToast } from "@/hooks";

// APSs
import {
  createOne as createPermission,
  updateOne as updatePermission,
} from "@/api/services/permission";

const PermissionForm = ({
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

    try {
      await createPermission(callback);

      toast("Permission created");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const updateData = async (data) => {
    setLoading(true);

    try {
      await updatePermission(data._id, data);

      toast("Permission updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <Form
      name="permission"
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

export default PermissionForm;
