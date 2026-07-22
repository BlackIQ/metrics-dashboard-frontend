import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { unsetToast } from "@/redux/actions/toast";

const Toast = () => {
  const toast = useSelector((state) => state.toast); // { message, severity } or string
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(unsetToast());
  };

  const message = typeof toast === "object" ? toast.message : toast;
  const severity = typeof toast === "object" ? toast.severity : "info";

  return (
    <Snackbar
      open={!!toast}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          bgcolor: "rgba(30, 30, 30, 0.9)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: 2,
          backdropFilter: "blur(10px)",
          color: "white",
          "& .MuiAlert-icon": { color: "primary.main" },
          "&.MuiAlert-standardError": { bgcolor: "rgba(50, 0, 0, 0.9)" },
          "&.MuiAlert-standardSuccess": { bgcolor: "rgba(0, 50, 0, 0.9)" },
          "&.MuiAlert-standardInfo": { bgcolor: "rgba(0, 0, 50, 0.9)" },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
