"use client";

// - - - - - Components - - - - -
import Form from "@/components/form/form.component";

// - - - - - API - - - - -
import { createTag, updateTag } from "@/api/services/tag";

const TagForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
}) => {
  const addData = async (callback) => {
    setLoading(true);

    try {
      await createTag(callback);

      toast("Tag created");
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
      await updateTag(currentData._id, data);

      toast("Tag updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <Form
      name="tag"
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

export default TagForm;
