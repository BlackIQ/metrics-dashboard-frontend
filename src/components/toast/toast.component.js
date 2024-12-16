import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";

import { unsetToast } from "@/redux/actions/toast";

const Toast = () => {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(unsetToast());
  };

  return (
    <Snackbar
      open={!!toast}
      autoHideDuration={5000}
      onClose={handleClose}
      message={toast}
    />
  );
};

export default Toast;
