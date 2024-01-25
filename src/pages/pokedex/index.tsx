/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import PokeCard from "~/components/PokeCard";
import SelectedPoke from "~/components/SelectedPoke";

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState<
    { id: number; image: string; name: string; types: string }[]
  >([]); // Add initial value for selectedPokemon
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const request = async () => {
      const result = await fetch("/api/pokemon");
      const resultJson = (await result.json()) as {
        id: number;
        image: string;
        name: string;
        types: string;
      }[];
      setPokemon(resultJson.data);
      setLoading(false);
    };
    void request();
  }, []);

  const handleSelectedPoke = (
    id: number,
    image: string,
    name: string,
    types: string,
    isChecked: boolean,
  ) => {
    if (isChecked) {
      setSelectedPokemon(selectedPokemon.filter((poke) => poke.name !== name));
    } else {
      if (selectedPokemon.length < 6) {
        setSelectedPokemon([...selectedPokemon, { id, image, name, types }]);
      } else {
        setErrorMessage("You can only select 6 pokemon");
      }
    }
  };

  const handleRemove = (id: number) => {
    setSelectedPokemon(selectedPokemon.filter((poke) => poke.id !== id));
  };

  const handleSaveTeam = () => {
    if (selectedPokemon.length === 6) {
      const types = selectedPokemon.map((poke) => poke.types);
      const flattenedTypes = types
        .join(",")
        .split(",")
        .map((type) => type.trim());
      const repeatedTypes = flattenedTypes.filter(
        (type, index) => flattenedTypes.indexOf(type) !== index,
      );
      if (repeatedTypes.length > 0) {
        setErrorMessage("Your team has repeated types");
      } else if (teamName === "") {
        setErrorMessage("You need to name your team");
      } else {
        // save the team
        selectedPokemon.forEach((poke) => {
          const body = {
            teamName: teamName,
            pokemonName: poke.name,
            pokemonId: poke.id,
            pokemonType: poke.types,
            pokemonImg: poke.image,
          };
          void fetch(
            `/api/teams/${JSON.parse(localStorage.getItem("user")).id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            },
          );
        });
        setSuccessMessage("Team saved successfully");
        setErrorMessage("");
      }
    } else {
      setErrorMessage("You need to select 6 pokemon");
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      {errorMessage !== "" ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-lg bg-red-500 p-4 shadow-lg">
            <h2 className="text-lg text-white">{errorMessage}</h2>
            <button
              className="rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
              onClick={() => setErrorMessage("")}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
      {successMessage !== "" ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-lg bg-green-500 p-4 shadow-lg">
            <h2 className="text-lg text-white">{successMessage}</h2>
            <button
              className="rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
              onClick={() => setSuccessMessage("")}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
      <aside className="sticky top-0 m-4 h-full max-h-screen self-start overflow-y-scroll rounded-lg bg-black bg-opacity-70 p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mt- mx-4 flex flex-col items-center justify-center rounded-lg px-4 py-2 shadow-lg">
            <div className="flex w-full justify-center gap-4">
              <button
                className="rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
                onClick={handleSaveTeam}
              >
                Save Team
              </button>
              <button
                className="rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
                onClick={() => {
                  setSelectedPokemon([]);
                  setTeamName("");
                }}
              >
                Clear
              </button>
            </div>
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="m-4 rounded-lg p-2 shadow-lg"
            />
          </div>
          <div className="flex w-3/4 flex-col gap-4 shadow-lg">
            {selectedPokemon.length > 0 ? (
              selectedPokemon.map((poke) => (
                <SelectedPoke
                  key={poke.name}
                  id={poke.id}
                  image={poke.image}
                  name={poke.name}
                  types={poke.types}
                  handleRemove={handleRemove}
                />
              ))
            ) : (
              <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-4 shadow-lg">
                <h2 className="text-lg text-white">
                  Select a Pokemon for your team
                </h2>
              </div>
            )}
          </div>
        </div>
      </aside>
      <div className="mr-4 mt-4 grid grid-cols-2 gap-4 overflow-y-auto rounded-lg bg-black bg-opacity-70 p-4 md:grid-cols-3 lg:grid-cols-4">
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
            isChecked={selectedPokemon.some((p) => p.id === poke.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
