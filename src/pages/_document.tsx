import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        <meta
          name="description"
          content="Scrape, edit and store recipes from the web"
        />
      </Head>
      <body className="min-h-screen bg-background font-sans text-primary antialiased ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
