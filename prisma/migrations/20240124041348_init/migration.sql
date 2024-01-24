/*
  Warnings:

  - You are about to drop the `Pokemon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PokemonUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pokemon";

-- DropTable
DROP TABLE "PokemonUser";

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamName" TEXT NOT NULL,
    "pokemonName" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "pokemonType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Team_userId_idx" ON "Team"("userId");
