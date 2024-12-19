import { Typography, Container, Toolbar, Button } from "@mui/material";

import { useRouter } from "next/router";

import Head from "next/head";

export default function Index() {
  const history = useRouter();

  return (
    <>
      <Head>
        <title>Monitoring</title>
      </Head>
      <Container maxWidth="lg">
        <Toolbar />
        <Typography color="primary" variant="h2" fontWeight="bold" gutterBottom>
          AMCE Monitoring
        </Typography>
        <Typography
          color="secondary"
          variant="body1"
          sx={{ mb: 5 }}
          gutterBottom
        >
          And one day I will deploy this bitch online!
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
