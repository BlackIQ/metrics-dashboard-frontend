"use client";

// - - - - - Components - - - - -
import Form from "@/components/form/form.component";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - API - - - - -
import { createGroup, updateGroup } from "@/api/services/group";

const GroupForm = ({
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
      await createGroup(callback);

      toast("Group created");
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
      await updateGroup(currentData._id, data);

      toast("Group updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <Form
      name="group"
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

export default GroupForm;
