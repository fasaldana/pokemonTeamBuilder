/*
  Warnings:

  - Added the required column `name` to the `PokemonUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PokemonUser" ADD COLUMN     "name" TEXT NOT NULL;
