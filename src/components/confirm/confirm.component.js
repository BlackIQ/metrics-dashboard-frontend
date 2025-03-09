import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";

import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

const ConfirmComponent = ({
  isOpen,
  handleOpen,
  onConfirm,
  title = "Warning",
  message = "Are you sure about doing this!?", // Default message
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleOpen}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "rgba(30, 30, 30, 0.9)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: 2,
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          // fontFamily="Orbitron"
          color="primary.main"
          // sx={{ animation: `${neonGlow} 2s ease-in-out infinite` }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 3 }}>
          {message}
        </DialogContentText>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={onConfirm}
            disableElevation
            sx={{
              py: 1,
              px: 3,
              bgcolor: "error.main",
              "&:hover": {
                bgcolor: "error.dark",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
              },
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleOpen}
            disableElevation
            sx={{
              py: 1,
              px: 3,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                bgcolor: "rgba(0, 255, 255, 0.1)",
                borderColor: "primary.light",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
              },
            }}
          >
            No
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmComponent;
