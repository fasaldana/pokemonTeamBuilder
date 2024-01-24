import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
    email: string;
    password: string;
};

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    
    const { email, password } = req.body as User;

    try {
      const fetchedUser = await prisma.user.findFirst({
        where: {
            email,
            password,
        },
      });

      if (!fetchedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(fetchedUser);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
    
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
