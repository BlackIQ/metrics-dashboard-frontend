import { Typography, Container, Toolbar } from "@mui/material";

import Head from "next/head";

export default function Index() {
  console.log("Anirhossein");
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
        <Typography color="secondary" variant="body1">
          And one day I will deploy this bitch online!
        </Typography>
      </Container>
    </>
  );
}
