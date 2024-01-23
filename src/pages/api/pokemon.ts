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

    const data = await response.json()
    const pokemonList = data.results

    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const pokemonRecord = await fetch(pokemon.url);
        if (!pokemonRecord.ok) {
          throw new Error("Error fetching Pokemon data");
        }

        const details = await pokemonRecord.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          type: details.types.map((type) => type.type.name).join(", "),
          weight: details.weight,
          height: details.height,
        };
      })
    );

    res.status(200).json(pokemonData);
    
  } catch (error) {
    console.error('Error fetching Pokemon data', error);
    res.status(500).json({ message: "Error fetching Pokemon data" });
  }
}
