/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Lowongan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Lowongan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lowongan" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lowongan_slug_key" ON "Lowongan"("slug");
