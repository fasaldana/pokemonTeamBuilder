import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Navbar from "~/components/Navbar";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Condorsoft</title>
        <meta name="description" content="Condorsoft technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bgImage.png')" }}>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </>
  )
};

export default MyApp;
