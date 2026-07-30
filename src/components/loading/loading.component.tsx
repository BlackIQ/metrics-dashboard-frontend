import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        width: "100%",
      }}
    >
      <CircularProgress size={28} thickness={4} />
    </Box>
  );
}
