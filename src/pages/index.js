import { Typography, Container, Toolbar, Button } from "@mui/material";

import { useRouter } from "next/router";

import Head from "next/head";

export default function Index() {
  const history = useRouter();

  return (
    <>
      <Head>
        <title>OpenHubble Console</title>
      </Head>
      <Container maxWidth="lg">
        <Toolbar />
        <Typography color="primary" variant="h2" fontWeight="bold" gutterBottom>
          OpenHubble Console
        </Typography>
        <Typography
          color="secondary"
          variant="body1"
          sx={{ mb: 5 }}
          gutterBottom
        >
          Exploring Data, Unveiling Insights!
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push("/auth")}
          size="large"
        >
          Continue
        </Button>
      </Container>
    </>
  );
}
