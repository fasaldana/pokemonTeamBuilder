import Head from "next/head";
import Navbar from "~/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
/*  const [text, setText] = useState("");

  useEffect(() => {
    const request = async () => {
      const result = await fetch("/api/pokemon");
      // This is just an example to obtain data from the endpoint. Hint :) avoid no typesafety we hate that
      const resultJson = await result.json();
      console.log({ resultJson });
      setText(resultJson.message);
    };
    void request();
  }, []); */

  return (
    <>
      <Head>
        <title>Condorsoft</title>
        <meta name="description" content="Condorsoft technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bgImage.png')" }}>
        <Navbar />
        
      </main>
    </>
  );
}
