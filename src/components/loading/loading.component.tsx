import { CircularProgress, Box } from "@mui/material";

const Loading = ({ py = 5 }) => {
  return (
    <Box py={py} textAlign="center">
      <CircularProgress />
    </Box>
  );
};

export default Loading;
