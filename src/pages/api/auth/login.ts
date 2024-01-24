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

    const fetchedUser = await prisma.user.findFirst({
        where: {
            email,
            password,
        },
    });

    res.status(200).json(fetchedUser);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
