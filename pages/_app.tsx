import UnderConstruction from "@/components/UnderConstruction";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return process.env.NEXT_PUBLIC_MODE == "production" ? (
    <UnderConstruction />
  ) : (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
