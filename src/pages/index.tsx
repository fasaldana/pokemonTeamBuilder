import Head from "next/head";
import Navbar from "~/components/Navbar";
import { useEffect, useState } from "react";
import PokeCard from "~/components/PokeCard";
import SelectedPoke from "~/components/SelectedPoke";
import Image from "next/image";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState<{ image: string; name: string; }[]>([]); // Add initial value for selectedPokemon

  useEffect(() => {
    const request = async () => {
      const result = await fetch("/api/pokemon");
      // This is just an example to obtain data from the endpoint. Hint :) avoid no typesafety we hate that
      const resultJson = await result.json();
      setPokemon(resultJson);
    };
    void request();
  }, []);

  const handleSelectedPoke = (image: string, name: string) => {
    if (selectedPokemon.length < 6) {
      setSelectedPokemon([...selectedPokemon, { image, name }]);
    } else {
      alert("You can only select 6 pokemon");
    }
  };

  return (
    <>
      <Head>
        <title>Condorsoft</title>
        <meta name="description" content="Condorsoft technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bgImage.png')" }}>
        <Navbar />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {pokemon.map((poke) => (
            <PokeCard
              key={poke.id}
              id={poke.id}
              name={poke.name}
              image={poke.image}
              types={poke.type}
              handleSelectedPoke={handleSelectedPoke}
            />
          ))}
        </div>
        <div className="fixed bottom-0 mb-4 mr-4 w-full flex justify-center">
          <div className="flex space-x-2 gap-10">
            {selectedPokemon.length > 0 ? (
                selectedPokemon.map((poke) => (
                  <SelectedPoke key={poke.name} image={poke.image} name={poke.name} />
                ))
              ) : (
              <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
                <h2 className="text-lg text-white">Select Pokemon for your team</h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
