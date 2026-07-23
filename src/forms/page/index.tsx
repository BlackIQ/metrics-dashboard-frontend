"use client";

// - - - - - Components - - - - -
import Form from "@/components/form/form.component";

// - - - - - API - - - - -
import { createPage, updatePage } from "@/api/services/page";

const PageForm = ({
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
      await createPage(callback);

      toast("Page created");
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
      await updatePage(currentData._id, data);

      toast("Page updated");
      handleClose();

      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <Form
      name="page"
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

export default PageForm;
