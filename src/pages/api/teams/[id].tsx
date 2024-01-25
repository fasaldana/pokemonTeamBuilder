import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Team = {
  teamName: string;
  pokemonName: string;
  pokemonId: number;
  pokemonType: string;
  pokemonImg: string;
  userId: number;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Team>,
) {
  if (req.method === "POST") {
    const { teamName, pokemonName, pokemonId, pokemonType, pokemonImg } = req.body as { teamName: string, pokemonName: string, pokemonId: number, pokemonType: string, pokemonImg: string };
    const { id } = req.query;
    try {
      const team = await prisma.team.create({
        data: {
          teamName: teamName,
          pokemonName: pokemonName,
          pokemonId: pokemonId,
          pokemonType: pokemonType,
          pokemonImg: pokemonImg,
          userId: Number(id),
        },
      });

      res.status(200).json(team);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.method === "GET") {
    const { id } = req.query;
    try {
      const teams = await prisma.team.findMany({
        where: {
          userId: Number(id),
        },
      });

      const teamsByTeamName = teams.reduce((acc, team) => {
        if (!acc[team.teamName]) {
          acc[team.teamName] = [];
        }
        acc[team.teamName].push(team);
        return acc;
      }, {});

      res.status(200).json(teamsByTeamName);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.method === "DELETE") {
    const { teamName } = req.body as { teamName: string };
    try {
      const teams = await prisma.team.deleteMany({
        where: {
          teamName: String(teamName),
        },
      });

      res.status(200).json(teams);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}