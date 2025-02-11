import UnderConstruction from "@/components/UnderConstruction";
import AppProvider from "@/context/AppProvider";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return process.env.NEXT_PUBLIC_MODE == "production" ? (
    <UnderConstruction />
  ) : (
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
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </HeroUIProvider>
  );
}
