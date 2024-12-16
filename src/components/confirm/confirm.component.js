import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmComponent = ({ isOpen, handleOpen, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={handleOpen} maxWidth="xs" fullWidth>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Are you sure about doing this!?
        </DialogContentText>
        <br />
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={onConfirm}
          disableElevation
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ ml: 2 }}
          onClick={handleOpen}
          disableElevation
        >
          No
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmComponent;
