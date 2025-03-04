import seoConfig from "@/config/seo.config";
import AppProvider from "@/context/AppProvider";
import "@/styles/globals.css";
import { fetcher } from "@/utils/fetcher";
import { HeroUIProvider } from "@heroui/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <HeroUIProvider>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 600,
            color: "#1B1B1B",
          },
        }}
      />
      <NextNProgress color="#F58120" options={{ showSpinner: false }} />
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
        }}
      >
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <AppProvider>
            <DefaultSeo {...seoConfig} />
            <Component {...pageProps} />
          </AppProvider>
        </SessionProvider>
      </SWRConfig>
      <GoogleAnalytics gaId="G-4J7582YYQ6" />
    </HeroUIProvider>
  );
}
