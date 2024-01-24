/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "PokemonUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PokemonUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PokemonUser_userId_idx" ON "PokemonUser"("userId");

-- CreateIndex
CREATE INDEX "PokemonUser_pokemonId_idx" ON "PokemonUser"("pokemonId");
