import type { NextApiRequest, NextApiResponse } from "next";

type Pokemon = {
    growth_rate: string;
    description: string;
    egg_groups: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Pokemon>
    ) {
        const { id } = req.query;
    try {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const resultJson = await result.json();

        const pokemon = {
            growth_rate: resultJson.growth_rate.name,
            description: resultJson.flavor_text_entries.find((entry: { language: { name: string; }; }) => entry.language.name === "en").flavor_text,
            egg_groups: resultJson.egg_groups.map((eggGroup: { name: any; }) => eggGroup.name).join(", ")
        };

        res.status(200).json(pokemon);

    }
    catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}