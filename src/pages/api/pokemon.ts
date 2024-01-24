import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Error fetching Pokemon data");
    }

    const data = await response.json();
    const pokemonList = data.results;

    const pokemonData = await Promise.all(
      pokemonList.map((pokemon: { url: string }) =>
        getPokemonData(pokemon.url),
      ),
    );

    const responseData = {
      message: "Pokemon data fetched successfully",
      data: pokemonData,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching Pokemon data", error);
    res.status(500).json({ message: "Error fetching Pokemon data" });
  }
}

async function getPokemonData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching Pokemon data");
  }

  const details = await response.json();

  return {
    id: details.id,
    name: details.name,
    image: details.sprites.front_default,
    type: details.types
      .map((type: { type: { name: unknown } }) => type.type.name)
      .join(", "),
    weight: details.weight,
    height: details.height,
    abilities: details.abilities
      .map((ability: { ability: { name: unknown } }) => ability.ability.name)
      .join(", "),
  };
}
