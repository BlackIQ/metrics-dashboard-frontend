// - - - - - Next - - - - -
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content="#00e5ff" />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap"
          as="style"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="dark-mode">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
