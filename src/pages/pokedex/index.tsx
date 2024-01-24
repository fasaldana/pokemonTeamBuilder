import { useEffect, useState } from "react";
import PokeCard from "~/components/PokeCard";
import SelectedPoke from "~/components/SelectedPoke";

const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState<{ image: string; name: string; types: string }[]>([]); // Add initial value for selectedPokemon

  useEffect(() => {
    const request = async () => {
      const result = await fetch("/api/pokemon");
      // This is just an example to obtain data from the endpoint. Hint :) avoid no typesafety we hate that
      const resultJson = await result.json();
      setPokemon(resultJson);
    };
    void request();
  }, []);

  const handleSelectedPoke = (image: string, name: string, isChecked: boolean, types: string) => {
    if(isChecked) {
      setSelectedPokemon(selectedPokemon.filter(poke => poke.name !== name));
    } else {
      if (selectedPokemon.length < 6) {
        setSelectedPokemon([...selectedPokemon, { image, name, types }]);
      }
    }
  };

  const handleSaveTeam = () => {
    if (selectedPokemon.length === 6) {
      const types = selectedPokemon.map(poke => poke.types);
      const flattenedTypes = types.join(",").split(",").map(type => type.trim());
      const repeatedTypes = flattenedTypes.filter((type, index) => flattenedTypes.indexOf(type) !== index);
      if (repeatedTypes.length > 0) {
        alert("Your team has repeated types");
      } else {
        // save the team
        alert("Your team has been saved");
      }
    } else {
      alert("You need to select 6 pokemon");
    }
  }

  return (
    <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {pokemon.map((poke) => (
            <PokeCard
              key={poke.id}
              id={poke.id}
              name={poke.name}
              image={poke.image}
              types={poke.type}
              handleSelectedPoke={handleSelectedPoke}
              height={poke.height}
              weight={poke.weight}
              abilities={poke.abilities}
              selectedNumber={selectedPokemon.length}
            />
          ))}
        </div>
        <div className="fixed bottom-0 mb-4 mr-4 flex justify-center">
          <div className="flex space-x-2 gap-10 bg-zinc-800 rounded-lg shadow-lg p-1 m-2">
            <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
              <button className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveTeam}
              >
                Save Team
              </button>
            </div>
            {selectedPokemon.length > 0 ? (
                selectedPokemon.map((poke) => (
                  <SelectedPoke key={poke.name} image={poke.image} name={poke.name} types={poke.types} />
                ))
              ) : (
              <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
                <h2 className="text-lg text-white">Select Pokemon for your team</h2>
              </div>
            )}
          </div>
        </div>
    </>
  );
}

export default Pokedex;