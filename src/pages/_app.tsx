import { type AppType } from "next/app";
import { Outfit as FontSans } from "next/font/google";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
    :root {
      --font-sans: ${fontSans.style.fontFamily};
    }
  }`}</style>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
