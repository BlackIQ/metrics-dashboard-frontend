// Components
import { Form } from "@/components";

// Hooks
import { useToast } from "@/hooks";

// APIs
import {
  updateOne as updateRole,
  createOne as createRole,
} from "@/api/services/role";

const RoleForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
  extraData,
}) => {
  const toast = useToast();

  const addData = async (callback) => {
    setLoading(true);

    try {
      await createRole(callback);

      toast("Role created");
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
      await updateRole(data._id, data);

      toast("Role updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Form
        name="role"
        callback={updateMode ? updateData : addData}
        selectData={{
          permissions: extraData.permissions,
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
                permissions: [],
              }
        }
        button={updateMode ? "Update" : "Create"}
      />
    </>
  );
};

export default RoleForm;
