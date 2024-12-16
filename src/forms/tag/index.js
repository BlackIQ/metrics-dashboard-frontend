// Components
import { Form } from "@/components";

// Hooks
import { useToast } from "@/hooks";

// APSs
import {
  createOne as createTag,
  updateOne as updateTag,
} from "@/api/services/tag";

// Redux
import { useSelector } from "react-redux";

const TagForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
}) => {
  const toast = useToast();

  const { _id } = useSelector((state) => state.user);

  const addData = async (callback) => {
    setLoading(true);

    try {
      callback.user = _id;

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
      await updateTag(data._id, data);

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
