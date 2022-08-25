import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Toaster />
      <Component {...pageProps} />;
    </NextUIProvider>
  );
}

export default MyApp;
