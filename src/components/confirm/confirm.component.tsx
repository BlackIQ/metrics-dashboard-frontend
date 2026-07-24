import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";

export default function Confirm({
  isOpen,
  handleOpen,
  onConfirm,
  title = "Warning",
  message = "Are you sure about doing this!?",
}: {
  isOpen: boolean;
  handleOpen: void;
  onConfirm: void;
  title: string;
  message: string;
}) {
  return (
    <Dialog
      open={isOpen}
      // onClose={handleOpen}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" color="primary.main">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>{message}</DialogContentText>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            // onClick={onConfirm}
            disableElevation
            sx={{
              py: 1,
              px: 3,
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            // onClick={handleOpen}
            disableElevation
            sx={{
              py: 1,
              px: 3,
            }}
          >
            No
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
