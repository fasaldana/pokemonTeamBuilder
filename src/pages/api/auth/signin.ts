import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
    name: string;
    email: string;
    password: string;
};

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body as User;

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });

    res.status(200).json(createdUser);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
