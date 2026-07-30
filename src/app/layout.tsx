import type { Metadata } from "next";
import Providers from "@/app/providers";

import { Toaster } from "react-hot-toast";

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
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0B0F17" }}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
