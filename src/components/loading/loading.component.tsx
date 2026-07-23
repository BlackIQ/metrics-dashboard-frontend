import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        py: 5,
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
