import type { Metadata } from "next";

import Providers from "@/app/providers";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "OpenHubble Metrics",
  description: "Infrastructure monitoring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
