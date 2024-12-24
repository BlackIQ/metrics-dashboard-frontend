import { Typography, Box, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - OpenHubble Console</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography
            fontWeight="bold"
            color="primary"
            fontSize={60}
            gutterBottom
          >
            404
          </Typography>
          <Typography
            fontWeight="bold"
            color="secondary"
            fontSize={80}
            gutterBottom
          >
            Not Found
          </Typography>
          <Button
            onClick={() => router.push("/")}
            variant="outlined"
            size="large"
          >
            Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
