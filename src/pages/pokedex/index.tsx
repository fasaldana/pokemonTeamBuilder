import { useEffect, useState } from "react";
import PokeCard from "~/components/PokeCard";
import SelectedPoke from "~/components/SelectedPoke";

const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState<{ id: number, image: string; name: string; types: string }[]>([]); // Add initial value for selectedPokemon
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const request = async () => {
      const result = await fetch("/api/pokemon");
      const resultJson = await result.json() as { id: number, image: string; name: string; types: string }[];
      setPokemon(resultJson);
      setLoading(false);
    };
    void request();

  }, []);

  const handleSelectedPoke = (id: number, image: string, name: string, isChecked: boolean, types: string) => {
    if(isChecked) {
      setSelectedPokemon(selectedPokemon.filter(poke => poke.name !== name));
    } else {
      if (selectedPokemon.length < 6) {
        setSelectedPokemon([...selectedPokemon, { id, image, name, types }]);
      }
    }
  };

  const handleSaveTeam = () => {
    if (selectedPokemon.length === 6) {
      const types = selectedPokemon.map(poke => poke.types);
      const flattenedTypes = types.join(",").split(",").map(type => type.trim());
      const repeatedTypes = flattenedTypes.filter((type, index) => flattenedTypes.indexOf(type) !== index);
      if (repeatedTypes.length > 0) {
        setErrorMessage("Your team has repeated types");
      } else if (teamName === "") {
        setErrorMessage("You need to name your team");
      } else {
        // save the team
        selectedPokemon.forEach(poke => {
          const body = {
            teamName: teamName,
            pokemonName: poke.name,
            pokemonId: poke.id,
            pokemonType: poke.types,
            pokemonImg: poke.image,
          };
          void fetch(`/api/teams/${JSON.parse(localStorage.getItem("user")).id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        });
        setSuccessMessage("Team saved successfully");
        setErrorMessage("");
      }
    } else {
      setErrorMessage("You need to select 6 pokemon");
    }
  }

  return (
    <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 bg-black bg-opacity-70 rounded-lg p-4">
          {loading ? <h1 className="text-2xl text-white">Loading...</h1> : null}
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
        <div className="fixed flex-col items-center bottom-0 mb-4 mr-4 flex justify-center">
            {errorMessage !== "" ? (
              <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
                <h2 className="text-lg text-red-600">{errorMessage}</h2>
              </div>
            ) : null}
            {successMessage !== "" ? (
              <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
                <h2 className="text-lg text-green-600">{successMessage}</h2>
              </div>
            ) : null}
          <div className="flex space-x-2 gap-10 bg-zinc-800 rounded-lg shadow-lg p-1 m-2">
            <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
              <button className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveTeam}
              >
                Save Team
              </button>
              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="rounded-lg shadow-lg p-2 m-4"
              />
            </div>
            {selectedPokemon.length > 0 ? (
                selectedPokemon.map((poke) => (
                  <SelectedPoke key={poke.name} image={poke.image} name={poke.name} types={poke.types} />
                ))
              ) : (
              <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
                <h2 className="text-lg text-white">Select a Pokemon for your team</h2>
              </div>
            )}
          </div>
        </div>
    </>
  );
}

export default Pokedex;